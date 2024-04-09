"use client";

import React from "react";
import Box from '@mui/material/Box';

import Header from '../components/Header';
import Images from '../components/Images';
import Orders from '../components/Orders';
import MyNftPage from "../../pages/myNftPage";
import Container from '@mui/material/Container';
import {
  ThirdwebProvider,
  metamaskWallet,
} from "@thirdweb-dev/react";

// create the client with your clientId, or secretKey if in a server environment
const activeChain = "ethereum";
export default function Home() {

  return (
    <>
    <ThirdwebProvider 
          supportedWallets={[
            metamaskWallet({
              recommended: true,
            }),
          ]}
          activeChain={activeChain}
          clientId="3723bb4ee729f5524ca67005a82dda42">
      <Box mt={2}>
        <Header title="コメダ珈琲店" />
      </Box>
      <Box mt={2} style={{ paddingTop: '64px', paddingBottom: '0' }}>
        <Images />
      </Box>
      <Box mt={2} style={{ paddingTop: '0' }}>
        <Container maxWidth="lg">
          {/* <Orders /> */}
          <MyNftPage />
        </Container>
      </Box>
    </ThirdwebProvider>
    </>
  );
}

