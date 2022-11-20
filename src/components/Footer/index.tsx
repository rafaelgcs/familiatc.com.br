import { Box, Container, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const FooterWrapper = styled(Box)(
  ({ theme }) => `
        border-radius: 0;
        margin: ${theme.spacing(3)} 0;
`
);

function Footer() {
  return (
    <FooterWrapper>
      <Container maxWidth="lg">
        <Box
          py={3}
          display={{ xs: 'block', md: 'flex' }}
          alignItems="center"
          textAlign={{ xs: 'center', md: 'left' }}
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="subtitle1">
              &copy; 2022 - Tiago Carvalho
            </Typography>
          </Box>
          <Typography sx={{ pt: { xs: 2, md: 0 } }} variant="subtitle1">
            Created by <Link href="https://rafaelgcs.com" target="_blank" rel="noopener noreferrer">Rafael GCS</Link> Using <Link href="https://material-ui.com/store/items/tokyo-react-admin-dashboard/" target="_blank" rel="noopener noreferrer">Tokyo Free Black</Link>
          </Typography>
        </Box>
      </Container>
    </FooterWrapper>
  );
}

export default Footer;
