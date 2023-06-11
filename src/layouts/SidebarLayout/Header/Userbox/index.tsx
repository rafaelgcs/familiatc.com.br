import { useRef, useState, useEffect } from 'react';

import NextLink from 'next/link';

import {
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  lighten,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography
} from '@mui/material';

import InboxTwoToneIcon from '@mui/icons-material/InboxTwoTone';
import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import { doLocalLogout, getUser } from '@/services/auth';
import { UserModel } from '@/models/user';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { generateRandomColors } from 'src/utils/functions';

const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`
);

function HeaderUserbox() {
  const navigate = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const [user, setUser] = useState<UserModel | null>()
  const [generatedColor, setGeneratedColor] = useState()

  const stringAvatar = (name: string) => {
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
  }

  const getFirstLastName = (name: string) => {
    let splitedName = name.split(' ')
    if (splitedName.length > 1) {
      return `${splitedName[0]} ${splitedName[splitedName.length - 1]}`;
    } else {
      return {
        children: `${splitedName[0]}`,
      };
    }
  }


  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const doLogout = async () => {
    let res = doLocalLogout()

    if (res) {
      enqueueSnackbar('Logout finalizado com sucesso!', { variant: 'success' })
      navigate.push('/panel/login')
    } else {
      enqueueSnackbar('Erro ao tentar realizar logout, tente novamente.', { variant: 'error' })

    }
  }

  useEffect(() => {
    let toVerifyUser = getUser()
    setUser(toVerifyUser)
    setGeneratedColor(generateRandomColors(1))
  }, [])

  return (
    user ?
      <>
        <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
          <Avatar variant="rounded" alt={user.name} {...stringAvatar(user.name)} sx={{ bgcolor: generatedColor }} />
          <Hidden mdDown>
            <UserBoxText>
              <UserBoxLabel variant="body1">{getFirstLastName(user.name)}</UserBoxLabel>
              <UserBoxDescription variant="body2">
                {user.rank}
              </UserBoxDescription>
            </UserBoxText>
          </Hidden>
          <Hidden smDown>
            <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
          </Hidden>
        </UserBoxButton>
        <Popover
          anchorEl={ref.current}
          onClose={handleClose}
          open={isOpen}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          <MenuUserBox sx={{ minWidth: 210 }} display="flex">
            <Avatar variant="rounded" alt={user.name} {...stringAvatar(user.name)} sx={{ bgcolor: generatedColor }} />
            <UserBoxText>
              <UserBoxLabel variant="body1">{getFirstLastName(user.name)}</UserBoxLabel>
              <UserBoxDescription variant="body2">
                {user.rank}
              </UserBoxDescription>
            </UserBoxText>
          </MenuUserBox>
          <Divider sx={{ mb: 0 }} />
          <List sx={{ p: 1 }} component="nav">
            <NextLink href="/management/profile" passHref>
              <ListItem button>
                <AccountBoxTwoToneIcon fontSize="small" />
                <ListItemText primary="Perfil" />
              </ListItem>
            </NextLink>
            {
              user.rank == "admin" && <>
                <NextLink href="/management/users" passHref>
                  <ListItem button>
                    <InboxTwoToneIcon fontSize="small" />
                    <ListItemText primary="Usuários" />
                  </ListItem>
                </NextLink>
              </>
            }
          </List>
          <Divider />
          <Box sx={{ m: 1 }}>
            <Button onClick={() => doLogout()} color="error" fullWidth>
              <LockOpenTwoToneIcon sx={{ mr: 1 }} />
              Desconectar
            </Button>
          </Box>
        </Popover>
      </> : <></>
  );
}

export default HeaderUserbox;
