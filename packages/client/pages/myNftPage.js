import React, { useEffect, useState } from "react";
import './MyNftPage.css'; // スタイリング用のCSSファイル
import Layout from '../src/components/Layout';
import '../styles/Common.css'; // このページ用にインポート


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { ThirdwebNftMedia, useContract, useContractMetadata, useNFTs } from "@thirdweb-dev/react";
// チェックインアイコンのパス

const checkInIcon = '/images/checkin.png';


const MyNftPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [logingAccount, setLoginAccount] = useState("");
  const { contract } = useContract("0xBc7a0c56c8b45550e9CB844b8589E1BaA8dC88A2");
  const { data: nfts, isLoading, error } = useNFTs(contract, { start: 0, count: 100 });

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
        const walletAddress = logingAccount;
        const tokenId = 0;
        await contract.erc721.transfer(walletAddress, tokenId);
        console.log("Mining...",contract.contractAddress);
    } catch (error) {
      console.log(error);
    }
  };

  // ダミーデータの準備
  // const products = [
  //   { id: 1, name: 'サンドイッチ', price: '500円', tickets: '残り10枚', image: '/images/sandwich.jpeg' },
  //   { id: 2, name: 'ミートソース', price: '700円', tickets: '残り5枚', image: '/images/meetsouce.jpeg' },
  //   { id: 3, name: 'ハンバーグ', price: '900円', tickets: '残り8枚', image: '/images/hamburg.jpeg' },
  //   { id: 4, name: 'カフェラテ', price: '300円', tickets: '残り15枚', image: 'images/cafelatte.jpeg' },
  //   { id: 5, name: '紅茶', price: '200円', tickets: '残り20枚', image: 'images/tea.jpeg' }
  // ];

  return (
    <Layout>
      <div className="nft-page">
        {/* ここにページ固有の内容 */}
        {/* <header className="header-nav">
          <h1>商品カード画面</h1>
        </header> */}

        <div className="nft-list-container">
          <ul className="nft-list">
            {items.map((item, index) => (
              <li key={item.id} className="nft-item" onClick={() => { getOrderNFT(index) }}>
                <img src={item.image_url} alt={item.metadata.name} className="product-image" width="200" height="200" />
                <h2>{item.metadata.name}</h2>
                <p>価格: {item.price}</p>
                <p>{item.metadata.description}</p>
                {/* 他のNFT情報があればここに */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default MyNftPage;