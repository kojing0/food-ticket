import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import { ethers } from "ethers";
import abi from "../utils/MyToken.json";

const contractAddress = "0xBD235f4136E2AC057f64A474aF036cB2549f258d"
const contractABI = abi.abi;

function Orders() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [logingAccount, setLoginAccount] = useState("");

  useEffect(() => {
    fetchData();
    checkIfWalletIsConnected();
  }, []);

  const fetchData = async () => {
    try {
      // TODO:zkyotoのコントラクトに入れ替える
      const response = await fetch('https://zkyoto.explorer.startale.com/api/v2/tokens/0xAd2750a92F9546774FC7c961B8a762E914b49f16/instances', {
        // const response = await fetch('https://zkyoto.explorer.startale.com/api/v2/tokens/0x81fFb522f3a1D2071A86736156E2E215D5e31ee0/instances', {
        headers: {
          'accept': 'application/json'
        }
      });
      const jsonData = await response.json();
      setItems(jsonData.items);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Make sure you have Metamask!")
      } else {
        console.log("We have the ethereum object", ethereum)
      }
      const accounts = await ethereum.request({ method: 'eth_accounts' })
      if (accounts.length !== 0) {
        console.log("Found an authorized account:", accounts[0]);
        setLoginAccount(accounts[0])
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error)
    }
  };

  const getOrderNFT = async (index) => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const orderContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        const orderTxn = await orderContract.safeMint(logingAccount, index);
        await orderTxn.wait()
        console.log("Mining...", orderTxn.hash);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TableContainer component={Paper} sx={{ height: 280 }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>商品画像</TableCell>
            <TableCell align="right">商品名</TableCell>
            <TableCell align="right">商品詳細</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={3} align="center">Loading...</TableCell>
            </TableRow>
          ) : (
            items.map((item, index) => (
              <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <img src={item.image_url} alt='main image description' width={70} />
                </TableCell>
                <TableCell align="right">{item.metadata.name}</TableCell>
                <TableCell align="right">{item.metadata.description}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => { getOrderNFT(index) }}>
                    購入
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Orders;