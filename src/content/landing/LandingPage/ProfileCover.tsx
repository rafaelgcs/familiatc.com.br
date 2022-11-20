import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Card,
  Tooltip,
  Avatar,
  CardMedia,
  Button,
  IconButton
} from '@mui/material';

import { styled } from '@mui/material/styles';

import MenuIcon from '@mui/icons-material/Menu';
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import { Link } from 'react-router-dom';
import { getRandomImage } from 'src/utils/functions';

const AvatarWrapper = styled(Card)(
  ({ theme }) => `

    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);

const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;

    .MuiCardMedia-root {
      height: ${theme.spacing(26)};
    }
`
);

const ProfileCover = ({ user, toggleDrawer }) => {
  return (
    <>
      <Box display="flex" mb={3}>
        <Tooltip arrow placement="top" title="Open Menu">
          <IconButton
            onClick={toggleDrawer}
            color="primary"
            sx={{ p: 2, mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Tooltip>
        <Box>
          <Typography variant="h3" component="h3" gutterBottom>
            Profile for {user.name}
          </Typography>
          <Typography variant="subtitle2">{user.subtitle}</Typography>
        </Box>
      </Box>
      <CardCover>
        <CardMedia image={getRandomImage()} />
      </CardCover>
      <AvatarWrapper>
        <Avatar variant="rounded" alt={user.name} src={user.avatar} />
      </AvatarWrapper>
      <Box py={2} pl={2} mb={3}>
        <Typography gutterBottom variant="h4">
          {user.name}
        </Typography>
        <Typography variant="subtitle2">{user.description}</Typography>
        <Typography sx={{ py: 2 }} variant="subtitle2" color="text.primary">
          {user.jobtitle} | {user.location} |{' '}
          <a href={`mailto:${user.email}`}>{user.email} </a>
        </Typography>
        <Box
          display={{ xs: 'block', md: 'flex' }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Link to="/cv" style={{ textDecoration: 'none' }}>
              <Button size="small" variant="contained">
                My CV
              </Button>
            </Link>
            <Link to="/about" style={{ textDecoration: 'none' }}>
              <Button size="small" sx={{ mx: 1 }} variant="outlined">
                More about me
              </Button>
            </Link>
          </Box>
          <Link to="/portfolio" style={{ textDecoration: 'none' }}>
            <Button
              sx={{ mt: { xs: 2, md: 0 } }}
              size="small"
              variant="text"
              endIcon={<ArrowForwardTwoToneIcon />}
            >
              See my portfolio
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
};

ProfileCover.propTypes = {
  // @ts-ignore
  user: PropTypes.object.isRequired
};

export default ProfileCover;
