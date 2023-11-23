import {
  Typography,
  Box,
  Card,
  Container,
  Button,
  styled,
  CardHeader,
  CardContent,
  Divider,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  SvgIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Toolbar,
  Fab,
  Tooltip,
  TooltipProps,
  tooltipClasses
} from '@mui/material';
import { ReactElement, useEffect } from 'react';
import { useState } from 'react';
import BaseLayout from 'src/layouts/BaseLayout';

import Link from 'src/components/Link';
import Head from 'next/head';

import HeaderComponent from '@/content/LandingPage/components/Header';
import ObservationsCard from '@/content/LandingPage/ObservationsCard';
import Footer from '@/components/Footer';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import { getHomeContent } from '@/repositories/home';
import PricingContent from '@/content/LandingPage/PricingContent';
import TestimonialsContent from '@/content/LandingPage/TestimonialsContent';
import BackToTopButton from '@/components/ActionButtons/BackToTopButton';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ResultsContent from '@/content/LandingPage/ResultsContent';

const TooltipWrapper = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.colors.alpha.trueWhite[100],
    color: theme.palette.getContrastText(theme.colors.alpha.trueWhite[100]),
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 'bold',
    borderRadius: theme.general.borderRadiusSm,
    boxShadow:
      '0 .2rem .8rem rgba(7,9,25,.18), 0 .08rem .15rem rgba(7,9,25,.15)'
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.colors.alpha.trueWhite[100]
  }
}));

