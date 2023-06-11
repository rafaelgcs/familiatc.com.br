import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { List, ListItem, ListItemText } from '@mui/material';

const CardPricing = (props) => {

  const { item } = props

  return (
    <Grid
      item
      key={item.title}
      xs={12}
      sm={6}
      md={4}
    >
      <Card style={{ height: item.subtitle ? '105%' : '100%', marginTop: item.subtitle ? '-5%' : '0'  }}>
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          alignItems="stretch"
          sx={{
            height: {
              md: '100%'
            }
          }}
        >
          <Grid item>
            <CardHeader
              title={item.title}
              subheader={item.subtitle}
              titleTypographyProps={{ align: 'center' }}
              action={item.title === 'Pro' ? <StarIcon /> : null}
              subheaderTypographyProps={{
                align: 'center',
              }}
              sx={{
                // backgroundColor: (theme) =>
                //   theme.palette.mode === 'light'
                //     ? theme.palette.grey[200]
                //     : theme.palette.grey[700],
              }}
            />
          </Grid>
          <Grid item>
            <CardContent>
              {
                item.promotion ?
                  <>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'baseline',
                        mb: 2,
                        textDecoration: 'line-through'
                      }}
                    >
                      <Typography variant="h6" color="error" sx={{ pr: 1 }}>de {" "}</Typography>
                      <Typography component="h2" variant="h4" color="error">
                        {
                          parseFloat(item?.price).toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })
                        }
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'baseline',
                        mb: 2,
                      }}
                    >
                      <Typography variant="h6" color="text.secondary" sx={{ pr: 1 }}>{"por "}</Typography> {" "}
                      <Typography component="h2" variant="h3" color="text.primary">
                        R${item.promotion_price.replace('.', ',')}
                      </Typography>
                    </Box>
                  </>
                  :
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h2" variant="h3" color="text.primary">
                      R${item.price.replace('.', ',')}
                    </Typography>
                    {/* <Typography variant="h6" color="text.secondary">
              /mes
            </Typography> */}
                  </Box>
              }

              <List>
                {/* <Typography */}
                {/* component="p" */}
                {/* variant="subtitle1" */}
                {/* align="center" */}
                {/* // key={line} */}
                {/* > */}
                {/* {decodeHtml(item.description)} */}
                {/* </Typography> */}
                {item.description.split('\n').map((line) => (
                  <ListItem>
                    <ListItemText
                      sx={{ textAlign: 'center' }}
                      // variant="subtitle1"
                      // align="center"
                      key={line}
                    >
                      {line}

                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Grid>
          <Grid item>
            <CardActions disableSpacing >
              <Button
                fullWidth
                variant={item.subtitle ? 'contained' : 'outlined'}
                href={item.link}
              >
                {item.buttonText}
              </Button>
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  )

}


function PricingContent(props) {
  const { items } = props

  return (
    items.length > 0 && (
      <React.Fragment>
        <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Planos
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" component="p">
            {/* Quickly build an effective pricing table for your potential customers with
            this layout. It&apos;s built with default MUI components with little
            customization. */}
          </Typography>
        </Container>
        {/* End hero unit */}
        <Container maxWidth="md" component="main">
          <Grid container spacing={5} alignItems="stetch">
            {items.map((item) => (
              // Enterprise card is full width at sm breakpoint
              <React.Fragment key={item.id}>
                <CardPricing item={item} />
              </React.Fragment>
            ))}
          </Grid>
        </Container>
      </React.Fragment>
    )
  );
}

export default PricingContent