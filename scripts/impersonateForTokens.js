const hre = require("hardhat");
const fs = require("fs");
require("dotenv").config();
const impersonatedAccounts = require('./../config/impersonatedAccounts.json');

let config;
const network = hre.network.name;
if (network === 'localhost') config = require('./../config/mainnet.json');

const main = async () => {
	const provider = new ethers.providers.JsonRpcProvider(
		"http://localhost:8545"
	);
	await Promise.all(impersonatedAccounts.map(async (asset) => {
		// Replace these placeholders with your specific values
		const impersonatedAddress = asset.whaleAddress;
		const symbol = asset.symbol;
		const yourAddress = process.env.HH_ADDRESS;
		const privateKey = process.env.HH_PRIVATE_KEY;
		const tokenContractAddress = asset.tokenAddress;
		const amount = ethers.utils.parseEther('.000001'); // Adjust the amount as needed
		await impersonateAndSendTokens(impersonatedAddress, yourAddress, privateKey, tokenContractAddress, amount, symbol);
	}))

	async function impersonateAndSendTokens(impersonatedAddress, yourAddress, privateKey, tokenContractAddress, amount, symbol) {
		try {
				// Impersonate the account
				await provider.send('hardhat_impersonateAccount', [impersonatedAddress]);
				// Connect to the impersonated signer
				const impersonatedSigner = provider.getSigner(impersonatedAddress);
				// Connect to your signer using your private key
				const yourSigner = new ethers.Wallet(privateKey, provider);
				// Create a contract instance for the ERC20 token
				const tokenContract = new ethers.Contract(tokenContractAddress, ['function transfer(address to, uint256 amount)'], impersonatedSigner);
				// Call the ERC20 transfer function to send tokens
				const tx = await tokenContract.transfer(yourAddress, amount);
				// Wait for the transaction to be mined
				await tx.wait();
				console.log(`Sent ${amount} ${symbol} tokens from ${impersonatedAddress} to ${yourAddress}`);
			} 
			catch (error) {
				console.error(`Error sending ${symbol}`, error);
			}
	}
}

process.on("uncaughtException", function (err) {
  console.log("UnCaught Exception 83: " + err);
  console.error(err.stack);
  fs.appendFile("./critical.txt", err.stack, function () {});
});

process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: " + p + " - reason: " + reason);
});

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
