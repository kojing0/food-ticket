import React from 'react';
import './MyNftPage.css'; // スタイリング用のCSSファイル
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import CouponIcon from '@mui/icons-material/LocalOffer';
import MapIcon from '@mui/icons-material/Map';
import CalendarIcon from '@mui/icons-material/Today';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // チェックアイコンをインポート
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; 
import SmartphoneIcon from '@mui/icons-material/Smartphone'; // スマホのアイコンをインポート
import Layout from '../src/components/Layout';
import '../styles/Common.css'; // このページ用にインポート
import MenuIcon from '../public/images/coffe_off.png';
import TicketIcon from '../public/images/phon_off.png';

// チェックインアイコンのパス

const checkInIcon = '/images/checkin.png';

const MyNftPage = () => {
  // ダミーデータの準備
  const products = [
    { id: 1, name: 'サンドイッチ', price: '500円', tickets: '残り10枚', image: '/images/sandwich.jpeg' },
    { id: 2, name: 'ミートソース', price: '700円', tickets: '残り5枚', image: '/images/meetsouce.jpeg' },
    { id: 3, name: 'ハンバーグ', price: '900円', tickets: '残り8枚', image: '/images/hamburg.jpeg' },
    { id: 4, name: 'カフェラテ', price: '300円', tickets: '残り15枚', image: 'images/cafelatte.jpeg' },
    { id: 5, name: '紅茶', price: '200円', tickets: '残り20枚', image: 'images/tea.jpeg' }
  ];

  return (
    <Layout>
      <div className="nft-page">
        {/* ここにページ固有の内容 */}
        <header className="header-nav">
          <h1>商品カード画面</h1>
        </header>

        <div className="nft-list-container">
          <ul className="nft-list">
            {products.map(product => (
              <li key={product.id} className="nft-item">
                <img src={product.image} alt={product.name} className="product-image" />
                <h2>{product.name}</h2>
                <p>価格: {product.price}</p>
                <p>{product.tickets}</p>
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