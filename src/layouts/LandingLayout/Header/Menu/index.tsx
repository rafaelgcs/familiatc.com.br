import {
  Box,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import { getAllProductsLight } from 'src/repositories/panel/products';

const ListWrapper = styled(Box)(
  ({ theme }) => `
        .MuiTouchRipple-root {
            display: none;
        }
        
        .MuiListItem-root {
            transition: ${theme.transitions.create(['color', 'fill'])};
            
            &.MuiListItem-indicators {
                padding: ${theme.spacing(1, 2)};
            
                .MuiListItemText-root {
                    .MuiTypography-root {
                        &:before {
                            height: 4px;
                            width: 22px;
                            opacity: 0;
                            visibility: hidden;
                            display: block;
                            position: absolute;
                            bottom: -10px;
                            transition: all .2s;
                            border-radius: ${theme.general.borderRadiusLg};
                            content: "";
                            background: ${theme.colors.primary.main};
                        }
                    }
                }

                &.active,
                &:active,
                &:hover {
                
                    background: transparent;
                
                    .MuiListItemText-root {
                        .MuiTypography-root {
                            &:before {
                                opacity: 1;
                                visibility: visible;
                                bottom: 0px;
                            }
                        }
                    }
                }
            }
        }
`
);

function HeaderMenu(props) {

  const { isDrawer } = props;

  const [products, setProducts] = useState<any>([]);
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  useEffect(() => {
    const getActiveProducts = async () => {

      let response = await getAllProductsLight();
      console.log("GET", response)
      if (response.success) {
        console.log("SUCCESS?")
        setProducts(response.data)
      }

    }


    getActiveProducts()
  }, [])

  return (
    <>
      <ListWrapper>

        {
          isDrawer ?
            <List>
              <Tooltip arrow title="Início">
                <ListItem
                  classes={{ root: 'MuiListItem-indicators' }}
                  button
                  component={NavLink}
                  to="/"
                  style={{
                    marginTop: 10,
                    marginBottom: 10
                  }}
                >
                  <ListItemText
                    primaryTypographyProps={{ noWrap: true }}
                    primary="Início"
                  />
                </ListItem>
              </Tooltip>
              <Tooltip arrow title="Preencha o formulário e receba atendimento especializado!">
                <ListItem
                  classes={{ root: 'MuiListItem-indicators' }}
                  button
                  onClick={() => document.location.href = "https://www.mfitpersonal.com.br/index?share=MjE1MjIvMC85LzA="}
                  style={{
                    marginTop: 10,
                    marginBottom: 10
                  }}
                >
                  <ListItemText
                    primaryTypographyProps={{ noWrap: true }}
                    primary="Cadastre-se"
                  />
                </ListItem>
              </Tooltip>
              <Tooltip arrow title="Conheça nossos planos!">
                <ListItem
                  classes={{ root: 'MuiListItem-indicators' }}
                  button
                  ref={ref}
                  onClick={handleOpen}
                  style={{
                    marginTop: 10,
                    marginBottom: 10
                  }}
                >
                  <ListItemText
                    primaryTypographyProps={{ noWrap: true }}
                    primary={
                      <Box display="flex" alignItems="center">
                        Planos
                        <Box display="flex" alignItems="center" pl={0.3}>
                          <ExpandMoreTwoToneIcon fontSize="small" />
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
              </Tooltip>
              <Tooltip arrow title="Fale comigo no Whatsapp">
                <ListItem
                  classes={{ root: 'MuiListItem-indicators' }}
                  button
                  onClick={() => document.location.href = "https://api.whatsapp.com/send?phone=5571992483233"}
                  style={{
                    marginTop: 10,
                    marginBottom: 10
                  }}
                >
                  <ListItemText
                    primaryTypographyProps={{ noWrap: true }}
                    primary="Whatsapp"
                  />
                </ListItem>
              </Tooltip>
            </List> :
            <List disablePadding component={Box} display="flex">
              <Tooltip arrow title="Início">
                <ListItem
                  classes={{ root: 'MuiListItem-indicators' }}
                  button
                  component={NavLink}
                  to="/"
                >
                  <ListItemText
                    primaryTypographyProps={{ noWrap: true }}
                    primary="Início"
                  />
                </ListItem>
              </Tooltip>
              <Tooltip arrow title="Preencha o formulário e receba atendimento especializado!">
                <ListItem
                  classes={{ root: 'MuiListItem-indicators' }}
                  button
                  onClick={() => document.location.href = "https://www.mfitpersonal.com.br/index?share=MjE1MjIvMC85LzA="}
                >
                  <ListItemText
                    primaryTypographyProps={{ noWrap: true }}
                    primary="Cadastre-se"
                  />
                </ListItem>
              </Tooltip>
              <Tooltip arrow title="Conheça nossos planos!">
                <ListItem
                  classes={{ root: 'MuiListItem-indicators' }}
                  button
                  ref={ref}
                  onClick={handleOpen}
                >
                  <ListItemText
                    primaryTypographyProps={{ noWrap: true }}
                    primary={
                      <Box display="flex" alignItems="center">
                        Planos
                        <Box display="flex" alignItems="center" pl={0.3}>
                          <ExpandMoreTwoToneIcon fontSize="small" />
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
              </Tooltip>
              <Tooltip arrow title="Fale comigo no Whatsapp">
                <ListItem
                  classes={{ root: 'MuiListItem-indicators' }}
                  button
                  onClick={() => document.location.href = "https://api.whatsapp.com/send?phone=5571992483233"}
                >
                  <ListItemText
                    primaryTypographyProps={{ noWrap: true }}
                    primary="Whatsapp"
                  />
                </ListItem>
              </Tooltip>
            </List>
        }
      </ListWrapper>
      <Menu anchorEl={ref.current} onClose={handleClose} open={isOpen}>

        {
          products.map((product_selected) => {
            return <MenuItem sx={{ px: 3 }} onClick={() => document.location.href = product_selected.link}>
              {product_selected.title}
            </MenuItem>
          })
        }
        {/* <MenuItem sx={{ px: 3 }} component={NavLink} to="/">
          Overview
        </MenuItem>
        <MenuItem sx={{ px: 3 }} component={NavLink} to="/components/tabs">
          Tabs
        </MenuItem>
        <MenuItem sx={{ px: 3 }} component={NavLink} to="/components/cards">
          Cards
        </MenuItem>
        <MenuItem sx={{ px: 3 }} component={NavLink} to="/components/modals">
          Modals
        </MenuItem> */}
      </Menu>
    </>
  );
}

export default HeaderMenu;
