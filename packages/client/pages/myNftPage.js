import React, { useEffect, useState } from "react";
import './MyNftPage.css'; // スタイリング用のCSSファイル
import Layout from '../src/components/Layout';
import '../styles/Common.css'; // このページ用にインポート

import { useContract, useNFTs } from "@thirdweb-dev/react";
// チェックインアイコンのパス

const checkInIcon = '/images/checkin.png';


const MyNftPage = () => {
  const [logingAccount, setLoginAccount] = useState("");
  const { contract } = useContract("0xED5AF388653567Af2F388E6224dC7C4b3241C544");
  const { data: nfts, isLoading, error } = useNFTs(contract);
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  
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

  if (isLoading) {
    return <p>Loading...</p>;
  }
  
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  
  const nftList = [];
  return (
    <Layout>
      <div className="nft-page">
        <div className="nft-list-container">
          <ul className="nft-list">
            {nfts.map((nft) => (
              <li key={nft.metadata.id} className="nft-item" onClick={() => { getOrderNFT(index) }}>
              <img src={nft.metadata.image} alt={nft.metadata.name} className="product-image" width="200" height="200" />
              <h2>{nft.metadata.name}</h2>
              <p>価格: {nft.name}</p>
              <p>{nft.metadata.description}</p>
              {/* 他のNFT情報があればここに */}
            </li>   
            ))
            }
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default MyNftPage;