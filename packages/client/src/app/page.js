"use client";

import React from "react";
import Box from '@mui/material/Box';

import Header from '../components/Header';
import Images from '../components/Images';
import Orders from '../components/Orders';
import MyNftPage from "../../pages/myNftPage";
import Container from '@mui/material/Container';

export default function Home() {
return (
    <>
    
      <Box mt={2}>
        <Header title="コメダ珈琲店" />
      </Box>
      <Box mt={2} style={{ paddingTop: '64px', paddingBottom: '0' }}>
        <Images />
      </Box>
      <Box mt={2} style={{ paddingTop: '0' }}>
        <Container maxWidth="lg">
            <Orders />
            <MyNftPage />
        </Container>
      </Box>
    </>
  );
}

