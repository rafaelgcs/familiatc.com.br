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
import { Box, Checkbox, Container, FormControlLabel, Grid, LinearProgress, Rating, TextField } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import { TestimonialModel } from '@/models/testimonial';
import { updateTestimonial } from '@/repositories/testimonials';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface EditTestimonialDialogProps {
    child?: Node;
    open?: boolean;
    onClose?: Function;
    onSuccess?: Function;
    onError?: Function;
    testimonial?: TestimonialModel;

}

export default function EditTestimonialDialog(props: EditTestimonialDialogProps) {
    const { enqueueSnackbar } = useSnackbar()
    const { open, onClose, onSuccess, onError, testimonial } = props

    const handleClose = () => {
        onClose()
    };


    const NewTestimonialSchema = Yup.object().shape({
        name: Yup.string().required('O apelido é um campo obrigatório.'),
        full_name: Yup.string().required('O nome completo é um campo obrigatório.'),
        text: Yup.string(),
        stars: Yup.number(),
        image: Yup.string(),
        show: Yup.boolean()
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            full_name: '',
            text: '',
            stars: 0,
            image: '',
            show: false
        },
        validationSchema: NewTestimonialSchema,
        onSubmit: (data, func) => {
            handleSubmitForm(data, func.setSubmitting);
        }
    });

    const { errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } =
        formik;

    const loadTestimonialInForm = (testimonialToLoad: TestimonialModel) => {

        setFieldValue('name', testimonialToLoad.name)
        setFieldValue('full_name', testimonialToLoad.full_name ? testimonialToLoad.full_name : "")
        setFieldValue('text', testimonialToLoad.text)
        setFieldValue('stars', testimonialToLoad.stars)
        setFieldValue('image', testimonialToLoad.image)
        setFieldValue('show', testimonialToLoad.show == true)
    }

    const handleSubmitForm = async (data, setSubmitting) => {
        setSubmitting(true)
        const resp = await updateTestimonial(`${testimonial.id}`, data)

        if (resp.success) {
            handleClose()
            onSuccess()
            enqueueSnackbar("Depoimento atualizado com sucesso!", { variant: "success", autoHideDuration: 6000 })
            // navigate.push('/dashboards/overview')
        } else {
            onError()
            enqueueSnackbar(resp.message, { variant: "error", autoHideDuration: 6000 })
        }

        setSubmitting(false)
    }

    React.useEffect(() => {
        if (testimonial != null && testimonial != undefined) {
            loadTestimonialInForm(testimonial)
        }
    }, [testimonial])

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
                            Depoimento de: {testimonial?.name}
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
                            <Grid item sm={12} md={6} lg={6}>
                                <TextField
                                    fullWidth
                                    variant='outlined'
                                    type='text'
                                    autoComplete='nickname'
                                    label="Apelido"
                                    {...getFieldProps('name')}
                                    error={Boolean(touched.name && errors.name)}
                                    helperText={touched.name && errors.name}
                                />
                            </Grid>
                            <Grid item sm={12} md={6} lg={6}>
                                <TextField
                                    fullWidth
                                    variant='outlined'
                                    type='text'
                                    autoComplete='name'
                                    label="Nome Completo"
                                    {...getFieldProps('full_name')}
                                    error={Boolean(touched.full_name && errors.full_name)}
                                    helperText={touched.full_name && errors.full_name}
                                />
                            </Grid>
                            <Grid item sm={12} md={12} lg={12}>
                                <TextField
                                    fullWidth
                                    variant='outlined'
                                    type='text'
                                    autoComplete='link'
                                    label="Imagem"
                                    {...getFieldProps('image')}
                                    error={Boolean(touched.image && errors.image)}
                                    helperText={touched.image && errors.image}
                                />
                            </Grid>
                            <Grid item sm={12} md={2} lg={2}>
                                <Box
                                    sx={{
                                        '& > legend': { mt: 2 },
                                    }}
                                >
                                    <Typography component="legend">Nota</Typography>
                                    <Rating
                                        name="rating"
                                        precision={1}
                                        {...getFieldProps('stars')}
                                    />
                                </Box>
                            </Grid>

                            <Grid item sm={12} md={2} lg={2}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formik.values.show}
                                            {...getFieldProps('show')}
                                        />
                                    }
                                    label="Exibir?"
                                />
                            </Grid>
                            <Grid item sm={12} md={12} lg={12}>
                                <TextField
                                    fullWidth
                                    variant='outlined'
                                    type='text'
                                    autoComplete='description'
                                    label="Descrição"
                                    multiline
                                    rows={4}
                                    {...getFieldProps('text')}
                                    error={Boolean(touched.text && errors.text)}
                                    helperText={touched.text && errors.text}
                                />
                            </Grid>

                        </Grid>
                    </Form>
                </FormikProvider>
            </Container>
        </Dialog>
    );
}