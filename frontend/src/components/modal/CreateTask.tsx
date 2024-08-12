"use client";
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import styles from './createTask.module.css';
import ValidateFields from './ValidateFields';

export default function CreateTask({ open, onClose, setUpdate, taskId }: { open: boolean; onClose: () => void; setUpdate: any; taskId: string;}) {
    
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [status, setStatus] = React.useState('');
    const [dateTime, setDateTime] = React.useState<any>();
    const [openModalValidade, setOpenModalValidade] = React.useState(false);
    const [fields, setFields] = React.useState<any[]>([]);

    const handleChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value as string);
    };

    const handleClose = () => {
        setOpenModalValidade(false);
    };

    async function createTask(){
        setLoading(true)

        if(!name || !description || !status || !dateTime){
            setLoading(false)
            setOpenModalValidade(true)
            let obj: any[] = [];

            if(!name) obj.push('Nome')
            if(!description) obj.push('Descrição')
            if(!status) obj.push('Status')
            if(!dateTime) obj.push('Data vencimento')
            setFields(obj)
            return
        }

        await axios.post(process.env.NEXT_PUBLIC_API_URL + '/task', {
            title: name,
            description: description,
            status: status,
            due_date: dateTime.toISOString(),
            task_list: taskId
        })
        .then((res: any) => {
            setUpdate(res)
            setLoading(false)
            onClose()
        }).catch((res: any) => {setLoading(false)});
    }

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Criar nova tarefa"}
                </DialogTitle>
                <DialogContent className={styles.content_wrap}>
                    <TextField 
                        id="standard-basic" 
                        label="Nome da tarefa" 
                        variant="standard"  
                        color="primary" 
                        fullWidth 
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField 
                        id="standard-basic" 
                        label="Descrição" 
                        variant="standard"  
                        color="primary" 
                        fullWidth 
                        onChange={(e) => setDescription(e.target.value)}
                        style={{marginBottom: '20px'}}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={status}
                            label="Status"
                            onChange={handleChange}
                        >
                            <MenuItem value={'Pendente'}>Pendente</MenuItem>
                            <MenuItem value={'Concluida'}>Concluída</MenuItem>
                            <MenuItem value={'Andamento'}>Andamento</MenuItem>
                        </Select>
                    </FormControl>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker']}>
                            <DateTimePicker label="Data de vencimento" onChange={(newValue) => setDateTime(newValue)}/>
                        </DemoContainer>
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="error" autoFocus>Cancelar</Button>
                    <LoadingButton 
                        size="small"
                        onClick={createTask}
                        loading={loading}
                        loadingIndicator="Loading…"
                        variant="contained"
                        color="success"
                        >
                        <span>Criar</span>
                    </LoadingButton>
                </DialogActions>
            </Dialog>
            <ValidateFields onClose={handleClose} open={openModalValidade} fields={fields}/>
        </React.Fragment>
    );
}
