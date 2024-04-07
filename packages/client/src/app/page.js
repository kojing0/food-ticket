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
  ja,
} from "@thirdweb-dev/react";




import { createThirdwebClient, getContract, resolveMethod } from "thirdweb";
import { defineChain } from "thirdweb";

// create the client with your clientId, or secretKey if in a server environment
export const client = createThirdwebClient({ 
  clientId: "3723bb4ee729f5524ca67005a82dda42" 
});

// connect to your contract
export const contract = getContract({ 
  client, 
  chain: defineChain(6038361), 
  address: "0xBc7a0c56c8b45550e9CB844b8589E1BaA8dC88A2"
});

export default function Home() {
  
  return (
    <ThirdwebProvider >
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
  );
}

