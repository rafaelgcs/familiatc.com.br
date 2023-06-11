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
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import { FAQModel } from '@/models/faq';
import { updateFAQ } from '@/repositories/faqs';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface EditFAQDialogProps {
    child?: Node;
    open?: boolean;
    onClose?: Function;
    onSuccess?: Function;
    onError?: Function;
    faq?: FAQModel;

}

export default function EditFAQDialog(props: EditFAQDialogProps) {
    const { enqueueSnackbar } = useSnackbar()
    const { open, onClose, onSuccess, onError, faq } = props

    const handleClose = () => {
        onClose()
    };


    const NewFAQSchema = Yup.object().shape({
        question: Yup.string().required('A pergunta é um campo obrigatório.'),
        answer: Yup.string().required('A resposta é um campo obrigatório.'),
        rating: Yup.number().min(1, 'O número mínimo da ordenação é 1'),
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

    const { errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } =
        formik;

    const loadFAQInForm = (faqToLoad: FAQModel) => {

        setFieldValue('question', faqToLoad.question)
        setFieldValue('answer', faqToLoad.answer)
        setFieldValue('rating', faqToLoad.rating)
        setFieldValue('active', faqToLoad.active == true)
    }

    const handleSubmitForm = async (data, setSubmitting) => {
        setSubmitting(true)
        const resp = await updateFAQ(`${faq.id}`, data)

        if (resp.success) {
            handleClose()
            onSuccess()
            enqueueSnackbar("Pergunta atualizada com sucesso!", { variant: "success", autoHideDuration: 6000 })
        } else {
            onError()
            enqueueSnackbar(resp.message, { variant: "error", autoHideDuration: 6000 })
        }

        setSubmitting(false)
    }

    React.useEffect(() => {
        if (faq != null && faq != undefined) {
            loadFAQInForm(faq)
        }
    }, [faq])

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
                            Editando Pergunta: {faq?.id}
                        </Typography>
                        <LoadingButton
                            variant="outlined"
                            color="inherit"
                            onClick={() => handleSubmit()}
                            loading={isSubmitting}
                        >
                            Salvar
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
                                            checked={formik.values.active}
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