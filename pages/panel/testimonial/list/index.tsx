import { useState } from 'react';
import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container, LinearProgress } from '@mui/material';
import PageHeader from '@/content/Panel/Testimonials/PageHeader';
import ContentView from '@/content/Panel/Testimonials/ContentView';
import NewTestimonialDialog from '@/content/Panel/Testimonials/NewTestimonialDialog';

const TestimonialListview = () => {
    const [openNewTestimonialDialog, setOpenNewTestimonialDialog] = useState<boolean>(false)
    const [searchingTestimonials, setSearchingTestimonials] = useState<boolean>(false)

    return (
        <>
            <Head>
                <title>Depoimentos - Painel - Familia TC</title>
            </Head>
            <PageTitleWrapper>
                <PageHeader
                    createNewTestimonial={() => {
                        setOpenNewTestimonialDialog(true)
                    }}
                />
            </PageTitleWrapper>
            <Container maxWidth="lg">
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={3}
                >
                    {
                        searchingTestimonials ?
                            <><Grid item xs={12} md={12}><LinearProgress /></Grid></> :
                            <Grid item xs={12}>
                                <ContentView />
                            </Grid>
                    }
                </Grid>
            </Container>
            <NewTestimonialDialog
                open={openNewTestimonialDialog}
                onClose={() => {
                    setOpenNewTestimonialDialog(false)
                }}
                onInitSubmit={() => {
                    setSearchingTestimonials(true)

                }}
                onSuccess={() => {
                    setSearchingTestimonials(false)
                }}
                onError={() => {
                    setSearchingTestimonials(false)
                }}
            />
        </>
    );
}

TestimonialListview.getLayout = (page) => (
    <SidebarLayout privated redirect='/panel/login'>{page}</SidebarLayout>
);

export default TestimonialListview;
