const Migrations = artifacts.require("Migrations");

contract("Migrations", (accounts) => {
    MY_ACCOUNT = accounts[0];
    it("should deploy main contract", async () => {
        var balance = await web3.eth.getBalance(MY_ACCOUNT); //Will give value in.
        console.log(MY_ACCOUNT, "Account Address");
        console.log(balance, "Account Balance");
    });

})