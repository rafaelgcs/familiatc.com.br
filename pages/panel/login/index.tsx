import * as Yup from 'yup';

import {
    Typography,
    Box,
    styled,
    Divider,
    useTheme,
    IconButton,
    InputAdornment,
    FormControlLabel,
    TextField,
    Checkbox,
    Paper,
    Grid
} from '@mui/material';
import { ReactElement, useEffect } from 'react';
import { useState } from 'react';
import BaseLayout from 'src/layouts/BaseLayout';

import { useFormik, Form, FormikProvider } from 'formik';

import Head from 'next/head';
import { useRouter } from 'next/router';

import LogoWithSize from '@/components/LogoWithSize';

import { LoadingButton } from '@mui/lab';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { doUserLogin } from '@/repositories/users';
import { useSnackbar } from 'notistack';
import { isAuthenticated } from '@/services/auth';

const OverviewWrapper = styled(Box)(
    ({ theme }) => `
      overflow: auto;
      background: ${theme.palette.common.white};
      flex: 1;
      overflow-x: hidden;
  `
);

function Login() {
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useRouter()
    const theme = useTheme()
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email("Insira um e-mail válido").required('O e-mail é um campo obrigatório.'),
        password: Yup.string().required('A senha é um campo obrigatório.'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: LoginSchema,
        onSubmit: (data, func) => {
            handleSubmitLogin(data, func.setSubmitting);
        }
    });

    const { errors, touched, isSubmitting, handleSubmit, getFieldProps } =
        formik;

    const handleSubmitLogin = async (data, setSubmitting) => {
        setSubmitting(true)

        const resp = await doUserLogin(data)

        if (resp.success) {
            enqueueSnackbar("Sucesso no login", { variant: "success", autoHideDuration: 2000 })
            // navigate.push('/panel/dashboard')
            window.location.href="/panel/dashboard"
        } else {
            enqueueSnackbar(resp.message, { variant: "error", autoHideDuration: 2000 })
        }

        setSubmitting(false)
    }

    const handleShowPassword = () => {
        setShowPassword((show) => !show);
    };

    useEffect(() => {
        let authenticated = isAuthenticated()

        if (authenticated) navigate.push('/panel/dashboard')
    }, [])

    return (
        <OverviewWrapper>
            <Head>
                <title>Autenticação de Usuário | Família TC</title>
            </Head>
            <Grid container component="main" sx={{ height: '100vh', transition: 'all .2s linear' }}>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={8}
                    sx={{
                        backgroundImage: `url(/static/images/placeholders/covers/cover_23.jpg)`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        transition: 'all .2s linear'
                    }}
                />
                <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square sx={{ transition: 'all .2s linear' }}>
                    <Grid container alignItems="center" justifyContent="center" spacing={0} sx={{ height: '100vh', m: 0, p: 0 }}>
                        <Grid item sx={{ p: 0, m: 0 }}>

                            <Box
                                sx={{
                                    my: 8,
                                    mx: 4,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <LogoWithSize size={300} />
                                <Divider
                                    sx={{
                                        mt: theme.spacing(3),
                                        mx: theme.spacing(2),
                                        background: theme.palette.mode == 'dark' ? theme.colors.alpha.trueWhite[10] :
                                            theme.colors.alpha.black[10]
                                    }}
                                />
                                <Typography component="h1" variant="h5">
                                    SISTEMA PARA GERENCIAR CONTEÚDO EXIBIDO NA PÁGINA INICIAL
                                </Typography>
                                <FormikProvider value={formik}>
                                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                                        <Box sx={{ mt: 1 }}>
                                            <TextField
                                                margin="normal"
                                                fullWidth
                                                label="E-mail"
                                                autoComplete="email"
                                                type="email"
                                                {...getFieldProps('email')}
                                                error={Boolean(touched.email && errors.email)}
                                                helperText={touched.email && errors.email}
                                            />
                                            <TextField
                                                fullWidth
                                                autoComplete="current-password"
                                                type={showPassword ? 'text' : 'password'}
                                                label="Senha"
                                                {...getFieldProps('password')}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton onClick={handleShowPassword} edge="end">
                                                                {
                                                                    showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />
                                                                }
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                                                error={Boolean(touched.password && errors.password)}
                                                helperText={touched.password && errors.password}
                                            />
                                            <FormControlLabel
                                                control={<Checkbox value="remember" color="primary" />}
                                                label="Remember me"
                                            />
                                            <LoadingButton
                                                fullWidth
                                                size="large"
                                                variant="contained"
                                                type="submit"
                                                loading={isSubmitting}
                                            >
                                                Entrar
                                            </LoadingButton>
                                        </Box>
                                    </Form>
                                </FormikProvider>
                            </Box>

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        </OverviewWrapper >
    );
}

export default Login;

Login.getLayout = function getLayout(page: ReactElement) {
    return <BaseLayout>{page}</BaseLayout>;
};
