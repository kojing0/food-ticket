const { ethers } = require("hardhat");

async function main() {
    const TokenFactory = await ethers.getContractFactory("MyToken");
    const token = await TokenFactory.deploy();

    console.log("Deployment transaction sent. Waiting for confirmation...");

    // デプロイが完了するのを待ち、デプロイされたコントラクトインスタンスを取得
    await token.deployed();

    console.log("My NFT is deployed to", token.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});