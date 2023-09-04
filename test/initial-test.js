const Migrations = artifacts.require("Migrations");

contract("Migrations", (accounts) => {
    MY_ACCOUNT = accounts[0]; //"0x76437826c91e4AD5B2859E3976adB1C02d256Fb2"
    it("should deploy main contract", async () => {
        var balance = await web3.eth.getBalance(MY_ACCOUNT); //Will give value in.
        console.log(MY_ACCOUNT, "Account Address");
        console.log(balance, "Account Balance");
    });

})