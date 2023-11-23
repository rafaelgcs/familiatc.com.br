import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Container, DialogContent, DialogActions, LinearProgress, Button } from '@mui/material';

import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';

import { ResultModel } from '@/models/result';
import { deleteResult } from '@/repositories/results';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface ConfirmdeleteResultDialogProps {
    open?: boolean;
    handleClose?: Function;
    handleSuccess?: Function;
    handleStartSubmit?: Function;
    resultsToDelete?: ResultModel[];
}

export default function ConfirmDeleteResultDialog(props: ConfirmdeleteResultDialogProps) {
    const { enqueueSnackbar } = useSnackbar();

    const { open, handleClose, handleSuccess, handleStartSubmit, resultsToDelete } = props;
    const [sendingRequest, setSendingRequest] = React.useState<boolean>(false)

    const startRemoveIntents = async (idsToDelete: any[]) => {
        setSendingRequest(true)
        handleStartSubmit(true)
        let resp: any = { success: false, message: "Não foi possível deletar os resultados!", data: {} }

        if (idsToDelete.length == 1) {
            resp = await deleteResult(`${idsToDelete[0]}`);
            if (resp.success) {
                handleClose()
                handleSuccess()
                enqueueSnackbar(resp.message, { variant: "success", autoHideDuration: 8000 })
            } else {
                enqueueSnackbar("Não foi possível deletar os resultados!", { variant: "error", autoHideDuration: 8000 })
            }
        } else {
            enqueueSnackbar("Só é possível deletar 1 resultado por vez. Selecione apenas 1.", { variant: "error", autoHideDuration: 8000 })
        }

        setSendingRequest(false)
    }

    const handleSubmit = () => {
        let resultToDelete = resultsToDelete.map((f) => f.id)

        startRemoveIntents(resultToDelete)
    }

    const results = resultsToDelete.map(u => (
        <li key={u.id}>
            {u.id} - {u.name}
        </li>
    ));

    return (
        <Dialog
            fullWidth
            maxWidth="md"
            open={open}
            onClose={() => { }}
            TransitionComponent={Transition}
        >
            <AppBar color="inherit" position='sticky'>
                <Container maxWidth="xl" sx={{ p: 1 }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => {
                                handleClose()
                            }}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {`Deletando Resultado`}
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
            <DialogContent>
                {
                    open &&
                    <>
                        <Typography>
                            Você tem certeza que deseja deletar a lista de resultados abaixo?
                        </Typography>
                        <ul>
                            {results}
                        </ul>
                    </>
                }
                {
                    sendingRequest && (
                        <Container>
                            <LinearProgress sx={{ height: 2 }} color="inherit" />
                        </Container>
                    )
                }
            </DialogContent>
            <DialogActions>
                <Button color="error" variant="contained" onClick={() => handleClose()}>
                    Cancelar
                </Button>
                <LoadingButton color="primary" variant="contained" loading={sendingRequest} onClick={handleSubmit}>
                    Confirmar
                </LoadingButton>
            </DialogActions>
        </Dialog >
    );
}