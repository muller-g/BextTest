"use client";
import { DialogContentText } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';

export default function ValidateFields({ open, onClose, fields }: { open: any; onClose: () => void; fields: any }) {
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
                    {"Preencha todos os campos"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Preencha todos os campos
                        {fields.map((field: any) => (
                            <span> {field}, </span>
                        ))}
                    </DialogContentText>
                    </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="error" autoFocus>Ok</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
