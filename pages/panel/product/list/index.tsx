import { useState } from 'react';
import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container, LinearProgress } from '@mui/material';
import PageHeader from '@/content/Panel/Products/PageHeader';
import ContentView from '@/content/Panel/Products/ContentView';
import NewProductDialog from '@/content/Panel/Products/NewProductDialog';

const ProductListView = () => {
    const [openNewProductDialog, setOpenNewProductDialog] = useState<boolean>(false)
    const [searchingProducts, setSearchingProducts] = useState<boolean>(false)

    return (
        <>
            <Head>
                <title>Produtos - Painel - Familia TC</title>
            </Head>
            <PageTitleWrapper>
                <PageHeader
                    createNewProduct={() => {
                        setOpenNewProductDialog(true)
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
                        searchingProducts ?
                            <><Grid item xs={12} md={12}><LinearProgress /></Grid></> :
                            <Grid item xs={12}>
                                <ContentView />
                            </Grid>
                    }
                </Grid>
            </Container >
            <NewProductDialog
                open={openNewProductDialog}
                onClose={() => {
                    setOpenNewProductDialog(false)
                }}
                onInitSubmit={() => {
                    setSearchingProducts(true)

                }}
                onSuccess={() => {
                    setSearchingProducts(false)
                }}
                onError={() => {
                    setSearchingProducts(false)
                }}
            />
        </>
    );
}

ProductListView.getLayout = (page) => (
    <SidebarLayout privated redirect='/panel/login'>{page}</SidebarLayout>
);

export default ProductListView;