const OverviewWrapper = styled(Box)(
  ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
`
);

const mainFeaturedPost = {
  title: 'Desenvolvi técnicas de alta performance que transformaram minha forma de trabalho e consequentemente minha vida.',
  description:
    "Que tal deixar eu te ajudar a repensar tua jornada?",
  image: '/static/images/2.jpeg',
  imageText: 'About me',
  linkText: 'Fazer Parte',
};

function Overview() {
  const [testimonials, setTestimonials] = useState([]);
  const [results, setResults] = useState([]);
  const [products, setProducts] = useState([]);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const _getHomeContent = async () => {
      const resp = await getHomeContent();

      if (resp.success) {
        setProducts(resp.data.products)
        setTestimonials(resp.data.testimonials)
        setResults(resp.data.results)
        setFaqs(resp.data.faqs)
      }
    }

    _getHomeContent()
  }, [])
  return (
    <OverviewWrapper>
      <Head>
        <title>Família TC - Consultaoria Fitness</title>
      </Head>
      <Toolbar id="back-to-top-anchor" />
      <Container sx={{ mt: 0 }} maxWidth="lg">
        <Grid container spacing={0}>
          <Grid container spacing={0} minHeight={'70vh'}>
            <Grid item xs={12} md={6} display="flex" justifyContent="center" alignItems="center">
              <div>
                <Grid item xs display="flex" justifyContent="center" alignItems="center">
                  <img style={{ marginBottom: 10, marginTop: 20 }} src="/static/images/logo/logo_tiago_carvalho.png" height={30} />
                </Grid>
                <div style={{ fontSize: 50, lineHeight: 1 }}>
                  CONSULTORIA
                </div>
                <div style={{ fontSize: 80, lineHeight: 1 }}>
                  FITNESS.
                </div>
              </div>
            </Grid>

            <Grid item xs={12} md={6} display="flex" justifyContent="center" alignItems="center">
              <HeaderComponent post={mainFeaturedPost} />
            </Grid>
          </Grid>
        </Grid>
        <Grid>
          <Paper sx={{
            position: 'relative',
            color: '#fff',
            mb: 4,
            borderRadius: 2,
            padding: 5
          }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h3">
                  Antes de você escolher um dos planos de treino eu preciso te explicar algumas coisas.
                </Typography>
                <Divider style={{ marginTop: 10, marginBottom: 10 }} />
                <Typography variant="h4">
                  Primeiramente, quero te dar parabéns por ter chegado até aqui, isso mostra que você está a fim de melhorar a sua saúde e eu, na qualidade de profissional de Educação Física, fico feliz em saber que você acredita que eu possa te ajudar nessa jornada. Quando você se afilia ao meu treino, você não está adquirindo uma consultoria, você investe em ECONOMIA DE TEMPO!
                </Typography>
                <Typography variant="h3" alignContent={'center'} textAlign={"center"} sx={{mt: 2}}>
                  MAS, VOCÊ JÁ SABE COMO SERÁ ESTA CONSULTORIA? SE AINDA NÃO SABE...
                </Typography>
                {/* 'xs' | 'sm' | 'md' | 'lg' | 'xl' */}
                <Container maxWidth="md" style={{ marginTop: 10 }}>
                  <Typography variant="h4">
                    Com meu trabalho você não vai encontrar um "personal online". O que eu ofereço é um planejamento de treinamento baseado na ciência, com o intuito de te manter saudável, com um corpo bacana e com um programa eficaz, capaz de você economizar o seu tempo, coisa que poucos tem sobrando.
                  </Typography>
                  <Typography variant="h4">
                    Então, baseado em um questionário que você deverá preencher no momento da compra do plano, informando dados corporais, disponibilidade, rotina, dieta e limitações, eu vou montar o melhor planejamento de treinamento possível para que você possa alcançar o seu objetivo. Isso significa que eu possa sugerir mudanças na sua rotina para poder maximizar o seu resultado.
                  </Typography>
                </Container>
              </Grid>

              <Divider flexItem orientation='vertical' />

              <Grid item xs={12} md={5} height="100%" justifyContent="center" textAlign="center" alignItems="center">

                {/* <div> */}
                <img style={{ marginBottom: 10, marginTop: 20, borderRadius: 15, opacity: 0.8 }} src="/static/images/1.jpeg" width={'100%'} height={'auto'} />
                {/* </div> */}
              </Grid>

            </Grid>
          </Paper>
          <section style={{ marginBottom: 50 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography sx={{ mt: 4, mb: 2 }} variant="h3" component="div">
                  BENEFÍCIOS
                </Typography>
                {/* <Demo> */}
                <List dense>
                  <Card style={{ marginBottom: 15, padding: 5 }}>
                    <ListItem>
                      <ListItemIcon>
                        <SvgIcon style={{ fontSize: 40, color: '#00acc1' }}>
                          <svg>
                            <path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z"></path>
                          </svg>
                        </SvgIcon>
                      </ListItemIcon>
                      <ListItemText
                        primary="Treino Inteligente"
                        secondary={'Cada parte do seu treino é resultado de rigorosos estudos científicos. É assim que você garante a certeza de fazer o melhor treino possível no conforto de sua casa ou em uma academia.'}
                      />
                    </ListItem>
                  </Card>
                  <Card style={{ marginBottom: 15, padding: 5 }}>

                    <ListItem>
                      <ListItemIcon>
                        <SvgIcon style={{ fontSize: 40, color: 'green' }}>
                          <svg>
                            <path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h4v1h-7v2h6c1.66 0 3-1.34 3-3V10c0-4.97-4.03-9-9-9z"></path>
                          </svg>
                        </SvgIcon>
                      </ListItemIcon>
                      <ListItemText
                        primary="Suporte Exclusivo"
                        secondary={'Estarei lado a lado contigo durante todo processo. Você terá acesso direto ao meu Whatsapp pessoal para resolver qualquer dificuldade.'}
                      />
                    </ListItem>
                  </Card>
                  <Card style={{ marginBottom: 15, padding: 5 }}>
                    <ListItem>
                      <ListItemIcon>
                        <SvgIcon style={{ fontSize: 40, color: '#ff9800' }}>
                          <svg>
                            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"></path>
                          </svg>
                        </SvgIcon>
                      </ListItemIcon>
                      <ListItemText
                        primary="Conteúdo Prêmio"
                        secondary={'E mais, você receberá materiais exclusivos que vão te levar aos resultados que você deseja muito mais rápido. Tudo isso dentro do nosso portal premium.'}
                      />
                    </ListItem>
                  </Card>
                </List>
                {/* </Demo> */}
              </Grid>
              <Grid item xs={12} md={6}>
                <ObservationsCard />
              </Grid>
              <Grid item xs={12} alignContent='center' alignItems='center' justifyContent="center" >
                <Container maxWidth="md">
                  <Typography variant="h3">
                    Pra finalizar, te digo sem nenhum receio... se você fizer como combinado, permitindo que a ciência supere o senso comum, eu garanto os nossos resultados!
                  </Typography>
                  <Typography variant="h3" textAlign={"center"} style={{ marginTop: 10 }} >
                    Vamos nessa?
                  </Typography>
                  <div style={{ textAlign: 'center', marginTop: 10 }}>
                    <Link href="#products" style={{ textDecoration: 'none' }}>
                      <Button size="large" color='primary' variant="contained" endIcon={<ArrowForwardTwoToneIcon />}>
                        {'Quero Fazer Parte'}
                      </Button>
                    </Link>
                  </div>
                </Container>
              </Grid>
            </Grid>
          </section>
        </Grid>
      </Container >
      <Toolbar id="testimonials" />
      <TestimonialsContent items={testimonials} />
      <Toolbar id="results" />
      <ResultsContent items={results} />
      <Toolbar id="products" />
      <PricingContent items={products} />
      {
        faqs.length > 0 && (
          <Container maxWidth="lg" sx={{ p: 2, mt: 10 }}>
            <Toolbar id="products" />
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="stretch"
              spacing={3}
            >
              <Grid item xs={12}>
                <Card>
                  <CardHeader title="FAQ - Perguntas Frequentes" />
                  <Divider />
                  <CardContent>
                    {
                      faqs.map((faq) => {

                        return (
                          <Accordion key={faq.id}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls={`faq_question-controls__${faq.id}`}
                              id={`faq_question__${faq.id}`}
                            >
                              <Typography>{faq.question}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography>
                                {faq.answer}
                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                        )
                      })
                    }
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        )
      }
      <Footer />
      <Box sx={{ position: 'fixed', bottom: 16, right: 16 }}>

        <Link href="https://api.whatsapp.com/send?phone=5571992483233" target='_blank'>
          <TooltipWrapper
            title="Fale Comigo!"
            arrow
            placement='left'
          >
            <Fab size="large" color="success">
              <WhatsAppIcon />
            </Fab>
          </TooltipWrapper>
        </Link>
      </Box>
      <BackToTopButton secondActionButton>
        <Fab size="large" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </BackToTopButton>
    </OverviewWrapper>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
