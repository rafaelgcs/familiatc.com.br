import { Box, Card, Typography, Container, Button } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const MainContent = styled(Box)(
    () => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

function Status404() {
    return (
        <>
            <Helmet>
                <title>Página não encontrada! | Família TC</title>
            </Helmet>
            <MainContent>
                <Container maxWidth="md">
                    <Box textAlign="center">
                        <img alt="404" height={180} src="/static/images/status/404.svg" />
                        <Typography variant="h2" sx={{ my: 2 }}>
                            A página que está procurando não existe ou ainda está em criação.
                        </Typography>
                        <Typography
                            variant="h4"
                            color="text.secondary"
                            fontWeight="normal"
                            sx={{ mb: 4 }}
                        >
                            Clique no botão abaixo e volte para a página inicial, onde poderá tentar novamente a página correta.
                        </Typography>
                    </Box>
                    <Container maxWidth="sm">
                        <Card sx={{ textAlign: 'center', mt: 3, p: 4 }}>
                            <Link to="/panel" style={{ textDecoration: 'none' }}>
                                <Button variant="outlined">Voltar para o início</Button>
                            </Link>
                        </Card>
                    </Container>
                </Container>
            </MainContent>
        </>
    );
}

export default Status404;
