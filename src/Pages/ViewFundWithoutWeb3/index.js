import React, { useEffect } from 'react'
import { Box, Text, Grid, GridItem, Stack, Icon, useColorModeValue, SimpleGrid, } from '@chakra-ui/react';
import DashboardHeader from '../../Components/common/DashboardHeader'
import FilterSearch from '../../Components/Filter&Search/FilterSearch';
import CreateFundButton from '../../Components/template/CreateFundButton';
import ShadowBox from '../../Components/Cards/ShadowBox';
import IconBox from '../../Components/Icons/IconBox';
import CardBox from '../../Components/Cards/CardBox';
import HorizontalTabs from '../../Components/Tabs/HorizontalTabs';
import { dashbordTabs } from '../../utils/sample';
import SortFunds from '../../Components/navigation/SortFunds';
import { MdOutlineBarChart } from 'react-icons/md'
import { FcComboChart } from 'react-icons/fc'
import { RiFundsBoxLine } from 'react-icons/ri'
import getFundsList from '../../utils/getFundsList';
import { useObserver } from 'mobx-react';
import MobXStorage from '../../MobXStorage';
import Loading from '../../Components/template/spiners/Loading';
import Footer from '../../Components/common/footer/Footer';


function AllFundWithoutWeb3({ isDataLoad, web3, setIsDataLoad }) {

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            if (MobXStorage?.SmartFundsOriginal.length === 0) {
                try {
                    const smartFunds = await getFundsList();
                    MobXStorage?.initSFList(smartFunds);
                } catch (error) {
                    console.error('Error fetching smart funds:', error);
                }
            }
            if (isMounted) {
                setIsDataLoad(true);
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    });

    useEffect(() => {
        if (web3) {
            window.location = "/";
        }
    }, [web3]);

    const brandColor = useColorModeValue("#422AFB", "##CBC3E3");
    const boxBg = useColorModeValue("#F4F7FE", "#110938");
    const allbtnBg = useColorModeValue("#30106b", "#7500FF")


    return useObserver(() => (
        <React.Fragment>
            {
                isDataLoad ?
                    (
                        <Box className='dashboard' style={{ padding: "10px", }}>
                            <DashboardHeader />
                            <CardBox p="10px" my="10px">
                                <Grid gap={4} templateColumns={['1fr', 'repeat(3, 1fr)']} sx={{ padding: "10px 0px ", borderRadius: "5px", display: "flex", justifyContent: "space-around", flexDirection: { base: "column", sm: "column", md: "row" }, textAlign: { base: "center", sm: "center" } }}>
                                    <GridItem >
                                        <CreateFundButton buttonName={"Create Funds"} info={"Connect to web3"} />
                                    </GridItem>
                                    <GridItem >
                                        <FilterSearch />
                                    </GridItem>
                                    <GridItem >
                                        <Stack bg={allbtnBg} sx={{ color: "#fff", borderRadius: "8px", border: "none", _hover: { backgroundColor: "#30108b" } }}>
                                            <SortFunds />
                                        </Stack>
                                    </GridItem>
                                </Grid>
                            </CardBox>
                            <Box>

                                {
                                    !MobXStorage.FilterActive ?
                                        (
                                            <SimpleGrid
                                                width="100%"
                                                columns={{ base: 1, md: 4, lg: 4, }}
                                                gap='20px'
                                                mb='20px'>

                                                <ShadowBox
                                                    startContent={
                                                        <IconBox
                                                            w='56px'
                                                            h='56px'
                                                            bg={boxBg}
                                                            icon={
                                                                <Icon w='32px' h='32px' as={RiFundsBoxLine} color={brandColor} />
                                                            }
                                                        />
                                                    }
                                                    name='Total Funds'
                                                    value={MobXStorage.SmartFundsOriginal.length}
                                                />
                                                <ShadowBox
                                                    startContent={
                                                        <IconBox
                                                            w='56px'
                                                            h='56px'
                                                            bg={boxBg}
                                                            icon={
                                                                <Icon w='32px' h='32px' as={FcComboChart} color={brandColor} />
                                                            }
                                                        />
                                                    }
                                                    name='Total value'
                                                    value={`$ ${MobXStorage.TotalValue}`}
                                                />
                                                <ShadowBox
                                                    startContent={
                                                        <IconBox
                                                            w='56px'
                                                            h='56px'
                                                            bg={boxBg}
                                                            icon={
                                                                <Icon w='32px' h='32px' as={MdOutlineBarChart} color={brandColor} />
                                                            }
                                                        />
                                                    }
                                                    name='Total profit'
                                                    value={`$ ${MobXStorage.TotalProfit}`}
                                                />
                                                <ShadowBox
                                                    startContent={
                                                        <IconBox
                                                            w='56px'
                                                            h='56px'
                                                            bg={boxBg}
                                                            icon={<Icon w='28px' h='28px' as={MdOutlineBarChart} color={brandColor} />}
                                                        />
                                                    }
                                                    name='History total profit'
                                                    value={`$ ${MobXStorage.HistoryTotalProfit}`}
                                                />
                                            </SimpleGrid>
                                        ) :
                                        (
                                            <SimpleGrid
                                                width="100%"
                                                columns={{ base: 1, md: 4, lg: 4, }}
                                                gap='20px'
                                                mb='20px'>
                                                <ShadowBox
                                                    startContent={
                                                        <IconBox
                                                            w='56px'
                                                            h='56px'
                                                            bg={boxBg}
                                                            icon={
                                                                <Icon w='32px' h='32px' as={RiFundsBoxLine} color={brandColor} />
                                                            }
                                                        />
                                                    }
                                                    name='Fund'
                                                    value={`${MobXStorage.SmartFunds.length} of ${MobXStorage.SmartFundsOriginal.length} funds`}
                                                />
                                                <Text style={{ color: "green" }}>{MobXStorage.FilterInfo}</Text>
                                                <ShadowBox
                                                    startContent={
                                                        <IconBox
                                                            w='56px'
                                                            h='56px'
                                                            bg={boxBg}
                                                            icon={
                                                                <Icon w='32px' h='32px' as={FcComboChart} color={brandColor} />
                                                            }
                                                        />
                                                    }
                                                    name='Total value'
                                                    value={`$ ${MobXStorage.userTotalValue}`}
                                                />
                                                <ShadowBox
                                                    startContent={
                                                        <IconBox
                                                            w='56px'
                                                            h='56px'
                                                            bg={boxBg}
                                                            icon={
                                                                <Icon w='32px' h='32px' as={MdOutlineBarChart} color={brandColor} />
                                                            }
                                                        />
                                                    }
                                                    name='Total profit'
                                                    value={`$ ${MobXStorage.TotalProfit}`}
                                                />

                                                <ShadowBox
                                                    startContent={
                                                        <IconBox
                                                            w='56px'
                                                            h='56px'
                                                            bg={boxBg}
                                                            icon={<Icon w='28px' h='28px' as={MdOutlineBarChart} color={brandColor} />}
                                                        />
                                                    }
                                                    name='History total profit'
                                                    value={`$ ${MobXStorage.HistoryTotalProfit}`}
                                                />
                                            </SimpleGrid>
                                        )
                                }

                            </Box>

                            <SimpleGrid>
                                <HorizontalTabs data={dashbordTabs} />
                            </SimpleGrid>
                        </Box>
                    ) :
                    (
                        <Loading />
                    )
            }
            <Footer />
        </React.Fragment>
    ));

}

export default AllFundWithoutWeb3;


