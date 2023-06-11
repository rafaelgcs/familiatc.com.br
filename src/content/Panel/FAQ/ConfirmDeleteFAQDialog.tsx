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
import { FAQModel } from '@/models/faq';
import { deleteFAQ } from '@/repositories/faqs';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface ConfirmDeleteFAQDialogProps {
    open?: boolean;
    handleClose?: Function;
    handleSuccess?: Function;
    handleStartSubmit?: Function;
    faqsToDelete?: FAQModel[];
}

export default function ConfirmDeleteFAQDialog(props: ConfirmDeleteFAQDialogProps) {
    const { enqueueSnackbar } = useSnackbar();

    const { open, handleClose, handleSuccess, handleStartSubmit, faqsToDelete } = props;
    const [sendingRequest, setSendingRequest] = React.useState<boolean>(false)

    const startRemoveIntents = async (idsToDelete: any[]) => {
        setSendingRequest(true)
        handleStartSubmit(true)
        let resp: any = { success: false, message: "Não foi possível deletar as perguntas!", data: {} }

        if (idsToDelete.length == 1) {
            resp = await deleteFAQ(`${idsToDelete[0]}`);
            if (resp.success) {
                handleClose()
                handleSuccess()
                enqueueSnackbar(resp.message, { variant: "success", autoHideDuration: 8000 })
            } else {
                enqueueSnackbar("Não foi possível deletar as perguntas!", { variant: "error", autoHideDuration: 8000 })
            }
        } else {
            enqueueSnackbar("Só é possível deletar 1 pergunta por vez. Selecione apenas 1.", { variant: "error", autoHideDuration: 8000 })
        }

        setSendingRequest(false)
    }

    const handleSubmit = () => {
        let faqsToDeleteList = faqsToDelete.map((f) => f.id)

        startRemoveIntents(faqsToDeleteList)
    }

    const faqs = faqsToDelete.map(u => (
        <li key={u.id}>
            {u.question}
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
                            {`Deletando Pergunta Frequente`}
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
            <DialogContent>
                {
                    open &&
                    <>
                        <Typography>
                            Você tem certeza que deseja deletar a lista de perguntas frequentes abaixo?
                        </Typography>
                        <ul>
                            {faqs}
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