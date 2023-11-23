import { useState } from 'react';
import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container, LinearProgress } from '@mui/material';
import NewResultDialog from '@/content/Panel/Results/NewResultDialog';
import PageHeader from '@/content/Panel/Results/PageHeader';
import ContentView from '@/content/Panel/Results/ContentView';

const ResultsListview = () => {
    const [openNewResultDialog, setOpenNewResultDialog] = useState<boolean>(false)
    const [searchingResults, setSearchingResults] = useState<boolean>(false)

    return (
        <>
            <Head>
                <title>Resultados - Painel - Familia TC</title>
            </Head>
            <PageTitleWrapper>
                <PageHeader
                    createNewResult={() => {
                        setOpenNewResultDialog(true)
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
                        searchingResults ?
                            <><Grid item xs={12} md={12}><LinearProgress /></Grid></> :
                            <Grid item xs={12}>
                                <ContentView />
                            </Grid>
                    }
                </Grid>
            </Container>
            <NewResultDialog
                open={openNewResultDialog}
                onClose={() => {
                    setOpenNewResultDialog(false)
                }}
                onInitSubmit={() => {
                    setSearchingResults(true)

                }}
                onSuccess={() => {
                    setSearchingResults(false)
                }}
                onError={() => {
                    setSearchingResults(false)
                }}
            />
        </>
    );
}

ResultsListview.getLayout = (page) => (
    <SidebarLayout privated redirect='/panel/login'>{page}</SidebarLayout>
);

export default ResultsListview;
