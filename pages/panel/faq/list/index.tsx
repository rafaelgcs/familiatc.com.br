import { useState } from 'react';
import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container, LinearProgress } from '@mui/material';
import PageHeader from '@/content/Panel/FAQ/PageHeader';
import ContentView from '@/content/Panel/FAQ/ContentView';
import NewFAQDialog from '@/content/Panel/FAQ/NewFAQDialog';


const FAQListView = () => {
    const [openNewFAQDialog, setOpenNewFAQDialog] = useState<boolean>(false)
    const [searchingFAQs, setSearchingFAQs] = useState<boolean>(false)

    return (
        <>
            <Head>
                <title>Perguntas Frequentes - Painel - Familia TC</title>
            </Head>
            <PageTitleWrapper>
                <PageHeader
                    createNewFAQ={() => {
                        setOpenNewFAQDialog(true)
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
                        searchingFAQs ?
                            <><Grid item xs={12} md={12}><LinearProgress /></Grid></> :
                            <Grid item xs={12}>
                                <ContentView />
                            </Grid>
                    }
                </Grid>
            </Container>
            <NewFAQDialog
                open={openNewFAQDialog}
                onClose={() => {
                    setOpenNewFAQDialog(false)
                }}
                onInitSubmit={() => {
                    setSearchingFAQs(true)
                }}
                onSuccess={() => {
                    setSearchingFAQs(false)
                }}
                onError={() => {
                    setSearchingFAQs(false)
                }}
            />
        </>
    );
}

FAQListView.getLayout = (page) => (
    <SidebarLayout privated redirect='/panel/login'>{page}</SidebarLayout>
);

export default FAQListView;
