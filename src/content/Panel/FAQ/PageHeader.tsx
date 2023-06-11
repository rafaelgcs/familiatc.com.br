import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { getUser } from '@/services/auth';
import { useEffect, useState } from 'react';
import { UserModel } from '@/models/user';

interface PageHeaderProps {
  child?: Node;
  createNewFAQ?: Function;

}

function PageHeader(props: PageHeaderProps) {
  const { createNewFAQ } = props
  const [user, setUser] = useState<UserModel>({})

  useEffect(() => {
    let toVerifyUser = getUser()
    setUser(toVerifyUser)
  }, [])
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Perguntas Frequentes
        </Typography>
        <Typography variant="subtitle2">
          {user?.name}, segue abaixo a lista de perguntas cadastradas.
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={() => createNewFAQ()}
        >
          Nova Pergunta
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
