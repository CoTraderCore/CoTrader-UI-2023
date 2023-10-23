import React from 'react'
import Navbar from '../Components/common/Navbar'
import Sidebar from '../Components/common/Sidebar'
import { Alert, AlertIcon, Box, Grid, GridItem, useColorMode, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import WalletInfo from '../Components/common/WalletInfo';
import { NeworkID } from '../config';
import DashboardHeader from '../Components/common/DashboardHeader';
import { Observer, inject } from 'mobx-react';

function MainLayout(props) {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode(false)
    const Boxbg = useColorModeValue("#F3F6FD", "#110938");
    return (
        <Box
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                position: "relative"
            }}
        >
            <Navbar toggleColorMode={toggleColorMode} colorMode={colorMode} web3={props.web3} />
            <Grid style={{ display: 'flex', flexWrap: "nowrap", overflow: "auto", height: "90vh", }} >
                <GridItem >
                    <Sidebar isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
                </GridItem>
                <Observer>
                    {() => {
                        return (
                            <GridItem className='example' bg={Boxbg} style={{ flexGrow: 1, overflow: "auto", }}>
                                <Grid mt={5} px={2}>
                                    <DashboardHeader />
                                </Grid>
                                <WalletInfo web3={props.web3} accounts={props.accounts} />
                                {
                                    NeworkID !== props.network && props.isLoadNetID && props.web3 ?
                                        (
                                            <Alert status='error' fontWeight={'500'}>
                                                <AlertIcon />
                                                Wrong network ID
                                            </Alert>
                                        ) :
                                        (
                                            null
                                        )
                                }
                                <Outlet />
                            </GridItem>
                        )
                    }}
                </Observer>
            </Grid>
        </Box>
    )
}

// export default MainLayout
export default inject('MobXStorage')(MainLayout);
