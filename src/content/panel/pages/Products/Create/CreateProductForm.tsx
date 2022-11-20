import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate, Navigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
    Link,
    Stack,
    Checkbox,
    TextField,
    IconButton,
    InputAdornment,
    FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// import { userLogin } from '../../../repositories/panel/users';
import { panel as authPanel } from 'src/services/auth';
import { createNewProduct } from 'src/repositories/panel/products';

// ----------------------------------------------------------------------

const CreateProductForm = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const FormSchema = Yup.object().shape({
        title: Yup.string().required('Título do Produto é necessário!'),
        description: Yup.string().required('Descrição do Produto é necessário!'),
        price: Yup.number().required('Insira um valor para o produto!'),
        promotion: Yup.boolean().required('Selecione se o produto tem valor promocional ou não!'),
        promotion_price: Yup.number().required('Informe um valor promocional para o produto!'),
        link: Yup.string().required('Insira o link de redirecionamento do produto!'),
        active: Yup.boolean().required('O produto está ativo ou inativo?'),
        image: Yup.string()
    });

    const createProductSubmit = async (data, setSubmiting) => {
        let response = await createNewProduct(data);
        console.log("SUBMITED")
        if (response.success) {
            navigate('/panel/products/list');
        }

        setSubmiting(false);
    };

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            price: 0,
            promotion: false,
            promotion_price: 0,
            link: '',
            active: false,
            image: ''
        },
        validationSchema: FormSchema,
        onSubmit: (data, func) => {
            createProductSubmit(data, func.setSubmitting);
        }
    });

    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
        formik;

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <TextField
                        fullWidth
                        autoComplete="text"
                        type="text"
                        label="Título"
                        {...getFieldProps('title')}
                        error={Boolean(touched.title && errors.title)}
                        helperText={touched.title && errors.title}
                    />
                    <TextField
                        fullWidth
                        autoComplete="text"
                        type="text"
                        label="Link do Produto"
                        {...getFieldProps('link')}
                        error={Boolean(touched.link && errors.link)}
                        helperText={touched.link && errors.link}
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                {...getFieldProps('active')}
                                checked={values.active}
                            />
                        }
                        label="Produto deve estar ativo?"
                    />

                    <TextField
                        fullWidth
                        autoComplete="description"
                        type="text"
                        multiline
                        rows={4}
                        label="Descrição"
                        {...getFieldProps('description')}
                        error={Boolean(touched.description && errors.description)}
                        helperText={touched.description && errors.description}
                    />
                    <TextField
                        fullWidth
                        autoComplete="number"
                        type="numeric"
                        label="Preço"
                        {...getFieldProps('price')}
                        error={Boolean(touched.price && errors.price)}
                        helperText={touched.price && errors.price}
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                {...getFieldProps('promotion')}
                                checked={values.promotion}
                                onChangeCapture={() => {
                                    values.promotion_price = 0
                                }}
                            />
                        }
                        label="Contém Promoção"
                    />

                    {
                        values.promotion ? (
                            <TextField
                                fullWidth
                                autoComplete="number"
                                type="numeric"
                                label="Preço Promocional"
                                {...getFieldProps('promotion_price')}
                                error={Boolean(touched.promotion_price && errors.promotion_price)}
                                helperText={touched.promotion_price && errors.promotion_price}
                            />
                        ) : <></>
                    }

                </Stack>

                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ my: 2 }}
                >

                </Stack>

                <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                >
                    Criar Produto
                </LoadingButton>
            </Form>
        </FormikProvider>
    );
}

export default CreateProductForm;