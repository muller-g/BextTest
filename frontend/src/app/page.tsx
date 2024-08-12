"use client";
import CreateTaskList from '@/components/modal/CreateTaskList';
import DeleteTaskList from '@/components/modal/DeleteTaskList';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import banner from "../assets/006-Banner-Blog-Mudanca-de-Marca.png";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState({id: '', open: false});
  const [taskList, setTaskList] = React.useState([]);
  const [update, setUpdate] = React.useState();
  const [filterName, setFilterName] = React.useState('');

  const handleClickOpen = () => {
    setFilterName('')
    document.querySelector<any>('#standard-basic').value = ''
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenDelete = (id: string) => {
    setOpenDelete({ id: id, open: true});
  };

  const handleCloseDelete = () => {
    setOpenDelete({ id: '', open: false});
  };

  function generate(element: React.ReactElement, i: number) {
    return React.cloneElement(element, {
        key: i,
    })
  }

  React.useEffect(() => {
    let url = process.env.NEXT_PUBLIC_API_URL + '/task-list'

    if(filterName){
      url += '?name=' + filterName
    }

    axios.get(url)
      .then((res: any) => {
        setTaskList(res.data)
      });
  }, [update, filterName])
  
  return (
    <>
      <main className={styles.main}>
        <div className={styles.background_banner} style={{backgroundImage: `url(${banner.src})`}}></div>
          <div className={styles.container}>
            <h1 className={styles.title}>Gerenciador de Tarefas</h1>
            <div className={styles.input_search}>
              <TextField id="standard-basic" label="Buscar por nome" variant="standard"  color="primary" fullWidth
              onChange={(e) => setFilterName(e.target.value)} className='filter-name'
              sx={{
                '& .MuiInput-underline:before': {
                  borderBottomColor: 'white',
                },
                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                  borderBottomColor: 'white',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: 'white',
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                },
                '& .MuiInputLabel-root': {
                  color: 'white',
                },
              }}
              InputLabelProps={{
                style: { color: 'white' },
              }}/>
              <Button variant="contained" color="success" onClick={handleClickOpen}>Nova lista</Button>
            </div>
            <div className={styles.task_list}>
              <h1 className={styles.task_title}>Listas de tarefas</h1>
              <List dense={true}> 
                { 
                  taskList.map((task: any, i: number) => (
                    generate(
                      <ListItem
                        secondaryAction={
                          <IconButton edge="end" aria-label="delete" onClick={() => handleClickOpenDelete(task.id)}>
                            <DeleteIcon />
                          </IconButton>
                        }
                      >
                        <ListItemText
                          onClick={() => router.push(`/task-list/${task.id}`)}
                          primary={task.name}
                        />
                        </ListItem>, i
                    )
                  ))
                }
              </List>
            </div>
          </div>
      </main>

        <CreateTaskList open={open} onClose={handleClose} setUpdate={setUpdate}/>
        <DeleteTaskList open={openDelete} onClose={handleCloseDelete} setUpdate={setUpdate}/>
    </>
  );
}
