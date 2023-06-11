import * as Yup from 'yup';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box, Checkbox, Container, FormControlLabel, Grid, LinearProgress, TextField } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { createFAQ } from '@/repositories/faqs';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface NewFAQDialogProps {
    child?: Node;
    open?: boolean;
    onClose?: Function;
    onSuccess?: Function;
    onError?: Function;
    onInitSubmit?: Function;
}

export default function NewFAQDialog(props: NewFAQDialogProps) {
    const { enqueueSnackbar } = useSnackbar()
    const { open, onClose, onSuccess, onError, onInitSubmit } = props

    const handleClose = () => {
        onClose()
    };


    const NewFAQSchema = Yup.object().shape({
        question: Yup.string().required('A pergunta é um campo obrigatório.'),
        answer: Yup.string().required('A resposta é um campo obrigatório.'),
        rating: Yup.number().min(1 ,'O número mínimo da ordenação é 1'),
        active: Yup.boolean()
    });

    const formik = useFormik({
        initialValues: {
            question: '',
            answer: '',
            rating: 1,
            active: false
        },
        validationSchema: NewFAQSchema,
        onSubmit: (data, func) => {
            handleSubmitForm(data, func.setSubmitting);
        }
    });

    const { errors, touched, isSubmitting, handleSubmit, getFieldProps } =
        formik;

    const handleSubmitForm = async (data, setSubmitting) => {
        setSubmitting(true)
        onInitSubmit()
        const resp = await createFAQ(data)

        if (resp.success) {
            enqueueSnackbar("Pergunta frequente adicionada com sucesso!", { variant: "success", autoHideDuration: 8000 })
            onSuccess()
            handleClose()
            formik.resetForm()
        } else {
            enqueueSnackbar(resp.message, { variant: "error", autoHideDuration: 10000 })
            onError()
        }

        setSubmitting(false)
    }


    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Container sx={{ py: 1 }} maxWidth="xl">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Criando Nova Pergunta Frequente
                        </Typography>
                        <LoadingButton loading={isSubmitting} autoFocus variant="outlined" color="inherit" onClick={() => handleSubmit()}>
                            Criar
                        </LoadingButton>
                    </Toolbar>
                </Container>
            </AppBar>
            <Container maxWidth="xl" sx={{ py: 3 }}>
                {
                    isSubmitting && <>
                        <Box sx={{ my: 2 }}>
                            <LinearProgress color='secondary' />
                        </Box>
                    </>
                }
                <FormikProvider value={formik}>
                    <Form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item sm={12} md={12} lg={12}>
                                <TextField
                                    fullWidth
                                    variant='outlined'
                                    type='text'
                                    autoComplete='question'
                                    label="Pergunta"
                                    {...getFieldProps('question')}
                                    error={Boolean(touched.question && errors.question)}
                                    helperText={touched.question && errors.question}
                                />
                            </Grid>
                            <Grid item sm={12} md={12} lg={12}>
                                <TextField
                                    fullWidth
                                    variant='outlined'
                                    type='text'
                                    autoComplete='answer'
                                    label="Resposta"
                                    multiline
                                    rows={4}
                                    {...getFieldProps('answer')}
                                    error={Boolean(touched.answer && errors.answer)}
                                    helperText={touched.answer && errors.answer}
                                />
                            </Grid>
                            <Grid item sm={12} md={2} lg={2}>
                                <TextField
                                    fullWidth
                                    variant='outlined'
                                    type='number'
                                    autoComplete='number'
                                    label="Ordem"
                                    {...getFieldProps('rating')}
                                    error={Boolean(touched.rating && errors.rating)}
                                    helperText={touched.rating && errors.rating}
                                />
                            </Grid>
                            <Grid item sm={12} md={2} lg={2}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            {...getFieldProps('active')}
                                        />
                                    }
                                    label="Pergunta Ativa?"
                                />
                            </Grid>
                        </Grid>
                    </Form>
                </FormikProvider>
            </Container>
        </Dialog>
    );
}