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
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { updateProduct } from '@/repositories/products';
import { ProductModel } from '@/models/product';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
    function NumericFormatCustom(props, ref) {
        const { onChange, ...other } = props;

        return (
            <NumericFormat
                {...other}
                getInputRef={ref}
                onValueChange={(values) => {
                    onChange({
                        target: {
                            name: props.name,
                            value: values.value,
                        },
                    });
                }}
                thousandSeparator='.'
                valueIsNumericString
                decimalScale={2}
                decimalSeparator=','
                fixedDecimalScale
                prefix="R$"
            />
        );
    },
);

interface EditProductDialogProps {
    child?: Node;
    open?: boolean;
    onClose?: Function;
    onSuccess?: Function;
    onError?: Function;
    product?: ProductModel;

}

export default function EditProductDialog(props: EditProductDialogProps) {
    const { enqueueSnackbar } = useSnackbar()
    const { open, onClose, onSuccess, onError, product } = props

    const handleClose = () => {
        onClose()
    };


    const NewProductSchema = Yup.object().shape({
        title: Yup.string().required('O título do produto é um campo obrigatório.'),
        subtitle: Yup.string(),
        description: Yup.string(),
        link: Yup.string().required('O link do produto é um campo obrigatório'),
        price: Yup.string().required('O preço do produto é um campo obrigatório'),
        buttonText: Yup.string().required('O texto do botão é um campo obrigatório.'),
        promotion: Yup.boolean(),
        promotion_price: Yup.string(),
        active: Yup.boolean()
    });

    const formik = useFormik({
        initialValues: {
            title: '',
            subtitle: '',
            description: '',
            link: '',
            price: '',
            promotion: false,
            promotion_price: '',
            buttonText: '',
            active: false
        },
        validationSchema: NewProductSchema,
        onSubmit: (data, func) => {
            handleSubmitForm(data, func.setSubmitting);
        }
    });

    const { errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } =
        formik;

    const loadProductInForm = (productToLoad: ProductModel) => {

        setFieldValue('title', productToLoad.title)
        setFieldValue('subtitle', productToLoad.subtitle ? productToLoad.subtitle : "")
        setFieldValue('link', productToLoad.link)
        setFieldValue('description', productToLoad.description)
        setFieldValue('price', productToLoad.price)
        setFieldValue('promotion', productToLoad.promotion == true)
        setFieldValue('promotion_price', productToLoad.promotion_price)
        setFieldValue('buttonText', productToLoad.buttonText)
        setFieldValue('active', productToLoad.active == true)
    }

    const handleSubmitForm = async (data, setSubmitting) => {
        setSubmitting(true)
        const resp = await updateProduct(`${product.id}`, data)

        if (resp.success) {
            handleClose()
            onSuccess()
            enqueueSnackbar("Produto atualizado com sucesso!", { variant: "success", autoHideDuration: 6000 })
        } else {
            onError()
            enqueueSnackbar(resp.message, { variant: "error", autoHideDuration: 6000 })
        }

        setSubmitting(false)
    }

    React.useEffect(() => {
        if (product != null && product != undefined) {
            loadProductInForm(product)
        }
    }, [product])

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
                            Produto: {product?.title}
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
                                    autoComplete='title'
                                    label="Título"
                                    {...getFieldProps('title')}
                                    error={Boolean(touched.title && errors.title)}
                                    helperText={touched.title && errors.title}
                                />
                            </Grid>
                            <Grid item sm={12} md={6} lg={6}>
                                <TextField
                                    fullWidth
                                    variant='outlined'
                                    type='text'
                                    autoComplete='subtitle'
                                    label="Subtítulo"
                                    {...getFieldProps('subtitle')}
                                    error={Boolean(touched.subtitle && errors.subtitle)}
                                    helperText={touched.subtitle && errors.subtitle}
                                />
                            </Grid>
                            <Grid item sm={12} md={12} lg={12}>
                                <TextField
                                    fullWidth
                                    variant='outlined'
                                    type='text'
                                    autoComplete='link'
                                    label="Link"
                                    {...getFieldProps('link')}
                                    error={Boolean(touched.link && errors.link)}
                                    helperText={touched.link && errors.link}
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
                                    {...getFieldProps('description')}
                                    error={Boolean(touched.description && errors.description)}
                                    helperText={touched.description && errors.description}
                                />
                            </Grid>
                            <Grid item sm={12} md={3} lg={3}>
                                <TextField
                                    fullWidth
                                    variant='outlined'
                                    autoComplete='price'
                                    label="Preço"
                                    InputProps={{
                                        inputComponent: NumericFormatCustom as any,
                                    }}
                                    {...getFieldProps('price')}
                                    error={Boolean(touched.price && errors.price)}
                                    helperText={touched.price && errors.price}
                                />
                            </Grid>
                            <Grid item sm={12} md={2} lg={2}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formik.values.promotion}
                                            {...getFieldProps('promotion')}
                                        />
                                    }
                                    label="Em Promoção"
                                />
                            </Grid>
                            {
                                formik.values.promotion &&
                                <Grid item sm={12} md={3} lg={3}>
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        type='text'
                                        autoComplete='price'
                                        InputProps={{
                                            inputComponent: NumericFormatCustom as any,
                                        }}
                                        label="Preço da Promoção"
                                        {...getFieldProps('promotion_price')}
                                        error={Boolean(touched.promotion_price && errors.promotion_price)}
                                        helperText={touched.promotion_price && errors.promotion_price}
                                    />
                                </Grid>
                            }
                            <Grid item sm={12} md={4} lg={4}>
                                <TextField
                                    fullWidth
                                    variant='outlined'
                                    autoComplete='text'
                                    label="Texto do Botão"
                                    {...getFieldProps('buttonText')}
                                    error={Boolean(touched.buttonText && errors.buttonText)}
                                    helperText={touched.buttonText && errors.buttonText}
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
                                    label="Produto Ativo?"
                                />
                            </Grid>
                        </Grid>
                    </Form>
                </FormikProvider>
            </Container>
        </Dialog>
    );
}