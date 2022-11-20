import {
  Typography,
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListSubheader,
  ListItemText,
  Avatar,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const ListWrapper = styled(List)(
  () => `
        .MuiListItem-root {
          border-radius: 0;
          margin: 0;
        }
  `
);

const socialList = [
  {
    title: 'Instagram (@rafaelgcs)',
    url: 'https://instagram.com/rafaelgcs',
    image: '/static/images/logo/instagram.svg'
  },
  {
    title: 'Github (@rafaelgcs)',
    url: 'https://github.com/rafaelgcs',
    image: '/static/images/logo/github.svg'
  },
  {
    title: 'LinkedIn (@rafaelgcs)',
    url: 'https://linkedin.com/in/rafaelgcs',
    image: '/static/images/logo/linkedin.svg'
  },
  {
    title: 'Whatsapp Contact',
    url: 'https://api.whatsapp.com/send?phone=557197065007&text=Ol%C3%A1,%20Rafael!%20Vim%20falar%20contigo%20atrav%C3%A9s%20do%20seu%20site!',
    image: '/static/images/logo/whatsapp.svg'
  }
];

const technologiesList = [
  '#ReactJS',
  '#React_Native',
  '#Flutter',
  '#Angular',
  '#Lumen_Laravel_(PHP)',
  '#Asp.net_MVC',
  '#.net core',
  '#NodeJS'
];

function LanguagesOverview() {
  const theme = useTheme();

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader title="Technologies" />

      <Divider />
      <ListWrapper disablePadding>
        {technologiesList.map((t) => {
          return (
            <React.Fragment key={`${t}_technologies-List`}>
              <ListItem
                sx={{
                  color: `${theme.colors.primary.main}`,
                  '&:hover': { color: `${theme.colors.primary.dark}` }
                }}
                button
              >
                <ListItemText primary={t} />
              </ListItem>
              <Divider />
            </React.Fragment>
          );
        })}
        <ListSubheader>
          <Typography sx={{ py: 1.5 }} variant="h4" color="text.primary">
            Social
          </Typography>
        </ListSubheader>
        {socialList.map((s) => {
          return (
            <React.Fragment key={`${s.title}__social-List`}>
              <Divider />
              <ListItem
                button
                onClick={() => {
                  window.open(s.url, '_blank');
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ width: 38, height: 38 }} src={s.image} />
                </ListItemAvatar>
                <ListItemText
                  primaryTypographyProps={{
                    variant: 'h5',
                    color: `${theme.colors.alpha.black[100]}`
                  }}
                  primary={s.title}
                />
              </ListItem>
            </React.Fragment>
          );
        })}
      </ListWrapper>
    </Card>
  );
}

export default LanguagesOverview;
