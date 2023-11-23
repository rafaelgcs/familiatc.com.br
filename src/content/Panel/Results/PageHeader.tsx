import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { getUser } from '@/services/auth';
import { useEffect, useState } from 'react';
import { UserModel } from '@/models/user';

interface PageHeaderProps {
  child?: Node;
  createNewResult?: Function;

}

function PageHeader(props: PageHeaderProps) {
  const { createNewResult } = props
  const [user, setUser] = useState<UserModel>({})

  useEffect(() => {
    let toVerifyUser = getUser()
    setUser(toVerifyUser)
  }, [])
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Resultados
        </Typography>
        <Typography variant="subtitle2">
          {user?.name}, segue abaixo a lista de resultados cadastrados.
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={() => createNewResult()}
        >
          Novo Resultado
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
