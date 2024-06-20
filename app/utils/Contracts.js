import {ethers} from "ethers";
import {MY_PRIVATE_KEY, EVENT_CONTRACT_ADDRESS} from "@env"
console.log(EVENT_CONTRACT_ADDRESS)
console.log(MY_PRIVATE_KEY)

//관리자 페이지 구현 시 삭제
const provider = new ethers.JsonRpcProvider('http://127.0.0.1:7545')
const privateKey = "0x8e75dbf50bbcf2a11d9e9f7cded8f827d66210dcc14fe6fc5513421211a4030c";
const wallet = new ethers.Wallet(privateKey, provider)
const eventContractAddress = "0x619e6e3BB15FEA84fA6ADCF86E834538906F3259"
const eventContractABI = [
    "event EventTokenRecords(string indexed hGroupId, uint256 indexed hTimestamp, uint256 indexed hUserId, uint256 userId, uint256 timestamp, uint256 eventId, uint256 tokenNum)",
    "function createEvent(uint256 _eventId, uint256 _maxPpl, uint256 _reward)",
    "function distributeTokens(uint256 _eventId, uint256 _amount, string memory _groupId, uint256 _userId)",
    "function eventOver(uint256 _eventId) public returns (string memory)"
]
const eventContract = new ethers.Contract(eventContractAddress, eventContractABI, wallet)

export const attendEvent = async (eventId, amount, groupId, groupUserId) => {
    try {
        const balance = await provider.getBalance("0x619e6e3BB15FEA84fA6ADCF86E834538906F3259");
        console.log(balance)
        console.log(eventId)
        console.log(amount)
        console.log(groupId)
        console.log(groupUserId)

        // 가스 한도 및 가격 설정
        const gasLimit = 210000; // 일반적인 트랜잭션 가스 한도
        const gasPrice = ethers.parseUnits('10', 'gwei'); // 10 gwei

        const txResponse = await eventContract.distributeTokens(eventId, amount, groupId.toString(), groupUserId, {
            gasLimit: gasLimit,
            gasPrice: gasPrice
        })
        console.log(`Transaction hash: ${txResponse.hash}`);

        // 트랜잭션 영수증 대기
        const receipt = await txResponse.wait();
        console.log(`Transaction confirmed in block: ${receipt.blockNumber}`);
        console.log(receipt)
    } catch (e) {
        console.log(e)
        console.log('error here')
    }
}
