import { Grid, GridItem, Heading, Text, } from '@chakra-ui/react'
import React from 'react'
import { useLocation } from 'react-router-dom'

function Header({ heading }) {
  const path = useLocation()
  const pagePath = path.pathname
  return (

    <Grid p={2}
      sx={{
        position: "sticky",
        top: "0px",
        borderRadius: "5px",
        zIndex: "1000",
        backdropFilter: "blur(10px)",
        backgroundColor: "#F4F7FE0",
      }}>
      <GridItem >
        <Text sx={{ fontWeight: "bold", whiteSpace: "nowrap", width: { base: "40%", md: "100%" }, overflow: "hidden", textOverflow: "ellipsis" }}>Pages <span style={{ color: "#7500FF" }}> {pagePath}</span></Text>
        <Heading style={{ fontSize: '36px', fontWeight: "600", }}>{heading}</Heading>
      </GridItem>
    </Grid>

  )
}

export default Header
