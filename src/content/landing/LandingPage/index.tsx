import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Grid,
  Container,
  Typography,
  Avatar,
  SwipeableDrawer,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListSubheader,
  ListItemIcon,
  ListItemText,
  Box,
  useTheme,
  Paper,
  Card,
  SvgIcon,
  Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import ProfileCover from './ProfileCover';
import Footer from '../../../components/Footer';
import LanguagesOverview from './LanguagesOverview';
import HeaderComponent from './components/Header';
import ObservationsCard from './ObservationsCard';

import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';

const urlsList = [
  {
    title: 'Home Page',
    url: '/',
    initials: 'HP'
  },
  {
    title: 'About',
    url: '/about',
    initials: '?'
  },
  {
    title: 'Portfolio',
    url: '/portfolio',
    initials: 'P'
  },
  {
    title: 'My CV',
    url: '/cv',
    initials: 'CV'
  },
  {
    title: 'All Contact',
    url: '/contact',
    initials: 'AC'
  }
];

const urlsCustomersList = [
  {
    title: 'Customer Area',
    url: '/ca',
    initials: 'CA'
  },
  {
    title: "Rafael's Panel",
    url: '/panel',
    initials: 'RP'
  }
];

const BackgroundPaper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const BackgroundDefault = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderRadius: 5,
  marginBottom: 10
}));


function LandingPage() {
  const user = {
    savedCards: 7,
    name: 'Rafael Guimarães',
    email: 'contato@rafaelgcs.com',
    coverImg: '/static/images/placeholders/covers/3.jpg',
    avatar: '/static/images/avatars/default.jpg',
    subtitle: '@rafaelgcs',
    description:
      'Currently studying BI in Science and Technology at UFBA (Federal University of Bahia) being Software Developer (Computer Technician) at SENAI Cimatec and Web Designer at SAGA. \nExperienced Software Developer adept in all stages of advanced web development with focous in front-end. Knowledgeable in user interface, testing, and debugging processes. Bringing forth expertise in design, installation, testing and maintenance of systems. Equipped with a diverse and promising skill-set. Proficient in an assortment of technologies, including JavaScript, ASP.NET, C#, React JS, React Native, Flutter, and others. Able to effectively self-manage during independent projects, as well as collaborate in a team setting.',
    jobtitle: 'Software Developer',
    location: 'Salvador, BA'
  };
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const mainFeaturedPost = {
    title: 'Desenvolvi técnicas de alta performance que transformaram minha forma de trabalho e consequentemente minha vida.',
    description:
      "Que tal deixar eu te ajudar a repensar tua jornada?",
    image: 'https://source.unsplash.com/random',
    imageText: 'About me',
    linkText: 'Fazer Parte',
  };

  return (
    <>
      <Helmet>
        <title>Família TC - Consultaoria Fitness</title>
      </Helmet>
      <Container sx={{ mt: 0 }} maxWidth="lg">
        <Grid container spacing={0}>
          <Grid container spacing={0} minHeight={'70vh'}>
            <Grid xs={12} md={6} display="flex" justifyContent="center" alignItems="center">
              <div>
                <Grid xs display="flex" justifyContent="center" alignItems="center">
                  <img style={{ marginBottom: 10, marginTop: 20 }} src="/static/images/logo/logo_tiago_carvalho.png" height={30} />
                </Grid>
                <div style={{ fontSize: 50, lineHeight: 1 }}>
                  CONSULTORIA
                </div>
                <div style={{ fontSize: 80, lineHeight: 1 }}>
                  FITNESS.
                </div>
                {/* <div>
                  Desenvolvi técnicas de alta performance que transformaram minha forma de trabalho e consequentemente minha vida.
                </div> */}
              </div>
            </Grid>

            <Grid xs={12} md={6} display="flex" justifyContent="center" alignItems="center">
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
                {/* <hr style={{ marginTop: 10, marginBottom: 10 }} /> */}
                <Typography variant="h4">
                  Primeiramente, quero te dar parabéns por ter chegado até aqui, isso mostra que você está a fim de melhorar a sua saúde e eu, na qualidade de profissional de Educação Física, fico feliz em saber que você acredita que eu possa te ajudar nessa jornada. Quando você se afilia ao meu treino, você não está adquirindo uma consultoria, você investe em ECONOMIA DE TEMPO!
                </Typography>
              </Grid>
              {/* <Grid xs={1}> */}
              <Divider flexItem orientation='vertical' />
              {/* </Grid> */}
              <Grid item xs={12} md={5} height="100%" justifyContent="center" textAlign="center" alignItems="center">
                {/* <div>
                  <div style={{ lineHeight: 1 }}>
                    HOJE, SOMOS EM:
                  </div>
                  <div style={{ fontSize: 80 }}>
                    <b>
                      300+
                    </b>
                  </div>
                </div>
                <Divider flexItem orientation='vertical' /> */}
                <div>
                  <img style={{ marginBottom: 10, marginTop: 20 }} src="/static/images/logo/tiago_carvalho.png" height={30} />
                </div>
              </Grid>
              <Divider style={{ marginTop: 10, marginBottom: 10 }} />
              <Grid item xs={12}>
                <Typography variant="h3" alignContent={'center'} textAlign={"center"}>
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
                    <Link to="#products" style={{ textDecoration: 'none' }}>
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
      <BackgroundPaper>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            AQUI VEM OS DEPOIMENTOS

          </Grid>
          <Grid item xs={12} md={6}>
            AQUI VEM NÚMEROS

          </Grid>
        </Grid>
      </BackgroundPaper>
      <Footer />
    </>
  );
}

export default LandingPage;
