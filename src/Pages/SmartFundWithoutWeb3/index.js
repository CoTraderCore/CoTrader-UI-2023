import React, { useEffect } from 'react'
import { Box, Text, Grid, GridItem, Stack, Icon, useColorModeValue, SimpleGrid, } from '@chakra-ui/react';
import FilterSearch from '../../Components/Filter&Search/FilterSearch';
import CreateFundButton from '../../Components/template/CreateFundButton';
import ShadowBox from '../../Components/Cards/ShadowBox';
import IconBox from '../../Components/Icons/IconBox';
import CardBox from '../../Components/Cards/CardBox';
import FundWithoutWeb3Tabs from '../../Components/Tabs/FundWithoutWeb3Tab';
import SortFunds from '../../Components/navigation/SortFunds';
import { MdOutlineBarChart } from 'react-icons/md'
import { FcComboChart } from 'react-icons/fc'
import { RiFundsBoxLine } from 'react-icons/ri'
import getFundsList from '../../utils/getFundsList';
import Loading from '../../Components/template/spiners/Loading';
import Footer from '../../Components/common/footer/Footer';
import Web3Allert from '../../Components/Web3Off/Web3Alert';
import { Observer, inject } from 'mobx-react';

function SmartFundListWithoutWeb3(props) {
  
    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            if (props.MobXStorage?.SmartFundsOriginal.length === 0) {
                try {
                    const smartFunds = await getFundsList();
                    props.MobXStorage?.initSFList(smartFunds);
                } catch (error) {
                    console.error('Error fetching smart funds:', error);
                }
            }
            if (isMounted) {
                props.setIsDataLoad(true);
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, []);
    
    useEffect(() => {
        web3Navigate()
    }, [props.web3])

    const web3Navigate = () => {
        if (props.web3) {
            window.location='/'
        //   const newPath = '/';
        //   window.history.pushState(null, '', newPath);
        }
      }

    const brandColor = useColorModeValue("#422AFB", "##CBC3E3");
    const boxBg = useColorModeValue("#F4F7FE", "#110938");
    const allbtnBg = useColorModeValue("#30106b", "#7500FF")
    console.log("MobXStorage withoutweb3fund", props.MobXStorage);
    console.log(props.web3,"========");
    return (
        <Observer>
            {() => {
                return (
                    <React.Fragment>
                        {
                            props.isDataLoad ?
                                (
                                    <Box className='dashboard' px={2} >
                                        <Grid sx={{ textAlign: 'center', fontWeight: "500" }}>
                                            <GridItem style={{ borderRadius: "5px", boxShadow: "1px 1px 1px 1px gray", border: "1px solid white" }} >
                                                <Web3Allert />
                                            </GridItem>
                                        </Grid>
                                        <CardBox p="10px" my="10px">
                                            <Grid gap={4} templateColumns={['1fr', 'repeat(3, 1fr)']} sx={{ padding: "10px 0px ", borderRadius: "5px", display: "flex", justifyContent: "space-around", flexDirection: { base: "column", sm: "column", md: "row" }, textAlign: { base: "center", sm: "center" } }}>
                                                <GridItem >
                                                    <CreateFundButton buttonName={"Create Funds"} info={"Please Connect to web3"} />
                                                </GridItem>
                                                <GridItem >
                                                    <FilterSearch MobXStorage={props.MobXStorage} />
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
                                                !props.MobXStorage.FilterActive ?
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
                                                                value={props.MobXStorage.SmartFundsOriginal.length}
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
                                                                value={`$ ${props.MobXStorage.TotalValue}`}
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
                                                                value={`$ ${props.MobXStorage.TotalProfit}`}
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
                                                                value={`$ ${props.MobXStorage.HistoryTotalProfit}`}
                                                            />
                                                        </SimpleGrid>
                                                    ) :
                                                    (
                                                        <Box>
                                                            <Text mb={2} bg="transparent" border="1px solid lightgray" boxShadow="1px 1px 1px 1px gray" borderRadius={5} sx={{ textTransform: "capitalize", fontWeight: "bold", color: "#7500ff", textAlign: "center" }}>{props.MobXStorage.FilterInfo}</Text>
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
                                                                    value={`${props.MobXStorage.SmartFunds.length} of ${props.MobXStorage.SmartFundsOriginal.length} funds`}
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
                                                                    value={`$ ${props.MobXStorage.userTotalValue}`}
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
                                                                    value={`$ ${props.MobXStorage.userTotalProfit}`}
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
                                                                    value={`$ ${props.MobXStorage.userHistoryTotalProfit}`}
                                                                />
                                                            </SimpleGrid>
                                                        </Box>
                                                    )
                                            }

                                        </Box>

                                        <SimpleGrid>
                                            <FundWithoutWeb3Tabs {...props} MobXStorage={props.MobXStorage} />
                                        </SimpleGrid>
                                    </Box>
                                ) :
                                (
                                    <Loading />
                                )
                        }
                        <Footer />
                    </React.Fragment>
                )
            }}
        </Observer>
    );

}

export default inject('MobXStorage')(SmartFundListWithoutWeb3);


