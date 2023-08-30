import React, {useState,useEffect} from 'react'
import { SmartFundABIV7 } from '../../config.js';
import {fromWei} from 'web3-utils'
import { useDisclosure,Button, ListItem, ModalCloseButton, ModalContent, ModalOverlay, OrderedList, ModalBody, ModalHeader, Modal, Box, useColorModeValue } from '@chakra-ui/react';
import Loading from '../template/spiners/Loading.js';

function UserHoldings(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [calculateAddressValue, setCalculateAddressValue] = useState(null);
    const [calculateAddressProfit, setCalculateAddressProfit] = useState(null);
    const [percentOfFundValue, setPercentOfFundValue] = useState(null);
    const [isLoad, setIsLoad] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (isOpen && props.address && !isLoad) {
                const fund = new props.web3.eth.Contract(SmartFundABIV7, props.address);
                const _calculateAddressValue = await fund.methods.calculateAddressValue(props.accounts[0]).call();
                const _calculateAddressProfit = await fund.methods.calculateAddressProfit(props.accounts[0]).call();
                const _fundValue = await fund.methods.calculateFundValue().call();

                setCalculateAddressValue(_calculateAddressValue.toString());
                setCalculateAddressProfit(_calculateAddressProfit.toString());
                setPercentOfFundValue(_fundValue.toString()); 

                setIsLoad(true);
            }
            
        };

        fetchData();
    }, [isOpen, props]);
    const allbtnBg=useColorModeValue("#30106b","#7500FF")


    return (
        <div>
            <Button bg={allbtnBg} sx={{ color: "#fff",width:{base:"100%"}, textTransform: "captlize", _hover: { backgroundColor: "#30108b" } }} onClick={onOpen}>
                My Holdings
            </Button>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader closeButton>
                        My funds
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {isLoad ? (
                            <React.Fragment>
                                <OrderedList>
                                    <ListItem>My deposit in BNB value: {fromWei(calculateAddressValue)}</ListItem>
                                    <ListItem>My profit : {fromWei(calculateAddressProfit)}</ListItem>
                                    <ListItem>My holding in fund value: {fromWei(percentOfFundValue)}</ListItem>
                                </OrderedList>
                            </React.Fragment>
                        ) : (
                            <Loading />
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default UserHoldings;