import { useState, useRef } from 'react';

import {
  Box,
  Menu,
  IconButton,
  Button,
  ListItemText,
  ListItem,
  List,
  Typography
} from '@mui/material';

import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import EditIcon from '@mui/icons-material/Edit';

interface BulkActionsProps {
  goToEdit?: Function;
  goToDelete?: Function;
}

function BulkActions(props: BulkActionsProps) {

  const { goToEdit, goToDelete } = props;
  const [onMenuOpen, menuOpen] = useState<boolean>(false);
  const moreRef = useRef<HTMLButtonElement | null>(null);

  const openMenu = (): void => {
    menuOpen(true);
  };

  const closeMenu = (): void => {
    menuOpen(false);
  };

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Typography variant="h5" color="text.secondary">
            Ações gerais:
          </Typography>
          <Button
            color="error"
            sx={{ ml: 1 }}
            startIcon={<DeleteTwoToneIcon />}
            variant="contained"
            onClick={() => goToDelete()}
          >
            Deletar
          </Button>
          <Button
            color="primary"
            sx={{ ml: 1 }}
            startIcon={<EditIcon />}
            variant="contained"
            onClick={() => goToEdit()}
          >
            Editar
          </Button>
        </Box>
        <IconButton
          color="primary"
          onClick={openMenu}
          ref={moreRef}
          sx={{ ml: 2, p: 1 }}
        >
          <MoreVertTwoToneIcon />
        </IconButton>
      </Box>

      <Menu
        keepMounted
        anchorEl={moreRef.current}
        open={onMenuOpen}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
      >
        <List sx={{ p: 1 }} component="nav">
          <ListItem onClick={() => goToDelete()}>
            <ListItemText primary="Deletar Selecionados" />
          </ListItem>
          <ListItem onClick={() => goToEdit()}>
            <ListItemText primary="Editar Selecionados" />
          </ListItem>
        </List>
      </Menu>
    </>
  );
}

export default BulkActions;
