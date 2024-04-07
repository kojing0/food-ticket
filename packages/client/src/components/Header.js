import React, { useEffect, useState } from "react";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Header(props) {
  const { title } = props;

  // ログインしたユーザ名を保存
  const [currentAccount, setCurrentAccount] = useState("");

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
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => { checkIfWalletIsConnected(); }, []);
  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', position: 'fixed', top: 0, width: '100%', zIndex: 1,backgroundColor: 'white', color: 'black' }}>
        <Typography
          variant="h5"
          color="inherit"
          align="left"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>

        {!currentAccount && (
          <Button size="large" onClick={connectWallet}>
            ウォレット接続
          </Button>
        )}
        {currentAccount && (
          <Button size="large" >
            ウォレット接続済み
          </Button>
        )}

      </Toolbar>
    </React.Fragment>
  );
}

export default Header;