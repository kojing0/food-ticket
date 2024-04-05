import React from 'react';
import Layout from '../src/components/Layout';
import '../styles/Common.css'; // このページ用にインポート

const Menu = () => {
    return (
        <Layout>
            <div>
                <h1>メニュー</h1>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                </ul>
            </div>
        </Layout>
    );
}

export default Menu;