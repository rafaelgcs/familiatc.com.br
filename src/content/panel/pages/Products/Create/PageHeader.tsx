import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useEffect, useState } from 'react';
import { panel } from 'src/services/auth';
import { Link } from 'react-router-dom';

function PageHeader() {

    const [user, setUser] = useState({ name: 'Olá' });

    useEffect(() => {
        let loggedUser = panel.panelGetUser();
        setUser(loggedUser);
    }, [])


    return (
        <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
                <Typography variant="h3" component="h3" gutterBottom>
                    Produtos
                </Typography>
                <Typography variant="subtitle2">
                    {user.name}, você está na tela de criação de novo produto!
                </Typography>
            </Grid>
        </Grid>
    );
}

export default PageHeader;
