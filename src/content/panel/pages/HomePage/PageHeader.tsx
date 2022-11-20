import {
  Typography,
  Avatar,
  Grid
  // getListSubheaderUtilityClass
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { panel } from 'src/services/auth';

const PageHeader = () => {
  const [user, setUser] = useState({ name: null, image: null });
  const theme = useTheme();
  const getUser = async () => {
    let nUser = panel.panelGetUser();
    console.log("logged user", nUser)
    if (nUser != null) {
      setUser(nUser);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return user.name ? (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          sx={{ mr: 2, width: theme.spacing(8), height: theme.spacing(8) }}
          variant="rounded"
          alt={user.name}
          src={user.image}
        />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Welcome, {user.name}!
        </Typography>
        <Typography variant="subtitle2">
          Manage your day to day tasks with style! Enjoy a well built UI system
        </Typography>
      </Grid>
    </Grid>
  ) : (
    <></>
  );
};

export default PageHeader;
