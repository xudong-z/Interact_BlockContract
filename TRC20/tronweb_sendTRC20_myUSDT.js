const TronWeb = require('tronweb')

const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://api.shasta.trongrid.io");
const solidityNode = new HttpProvider("https://api.shasta.trongrid.io");
const eventServer = new HttpProvider("https://api.shasta.trongrid.io");
const privateKey = "53e77495002645aa50303d2ee82af50797618a7aaee5616f2509d40b45353656";
const tronWeb = new TronWeb(fullNode,solidityNode,eventServer,privateKey);

const contractAddr = 'TNs3FFr9JVYfopfr7PGXUJELs626CnTsiW' //fake USDT available on shasta so far
const toAddr = 'TW7eKyRw8ow98fpFibLe84qKwSbrvuD1KB'

async function triggerSmartContract(contractAddr, toAddr) {
    const trc20ContractAddress = contractAddr;//contract address on shasta

    try {
        let contract = await tronWeb.contract().at(trc20ContractAddress);
        // Use send to execute a non-pure or modify smart contract method on a given smart contract that modify or change values on the blockchain.
        // These methods consume resources(bandwidth and energy) to perform as the changes need to be broadcasted out to the network.
        let result = await contract.transfer(
            toAddr, //address _to
            1   //amount
        ).send({
            feeLimit: 1e8
        }).then(output => {console.log('- TxnID:', output, '\n');});
        console.log('result ', result);
    } catch(error) {
        console.error("trigger smart contract error",error)
    }
}

triggerSmartContract(contractAddr, toAddr);