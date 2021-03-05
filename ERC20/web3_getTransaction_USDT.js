// Pre-requisite:
// 1. $npm install web3
// 2. infura.io注册账号并创建一个项目，获取APIkey以借用infura的节点访问以太坊主网/测试网

const Web3 = require('web3');

// 声明需要监听的钱包地址
var walletAddress = '0xb4a5723caf153e3cf86bf3537bbd0c1cfe66d0a9'
const addressDEX = ['0x5041ed759dd4afc3a72b8192c143f72f4724081a', '0xaB5C66752a9e8167967685F1450532fB96d5d24f','0x564286362092D8e7936f0549571a803B203aAceD', '0x0681d8Db095565FE8A346fA0277bFfdE9C0eDBBF', '0x708396f17127c42383E3b9014072679b2F60B82f', '0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE', '0x708396f17127c42383E3b9014072679b2F60B82f','0xa910f92acdaf488fa6ef02174fb86208ad7722ba', '0x46340b20830761efd32832a74d7169b29feb9758', '0xFfec0067F5a79CFf07527f63D83dD5462cCf8BA4', '0x2FAF487A4414Fe77e2327F0bf4AE2a264a776AD2']

// USDT合约的基本信息，用于穿件contract实例对象
const contractAddressUSDT = '0xdAC17F958D2ee523a2206206994597C13D831ec7'.toLowerCase()
const abiUSDT = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_upgradedAddress","type":"address"}],"name":"deprecate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"deprecated","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_evilUser","type":"address"}],"name":"addBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"upgradedAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maximumFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_maker","type":"address"}],"name":"getBlackListStatus","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newBasisPoints","type":"uint256"},{"name":"newMaxFee","type":"uint256"}],"name":"setParams","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"issue","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"redeem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"basisPointsRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isBlackListed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_clearedUser","type":"address"}],"name":"removeBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"MAX_UINT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_blackListedUser","type":"address"}],"name":"destroyBlackFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_initialSupply","type":"uint256"},{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Issue","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Redeem","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newAddress","type":"address"}],"name":"Deprecate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"feeBasisPoints","type":"uint256"},{"indexed":false,"name":"maxFee","type":"uint256"}],"name":"Params","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_blackListedUser","type":"address"},{"indexed":false,"name":"_balance","type":"uint256"}],"name":"DestroyedBlackFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"AddedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"RemovedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"}]

class TransactionChecker {
    web3;
    web3ws;
    address;
    subscription;
    contractUSDT;

    constructor(address) {
        // backup infura node proj: 80b8bb613b224947ab57931c59061d2c (qq) e866a907c58d47c480232fdfd72b2fff (xudong.zhg)   1198b26c9e8d44eb98736e102d192195 (zxd1007)
        this.web3ws = new Web3(new Web3('wss://mainnet.infura.io/ws/v3/e866a907c58d47c480232fdfd72b2fff'));
        this.web3 = new Web3(new Web3('https://mainnet.infura.io/v3/e866a907c58d47c480232fdfd72b2fff'));
        this.address = address.toLowerCase();
        //TODO: 实例化USDT合约对象，以查询该ERC20钱包地址在USDT合约下的余额
        this.contractUSDT = new this.web3.eth.Contract(abiUSDT, contractAddressUSDT)
    }

    // web3支持subscribe方法，可对链上发生的不同类型时间进行监听
    subscribe(topic) {
        this.subscription = this.web3ws.eth.subscribe(topic, (err, res) => {
            if (err) console.error(err);
        });
    }

    watchTransactions() {
        console.log('Watching all pending transactions to ', this.address);
        this.subscription.on('data', (txHash) => {
            setTimeout(async() => {
                try {
                    let tx = await this.web3.eth.getTransaction(txHash);
                    if (tx != null) {
                        // 过滤条件：交易需要为完成状态
                        if (tx.to != null & tx.transactionIndex !=null) {
                            if (tx.to.toLowerCase() == contractAddressUSDT) {
                                // 过滤条件1：监视特钱包的USDT入账
                                //  input字段中的第10-74位应该为待监视的钱包地址
                                // if (tx.input.slice(10,74) == this.address.slice(2)) { 
                                
                                // 过滤条件2：监视大钱包动态（可免因自己转账引发的手续费）
                                // 以下addressDEX为常见交易所(Huobi，Binance)等钱包地址，出入USDT频繁
                                if (addressDEX.includes(tx.from) | addressDEX.includes('0x'&tx.input.slice(10,74))) {
                                    console.log({timestamp: new Date(),tx});
                                    // 金额格式转换：input字段中的第74-138位为转账金额的hex值，转换后需除以1000000（USDT合约规定decimal = 6)
                                    let usdtAmt = this.web3.utils.hexToNumber('0x'+ tx.input.slice(74))/1000000;
                                    // TODO: 利用合约事件来查询出入金的账户余额变化
                                    // let usdtBalFrom = this.contractUSDT.methods.balanceOf(tx.from).call((err, result) => {console.log(result/1000000)}) 
                                    // let usdtBalTo = this.contractUSDT.methods.balanceOf('0x'+tx.input.slice(10,74)).call((err, result) => {console.log(result/1000000)}) 
                                    console.log('^ Summary: transferred', usdtAmt, 'USDT from', tx.from,  "to", this.address, '\n\n'); 
                                }
                            }
                        }
                    }
                } catch (err) {
                    console.error(err);
                }
            }, 6000)
        });
    }
}

let txChecker = new TransactionChecker('0xb4a5723caf153e3cf86bf3537bbd0c1cfe66d0a9'); 
txChecker.subscribe('pendingTransactions');
txChecker.watchTransactions();

// request ETH for testnet 
// https://faucet.rinkeby.io/  (sender address: 0x31B98D14007bDEe637298086988A0bBd31184523)
// https://faucet.ropsten.be/ (sender address: 0x687422eEA2cB73B5d3e242bA5456b782919AFc85)