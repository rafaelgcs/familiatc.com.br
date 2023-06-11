import { Box, Container, Link, Typography, Grid } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

const footers = [
  {
    title: 'Planos',
    description: [
      { label: "TC Mensal", link: "#" },
      { label: "TC Trimestral", link: "#" },
      { label: "TC Semestral", link: "#" }
    ],
  },
  {
    title: 'Links Úteis',
    description: [
      { label: 'Cadastre-se', link: 'https://www.mfitpersonal.com.br/index?share=MjE1MjIvMC85LzA=' },
      { label: 'Fale Comigo no Whatsapp', link: 'https://api.whatsapp.com/send?phone=5571992483233' },
      { label: 'Marque uma avaliação', link: 'https://api.whatsapp.com/send?phone=5571992483233' }
    ],
  },
  {
    title: 'Contato',
    description: [
      { label: <Box display="flex"><EmailIcon sx={{ pr: 1 }} /> {"contato@familiatc.com.br"}</Box>, link: 'mailto:contato@familiatc.com.br' },
      { label: <Box display="flex"><InstagramIcon sx={{ pr: 1 }} /> {"Instagram"}</Box>, link: 'https://instagram.com/pt.tiagocarvalho' },
      { label: <Box display="flex"><FacebookIcon sx={{ pr: 1 }} /> {"Facebook"}</Box>, link: 'https://facebook.com/tiago.carvalho.587606' },
      { label: <Box display="flex"><LocalPhoneIcon sx={{ pr: 1 }} /> {"71 9 9248-3233"}</Box>, link: 'tel:71992483233' },
    ],
  }
];
function Footer() {
  return (
    <>
      {/* Footer */}
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Grid container spacing={4} justifyContent="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item.label} style={{ textDecoration: 'none', listStyle: 'none' }}>
                    <Link href={item.link != null ? item.link : "#"} variant="subtitle1" color="text.secondary">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
      {/* End footer */}
      <Container>
        <Box
          pb={4}
          display={{ xs: 'block', md: 'flex' }}
          alignItems="center"
          textAlign={{ xs: 'center', md: 'left' }}
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="subtitle1">
              {'© '}{new Date().getFullYear()} - <Link
                href="/"
                rel="noopener noreferrer"
              >
                Família TC
              </Link>
            </Typography>
          </Box>
          <Typography
            sx={{
              pt: { xs: 2, md: 0 }
            }}
            variant="subtitle1"
          >
            {'Feito com'} <FavoriteIcon sx={{ fontSize: 'inherit' }} /> {' por '}
            <Link
              href="https://rafaelgcs.com.br"
              target="_blank"
              rel="noopener noreferrer"
            >
              Rafael GCS
            </Link>
          </Typography>
        </Box>
      </Container>
    </>
  );
}

export default Footer;
