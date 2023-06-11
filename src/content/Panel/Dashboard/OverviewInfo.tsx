import {
  Button,
  Card,
  Box,
  Grid,
  Typography,
  Divider
} from '@mui/material';


function OverviewInfo() {

  return (
    <Card>
      <Grid spacing={0} container>
        <Grid item xs={12} md={6}>
          <Box py={4} pr={4} flex={1}>
            <Box p={4}>
              <Typography
                sx={{
                  pb: 3
                }}
                variant="h4"
              >
                Produtos
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h1" gutterBottom>
                  3 ativos
                </Typography>
                <Typography
                  variant="h4"
                  fontWeight="normal"
                  color="text.secondary"
                >
                  total: 10
                </Typography>
              </Box>
              <Grid container spacing={3}>
                <Grid sm item>
                  <Button fullWidth variant="outlined">
                    Lista
                  </Button>
                </Grid>
                <Grid sm item>
                  <Button fullWidth variant="contained">
                    Adicionar Novo
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid
          sx={{
            position: 'relative'
          }}
          display="flex"
          alignItems="center"
          item
          xs={12}
          md={6}
        >
          <Box
            component="span"
            sx={{
              display: { xs: 'none', md: 'inline-block' }
            }}
          >
            <Divider absolute orientation="vertical" />
          </Box>
          <Box py={4} pr={4} flex={1}>
            <Box p={4}>
              <Typography
                sx={{
                  pb: 3
                }}
                variant="h4"
              >
                FAQ
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h1" gutterBottom>
                  3 ativos
                </Typography>
                <Typography
                  variant="h4"
                  fontWeight="normal"
                  color="text.secondary"
                >
                  total: 10
                </Typography>
              </Box>
              <Grid container spacing={3}>
                <Grid sm item>
                  <Button fullWidth variant="outlined">
                    Lista
                  </Button>
                </Grid>
                <Grid sm item>
                  <Button fullWidth variant="contained">
                    Adicionar Novo
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid
          alignItems="center"
          item
          xs={12}
          md={12}
        >
          <Divider />

        </Grid>
        <Grid
          sx={{
            position: 'relative'
          }}
          display="flex"
          alignItems="center"
          item
          xs={12}
          md={12}
        >
          <Box py={4} pr={4} flex={1}>
            <Box p={4}>
              <Typography
                sx={{
                  pb: 3
                }}
                variant="h4"
              >
                Depoimentos
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h1" gutterBottom>
                  3 ativos
                </Typography>
                <Typography
                  variant="h4"
                  fontWeight="normal"
                  color="text.secondary"
                >
                  total: 10
                </Typography>
              </Box>
              <Grid container spacing={3}>
                <Grid sm item>
                  <Button fullWidth variant="outlined">
                    Lista
                  </Button>
                </Grid>
                <Grid sm item>
                  <Button fullWidth variant="contained">
                    Adicionar Novo
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

export default OverviewInfo;
