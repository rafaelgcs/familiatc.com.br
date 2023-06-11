import Head from 'next/head';

import SidebarLayout from '@/layouts/SidebarLayout';

import PageTitleWrapper from '@/components/PageTitleWrapper';
import PageHeader from '@/content/Panel/Dashboard/PageHeader';
import { Container, Grid } from '@mui/material';
import OverviewInfo from '@/content/Panel/Dashboard/OverviewInfo';

function DashboardView() {
    return (
        <>
            <Head>
                <title>Painel - Família TC</title>
            </Head>
            <PageTitleWrapper>
                <PageHeader />
            </PageTitleWrapper>
            <Container maxWidth="lg">
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={4}
                >
                    <Grid item xs={12}>
                        <OverviewInfo />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

DashboardView.getLayout = (page) => <SidebarLayout privated redirect='/panel/login'>{page}</SidebarLayout>;

export default DashboardView;
