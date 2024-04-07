"use client";

import React from "react";
import Box from '@mui/material/Box';

import Header from '../components/Header';
import Images from '../components/Images';
import Orders from '../components/Orders';

import Container from '@mui/material/Container';

import {
  ThirdwebProvider,
  metamaskWallet,
  ja,
} from "@thirdweb-dev/react";

export default function Home() {
  return (
    <>
      <ThirdwebProvider
        // activeChain="sepolia"
        // clientId="YOUR_CLIENT_ID"
        locale={ja()}
        supportedWallets={[
          metamaskWallet(),
        ]}
      >

        <Box mt={2}>
          <Header title="サンプル中華料理店" />
        </Box>
        <Box mt={2}>
          <Images />
        </Box>
        <Box mt={4}>
          <Container maxWidth="lg">
            <Orders />
          </Container>
        </Box>
      </ThirdwebProvider>
    </>
  );
}

