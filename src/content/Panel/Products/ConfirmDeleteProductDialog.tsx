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
import { ProductModel } from '@/models/product';
import { deleteProduct } from '@/repositories/products';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface ConfirmdeleteProductDialogProps {
    open?: boolean;
    handleClose?: Function;
    handleSuccess?: Function;
    handleStartSubmit?: Function;
    productsToDelete?: ProductModel[];
}

export default function ConfirmdeleteProductDialog(props: ConfirmdeleteProductDialogProps) {
    const { enqueueSnackbar } = useSnackbar();

    const { open, handleClose, handleSuccess, handleStartSubmit, productsToDelete } = props;
    const [sendingRequest, setSendingRequest] = React.useState<boolean>(false)

    const startRemoveIntents = async (idsToDelete: any[]) => {
        setSendingRequest(true)
        handleStartSubmit(true)
        let resp: any = { success: false, message: "Não foi possível deletar os produtos!", data: {} }

        if (idsToDelete.length == 1) {
            resp = await deleteProduct(`${idsToDelete[0]}`);
            if (resp.success) {
                handleClose()
                handleSuccess()
                enqueueSnackbar(resp.message, { variant: "success", autoHideDuration: 8000 })
            } else {
                enqueueSnackbar("Não foi possível deletar os produtos!", { variant: "error", autoHideDuration: 8000 })
            }
        } else {
            enqueueSnackbar("Só é possível deletar 1 produto por vez. Selecione apenas 1.", { variant: "error", autoHideDuration: 8000 })
        }

        setSendingRequest(false)
    }

    const handleSubmit = () => {
        let entitiesToDeleteList = productsToDelete.map((f) => f.id)

        startRemoveIntents(entitiesToDeleteList)
    }

    const products = productsToDelete.map(u => (
        <li key={u.id}>
            {u.title} - {parseFloat(u.price).toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })}
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
                            {`Deletando Produto`}
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
            <DialogContent>
                {
                    open &&
                    <>
                        <Typography>
                            Você tem certeza que deseja deletar a lista de produtos abaixo?
                        </Typography>
                        <ul>
                            {products}
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