import { FC, ReactNode, useContext } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Drawer } from '@mui/material';
import { Outlet } from 'react-router-dom';

// import Sidebar from './Sidebar';
import Header from './Header';
import { SidebarContext } from 'src/contexts/SidebarContext';
import HeaderMenu from './Header/Menu';

interface LandingLayoutProps {
    children?: ReactNode;
}

const MainWrapper = styled(Box)(
    ({ theme }) => `
        flex: 1 1 auto;
        display: flex;
        height: 100%;
`
);

const MainContent = styled(Box)(
    ({ theme }) => `
        margin-top: ${theme.header.height};
        flex: 1 1 auto;
        overflow: auto;
`
);

const LandingLayout: FC<LandingLayoutProps> = () => {
    const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
    return (
        <>
            <MainWrapper>
                <Header />
                <MainContent>
                    <Outlet />
                </MainContent>
            </MainWrapper>
            <Drawer anchor="right" open={sidebarToggle} onClose={() => toggleSidebar()}>
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                >
                    <HeaderMenu isDrawer={true} />
                </Box>
            </Drawer>
        </>
    );
};

export default LandingLayout;
