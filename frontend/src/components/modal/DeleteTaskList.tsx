"use client";
import { LoadingButton } from '@mui/lab';
import { DialogContentText } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import * as React from 'react';

export default function DeleteTaskList({ open, onClose, setUpdate }: { open: any; onClose: () => void; setUpdate: any; }) {
    
    const [loading, setLoading] = React.useState(false);

    async function deleteListTask(){
        setLoading(true)
        await axios.delete(process.env.NEXT_PUBLIC_API_URL + '/task-list/' + open.id)
        .then((res: any) => {
            setUpdate(res)
            setLoading(false)
            onClose()
        }).catch((res: any) => {setLoading(false)});
    }

    return (
        <React.Fragment>
            <Dialog
                open={open.open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Excluir lista de tarefas"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Tem certeza que deseja excluir essa lista?
                    </DialogContentText>
                    </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="error" autoFocus>Cancelar</Button>
                    <LoadingButton 
                        onClick={deleteListTask}
                        loading={loading}
                        loadingIndicator="Loading…"
                        variant="contained"
                        color="success"
                        >
                        <span>Deletar</span>
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
