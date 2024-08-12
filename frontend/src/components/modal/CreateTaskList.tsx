"use client";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import ValidateFields from './ValidateFields';

export default function CreateTaskList({ open, onClose, setUpdate }: { open: boolean; onClose: () => void; setUpdate: any; }) {
    
    const [name, setName] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [fields, setFields] = React.useState<any[]>([]);
    const [openModalValidade, setOpenModalValidade] = React.useState(false);

    const handleClose = () => {
        setOpenModalValidade(false);
    };

    async function createListTask(){
        setLoading(true)

        if(!name){
            setLoading(false)
            setOpenModalValidade(true)
            let obj: any[] = [];

            if(!name) obj.push('Nome')
            setFields(obj)
            return
        }

        await axios.post(process.env.NEXT_PUBLIC_API_URL + '/task-list', {name: name})
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
                    {"Criar nova lista de tarefas"}
                </DialogTitle>
                <DialogContent>
                    <TextField 
                        id="standard-basic" 
                        label="Lista de tarefas" 
                        variant="standard"  
                        color="primary" 
                        fullWidth 
                        onChange={(e) => setName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="error" autoFocus>Cancelar</Button>
                    <LoadingButton 
                        size="small"
                        onClick={createListTask}
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
