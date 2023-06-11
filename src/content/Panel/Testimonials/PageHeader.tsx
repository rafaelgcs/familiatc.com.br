import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { getUser } from '@/services/auth';
import { useEffect, useState } from 'react';
import { UserModel } from '@/models/user';

interface PageHeaderProps {
  child?: Node;
  createNewTestimonial?: Function;

}

function PageHeader(props: PageHeaderProps) {
  const { createNewTestimonial } = props
  const [user, setUser] = useState<UserModel>({})

  useEffect(() => {
    let toVerifyUser = getUser()
    setUser(toVerifyUser)
  }, [])
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Depoimentos
        </Typography>
        <Typography variant="subtitle2">
          {user?.name}, segue abaixo a lista de depoimentos cadastrados.
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={() => createNewTestimonial()}
        >
          Novo Depoimento
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
