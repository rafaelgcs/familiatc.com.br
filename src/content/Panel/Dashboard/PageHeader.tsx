import { UserModel } from '@/models/user';
import { getUser } from '@/services/auth';
import { Typography, Avatar, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { generateRandomColors } from 'src/utils/functions';

function PageHeader() {
  const theme = useTheme();
  const [user, setUser] = useState<UserModel | null>()
  const [generatedColor, setGeneratedColor] = useState()

  const stringAvatar = (name: string) => {
    console.log("stringAvatar", name)
    if (name) {
      let splitedName = name.split(' ')
      if (splitedName.length > 1) {
        return {
          children: `${name.split(' ')[0][0]}${name.split(' ')[splitedName.length - 1][0]}`,
        };
      } else {
        return {
          children: `${name.split(' ')[0][0]}`,
        };
      }
    } else {
      return {
        children: ``,
      }
    }
  }

  useEffect(() => {
    let toVerifyUser = getUser()
    console.log(toVerifyUser)
    setUser(toVerifyUser)
    setGeneratedColor(generateRandomColors(1))
  }, [])

  return (
    user ?
      <Grid container alignItems="center">
        <Grid item>

          <Avatar
            sx={{
              mr: 2,
              width: theme.spacing(8),
              height: theme.spacing(8),
              bgcolor: generatedColor,
              fontSize: 30
            }}
            variant='rounded'
            {...stringAvatar(user?.name)} />

        </Grid>
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            Bem vindo(a), {user?.name?.split(' ')[0]}!
          </Typography>
          <Typography variant="subtitle2">
            Sua Dashboard está preparada.
          </Typography>
        </Grid>
      </Grid>
      : <></>
  );
}

export default PageHeader;
