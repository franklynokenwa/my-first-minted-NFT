require("dotenv").config()
const ethers = require('ethers');

const API_KEY = process.env.API_KEY

const provider = new ethers.providers.AlchemyProvider("goerli", API_KEY)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");


// Create a signer
const privateKey = process.env.PRIVATE_KEY
const signer = new ethers.Wallet(privateKey, provider)

// Get contract ABI and address
const abi = contract.abi
const contractAddress = process.env.CONTRACT_ADDRESS

// Create a contract instance
const myNftContract = new ethers.Contract(contractAddress, abi, signer)

const tokenUri = "https://gateway.pinata.cloud/ipfs/QmVGYYAs5r5CAZ2gEzHnBYfDDnbeVTRBgXaqgA3QyWPCD3"

// Call mintNFT function
const mintNFT = async () => {
    let nftTxn = await myNftContract.mintNFT(signer.address, tokenUri)
    await nftTxn.wait()
    console.log(`NFT Minted! Check it out at: https://goerli.etherscan.io/tx/${nftTxn.hash}`)
}

mintNFT()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });