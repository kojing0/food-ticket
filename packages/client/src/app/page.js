"use client";

import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Home() {
  // ログインしたユーザ名を保存
  const [currentAccount, setCurrentAccount] = useState("");

  // ウォレットに接続しているか確認
  const checkIfWalletIsConnected = async () => {
    try {
      // window.ethereumにアクセスできることを確認
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Make sure you have Metamask!")
      } else {
        console.log("We have the ethereum object", ethereum)
      }

      // ユーザーのウォレットアドレスの許可を確認
      const accounts = await ethereum.request({ method: 'eth_accounts' })
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account)
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error)
    }
  };

  const connectWallet = async () => {
    try {
      // ユーザーが認証可能なウォレットアドレスを持っているか確認
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask");
        return;
      }
      // 持っている場合は、ユーザーに対してウォレットへのアクセス許可を求める。許可されれば、ユーザーの最初のウォレットアドレスを currentAccount に格納する。
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("connected: ", accounts[0])
      setCurrentAccount(accounts[0])
      // getTweet();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { checkIfWalletIsConnected(); }, []);
  return (
    <>
      <Box my={4} display="flex" justifyContent="space-around">
          サンプル中華料理店
        {!currentAccount && (
          <Button color="inherit" size="large" onClick={connectWallet}>
            ウォレット接続
          </Button>
        )}
        {currentAccount && (
          <Typography >
            ウォレット接続済み
          </Typography>

        )}
      </Box>
    </>
  );
}
