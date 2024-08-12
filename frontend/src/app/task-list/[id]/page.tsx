'use client';
import CreateTask from '@/components/modal/CreateTask';
import { Button, IconButton, TextField } from "@mui/material";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import * as React from 'react';
import banner from "../../../assets/006-Banner-Blog-Mudanca-de-Marca.png";
import styles from "./page.module.css";
import moment from 'moment-timezone';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteTask from '@/components/modal/DeleteTask';
import TaskFilter from '@/components/modal/TaskFilter';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function taskList({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const [taskList, setTaskList] = React.useState([]);
  const [update, setUpdate] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [openFilter, setOpenFilter] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState({id: '', open: false});
  const searchParams = useSearchParams();

  const title = searchParams.get('title');
  const description = searchParams.get('description');
  const status = searchParams.get('status');
  const due_date = searchParams.get('due_date');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
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

  React.useEffect(() => {
    let url = process.env.NEXT_PUBLIC_API_URL + '/task/task-list/' + id + '?'

    if(title) url += 'title=' + title + '&'
    if(description) url += 'description=' + description + '&'
    if(status) url += 'status=' + status + '&'
    if(due_date) url += 'due_date=' + due_date + '&'

    axios.get(url)
      .then((res: any) => {
        setTaskList(res.data)
      });
  }, [id, update, title, description, status, due_date])

  function formattDate(dueDate: any): React.ReactNode{
    return moment.utc(dueDate).tz('America/Sao_Paulo').format('DD-MM-YYYY HH:mm:ss');
  }
  
  return (
    <main className={styles.main}>
      <div className={styles.background_banner} style={{backgroundImage: `url(${banner.src})`}}></div>
      <div className={styles.container}>
        <h1 className={styles.title}>Gerenciador de Tarefas</h1>
        <div className={styles.input_search}>
          <Button variant="contained" color="primary" onClick={() => router.push(`/`)}>Voltar</Button>
          <Button variant="contained" color="primary" onClick={() => router.push(`/task-list/${id}`)}>Limpar Filtro</Button>
          <Button variant="contained" color="warning" onClick={handleClickOpenFilter}>Filtro de busca</Button>
          <Button variant="contained" color="success" onClick={handleClickOpen}>Nova tarefa</Button>
        </div>
        <div className={styles.task_list}>
          <h1 className={styles.task_title}>Tarefas</h1>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Tarefa</TableCell>
                  <TableCell align="right">Descrição</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Vencimento</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {taskList?.map((row: any) => (
                  <TableRow
                    key={row.title}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.title}
                    </TableCell>
                    <TableCell align="right">{row.description}</TableCell>
                    <TableCell align="right">{row.status}</TableCell>
                    <TableCell align="right">{formattDate(row.due_date)}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                    <TableCell align="right">{
                      <IconButton edge="end" aria-label="delete" onClick={() => handleClickOpenDelete(row.id)}>
                        <DeleteIcon />
                      </IconButton>}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>

      <CreateTask open={open} onClose={handleClose} setUpdate={setUpdate} taskId={id}/>
      <TaskFilter open={openFilter} onClose={handleCloseFilter} taskId={id}/>
      <DeleteTask open={openDelete} onClose={handleCloseDelete} setUpdate={setUpdate}/>
    </main>
  );
}
