import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { getUser } from '@/services/auth';
import { useEffect, useState } from 'react';
import { UserModel } from '@/models/user';

interface PageHeaderProps {
  child?: Node;
  createNewProduct?: Function;

}

function PageHeader(props: PageHeaderProps) {
  const { createNewProduct } = props
  const [user, setUser] = useState<UserModel>({})

  useEffect(() => {
    let toVerifyUser = getUser()
    setUser(toVerifyUser)
  }, [])
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Produtos
        </Typography>
        <Typography variant="subtitle2">
          {user?.name}, segue abaixo a lista de produtos cadastrados.
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={() => createNewProduct()}
        >
          Novo Produto
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
