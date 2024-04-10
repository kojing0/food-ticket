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

import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb";

// create the client with your clientId, or secretKey if in a server environment
const client = createThirdwebClient({ 
  clientId: "4ad298d7308d3d4854c5d058631197cd"
 });

// connect to your contract
const contract = getContract({ 
  client, 
  chain: defineChain(6038361), 
  address: "0xBc7a0c56c8b45550e9CB844b8589E1BaA8dC88A2"
});

// const contractAddress = "0xBc7a0c56c8b45550e9CB844b8589E1BaA8dC88A2"
// const contractABI = abi.abi;

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
      const response = await fetch(`https://zkyoto.explorer.startale.com/api/v2/tokens/0xBc7a0c56c8b45550e9CB844b8589E1BaA8dC88A2/instances`, {
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
      // const { ethereum } = window;
      // if (ethereum) {
        // const provider = new ethers.providers.Web3Provider(ethereum);
        // const signer = provider.getSigner();
        // const orderContract = new ethers.Contract(
        //   contractAddress,
        //   contractABI,
        //   signer
        // );
        // const orderTxn = await orderContract.safeMint(logingAccount, index);
        // await orderTxn.wait()
        // console.log("Mining...", orderTxn.hash);
        // console.log("ウォレットアドレス：",client.clientId);
        const walletAddress = logingAccount;
        const tokenId = 0;
        await contract.erc721.transfer(walletAddress, tokenId);
        console.log("Mining...",contract.contractAddress)
    //   } else {
    //     console.log("Ethereum object doesn't exist!");
    //   }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table" sx={{ borderCollapse: "collapse" }}>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={2} align="center">Loading...</TableCell>
            </TableRow>
          ) : (
            items.map((item, index) => (
              <React.Fragment key={item.id}>
                {/* ヘッダー */}
                <TableRow sx={{ height: 'auto', padding: '5px 0' }}>
                  <TableCell colSpan={2} sx={{ fontSize: "1.1rem", fontWeight: 'bold', borderBottom: "none", paddingBottom: 1, whiteSpace: 'nowrap' }}>
                    {item.metadata.name}
                  </TableCell>
                </TableRow>

                {/* ボディ */}
                <TableRow sx={{ height: "100px", verticalAlign: 'top', padding: '5px 0' }}>
                  <TableCell component="th" scope="row" sx={{ width: '50%', borderBottom: "none", paddingTop: 0, paddingBottom: 0, paddingLeft: 1, paddingRight: 1 }}>
                    <img
                      src={item.image_url}
                      alt='main image description'
                      style={{ width: 'calc(100% - 10px)', height: 'auto', marginLeft: '5px' }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontSize: "0.8rem", borderBottom: "none", paddingTop: 0, paddingBottom: 0, paddingRight: 2, paddingLeft: 1 }}>
                    {item.metadata.description}
                  </TableCell>
                </TableRow>

                {/* フッター */}
                <TableRow sx={{ height: 'auto', padding: '5px 0' }}>
                  <TableCell sx={{ fontSize: "0.8rem", verticalAlign: 'top', borderBottom: "none", paddingTop: 0, paddingLeft: 1 }}>
                    価格: 600円
                  </TableCell>
                  <TableCell sx={{ verticalAlign: 'top', textAlign: 'right', borderBottom: "none", paddingTop: 0, paddingRight: 1 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => { getOrderNFT(index) }}
                      sx={{ marginTop: '5px', marginRight: '5px' }}
                    >
                      購入
                    </Button>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Orders;
