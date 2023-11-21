require("dotenv").config();
const { Alchemy, Network } = require("alchemy-sdk");
const { firstTopic, secondTopic } = require('./topics');
// prefix both the topics with 0x
const topics = [firstTopic(), secondTopic()].map((x) => '0x' + x);

const config = {
    apiKey: process.env.API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(config);

async function totalDaiTransferred(fromBlock, toBlock) {
    const logs = await alchemy.core.getLogs({
        address: "0x6b175474e89094c44da98b954eedeac495271d0f", // <-- TODO #1: fill in the dai address here
        fromBlock,
        toBlock,
        topics
    });

    // take a look at the first log in the response
    // console.log(logs[0]);

    const test = hexToDecimal("0x54b092f1d8420100000");
    // console.log(`test hex to decimal: ${test}`)
    // <-- TODO #2: return the total dai transferred during this timeframe
    let total = BigInt(0);
    for (let i = 0; i < logs.length; ++i) {
        const hexx = logs[i].data;
        // const trunc = hexx.substr(2).replace(/^0+/,"");
        console.log(`found hex: ${hexx}`);
        const valueBigInt = BigInt(hexx);
        // console.log(` decimal value str: ${valueStr}`);
        // const decVal = valueStr >> 18;
        console.log(` decimal value: ${valueBigInt}`);
        total += valueBigInt;    //Number.parseInt(valueStr);
    }
    return total;
}

module.exports = totalDaiTransferred;
