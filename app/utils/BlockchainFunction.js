import {ethers} from "ethers";
import {INFURA_ENDPOINT, TOKEN_CONTRACT_ADDRESS, LEDGER_CONTRACT_ADDRESS, EVENT_CONTRACT_ADDRESS, STORE_CONTRACT_ADDRESS, SEPOLIA_PRIVATE_KEY} from "@env"

const provider = new ethers.JsonRpcProvider(INFURA_ENDPOINT);
const wallet = new ethers.Wallet(SEPOLIA_PRIVATE_KEY, provider)

// Token Contract
const tokenContractAddress = TOKEN_CONTRACT_ADDRESS
const tokenContractABI = [
    "function approve(address spender, uint256 amount) public returns (bool)"
]
const tokenContract = new ethers.Contract(tokenContractAddress, tokenContractABI, wallet)

// Store Contract
const storeContractAddress = STORE_CONTRACT_ADDRESS
const storeContractABI = [
    "event PurchaseItem(string indexed hGroupId, string indexed hUserId, string indexed hItemId, string groupId, string userId, string itemId, uint256 timestamp)",
    "event ReceiveItem(string indexed hGroupId, string indexed hUserId, string indexed hItemId, string groupId, string userId, string itemId, uint256 timestamp, bool isReceived)",
    "function purchaseItem(string memory _groupId, string memory _userId, string memory _itemId, uint256 _price)",
    "function receiveItem(string memory _groupId, string memory _userId, uint256 _timestamp)"
]
const storeContract = new ethers.Contract(storeContractAddress, storeContractABI, wallet)

// Event Contract
const eventContractAddress = EVENT_CONTRACT_ADDRESS
const eventContractABI = [
    "event EventTokenRecords(string indexed hGroupId, uint256 indexed hTimestamp, string indexed hUserId, string userId, uint256 timestamp, uint256 eventId, uint256 tokenNum)",
    "function createEvent(uint256 _eventId, uint256 _maxPpl, uint256 _reward)",
    "function distributeTokens(uint256 _eventId, uint256 _amount, string memory _groupId, string _userId)",
    "function eventOver(uint256 _eventId, uint256 _remainToken) public returns (string memory)"
]
const eventContract = new ethers.Contract(eventContractAddress, eventContractABI, wallet)

// Ledger Contract
const ledgerContractAddress = LEDGER_CONTRACT_ADDRESS
const ledgerContractABI = [
    "event TransactionCreated(string indexed hGroupId, string indexed category, string groupId, uint256 transactionIndex, bool isDeposit, uint256 amount, string counterparty, string description, uint256 timestamp, string receiptDetails)",
    "event RetrieveBalance(string indexed hGroupId, string indexed category, string groupId, uint256 balance)",
    "function createGroup(string memory _groupId, string memory _name)",
    "function recordDeposit(string memory _groupId, uint256 _amount, string memory _counterparty, string memory _description)",
    "function recordWithdrawal(string memory _groupId, uint256 _amount, string memory _counterparty, string memory _description)",
    "function updateReceiptDetails(string memory _groupId, uint256 _transactionIndex, string memory _receiptDetails)"
];
export const ledgerContract = new ethers.Contract(ledgerContractAddress, ledgerContractABI, wallet)


/* Functions */
/* 1. Store Functions */
// 전체 구매 내역
export const getPurchaseHistoryAll = async (groupId) => {
    const hGroupIdHash = ethers.id(groupId.toString()); // keccak256 해시

    // 필터 설정
    const filter = {
        address: storeContractAddress,
        fromBlock: 0,
        toBlock: 'latest',
        topics: [
            ethers.id("PurchaseItem(string,string,string,string,string,string,uint256)"), // 이벤트 시그니처
            hGroupIdHash,
            null,
            null
        ]
    };

    try {
        const logs = await provider.getLogs(filter)

        // 로그를 이벤트 객체로 디코딩
        const iface = new ethers.Interface(storeContractABI);
        const events = logs.map(log => iface.parseLog(log))

        return events;
    } catch (error) {
        console.error("Error fetching token history:", error);
        throw error;
    }
}


// 전체 수령 내역
export const getReceiveHistoryAll = async (groupId) => {
    const hGroupIdHash = ethers.id(groupId.toString()); // keccak256 해시

    // 필터 설정
    const filter = {
        address: storeContractAddress,
        fromBlock: 0,
        toBlock: 'latest',
        topics: [
            ethers.id("ReceiveItem(string,string,string,string,string,string,uint256,bool)"), // 이벤트 시그니처
            hGroupIdHash,
            null,
            null
        ]
    };

    try {
        const logs = await provider.getLogs(filter)

        // 로그를 이벤트 객체로 디코딩
        const iface = new ethers.Interface(storeContractABI);
        const events = logs.map(log => iface.parseLog(log))

        return events;
    } catch (error) {
        console.error("Error fetching receive history:", error);
        throw error;
    }
}

// 수령 처리
export const receiveItem = async (groupId, gUserId, timestamp) => {
    try {
        console.log(`${groupId}, ${gUserId}, ${timestamp}`)

        const txResponse = await storeContract.receiveItem(groupId.toString(), gUserId.toString(), timestamp)
        console.log(`Transaction hash: ${txResponse.hash}`);

        // 트랜잭션 영수증 대기
        const receipt = await txResponse.wait();
        console.log(`Transaction confirmed in block: ${receipt.blockNumber}`);
        console.log(receipt)

        return "Success!"
    } catch (e) {
        console.log(e)
        console.log('error in purchase item')
    }
}

// 나의 구매 내역
export async function getPurchaseHistory(groupId, groupUserId) {
    const hGroupIdHash = ethers.id(groupId.toString()); // keccak256 해시
    const hGroupUserId = ethers.id(groupUserId.toString())

    // 필터 설정
    const filter = {
        address: storeContractAddress,
        fromBlock: 0,
        toBlock: 'latest',
        topics: [
            ethers.id("PurchaseItem(string,string,string,string,string,string,uint256)"), // 이벤트 시그니처
            hGroupIdHash,
            hGroupUserId,
            null
        ]
    };

    try {
        const logs = await provider.getLogs(filter)

        // 로그를 이벤트 객체로 디코딩
        const iface = new ethers.Interface(storeContractABI);
        const events = logs.map(log => iface.parseLog(log))

        return events;
    } catch (error) {
        console.error("Error fetching token history:", error);
        throw error;
    }
}

// 나의 수령 내역
export async function getReceiveHistory(groupId, groupUserId) {
    const hGroupIdHash = ethers.id(groupId.toString()); // keccak256 해시
    const hGroupUserId = ethers.id(groupUserId.toString())

    // 필터 설정
    const filter = {
        address: storeContractAddress,
        fromBlock: 0,
        toBlock: 'latest',
        topics: [
            ethers.id("ReceiveItem(string,string,string,string,string,string,uint256,bool)"), // 이벤트 시그니처
            hGroupIdHash,
            hGroupUserId,
            null
        ]
    };

    try {
        const logs = await provider.getLogs(filter)

        // 로그를 이벤트 객체로 디코딩
        const iface = new ethers.Interface(storeContractABI);
        const events = logs.map(log => iface.parseLog(log))

        return events;
    } catch (error) {
        console.error("Error fetching receive history:", error);
        throw error;
    }
}

// 상품 구매
export const purchaseItem = async (groupId, gUserId, itemId, price) => {
    try {
        console.log(`${groupId}, ${gUserId}, ${itemId}, ${price}`)
        // approve
        const approvePrice = ethers.parseUnits(price.toString(), 18) // PB 단위
        const tx1 = await tokenContract.approve(storeContractAddress, approvePrice)

        const nonce = await provider.getTransactionCount(wallet.address, "latest") //몇 번째 순서인지 계산
        const feeData = await provider.getFeeData();
        console.log(feeData)
        const gasPrice = feeData.gasPrice * 110n / 100n;

        console.log(nonce)
        const txResponse = await storeContract.purchaseItem(groupId.toString(), gUserId.toString(), itemId.toString(), price, { nonce: nonce + 1, gasPrice: gasPrice })
        console.log(`Transaction hash: ${txResponse.hash}`);

        // 트랜잭션 영수증 대기
        const receipt = await txResponse.wait();
        console.log(`Transaction confirmed in block: ${receipt.blockNumber}`);
        console.log(receipt)

        return "Success!"
    } catch (e) {
        console.log(e)
        console.log('error in purchase item')
    }
}

/* 2. Event Functions */
// 이벤트 생성
export const createEventBlock = async (eventId, maxPeople, reward) => {
    try {
        console.log(eventId)
        console.log(maxPeople)
        console.log(reward)

        const txResponse = await eventContract.createEvent(eventId, maxPeople, reward)
        console.log(`Transaction hash: ${txResponse.hash}`);

        // 트랜잭션 영수증 대기
        const receipt = await txResponse.wait();
        console.log(`Transaction confirmed in block: ${receipt.blockNumber}`);
        console.log(receipt)

        return "Success!"
    } catch (e) {
        console.log(e)
        console.log('error here')
    }
}

// 이벤트 참여
export const attendEvent = async (eventId, amount, groupId, groupUserId) => {
    try {
        console.log(eventId)
        console.log(amount)
        console.log(groupId)
        console.log(groupUserId)

        const amountInWei = ethers.parseEther(amount.toString())
        console.log(amountInWei.toString())
        const txResponse = await eventContract.distributeTokens(eventId, amountInWei, groupId.toString(), groupUserId.toString())
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

// PB 수령 내역 조회
export async function getPBHistory(groupId, groupUserId) {
    const hGroupIdHash = ethers.id(groupId.toString()); // keccak256 해시
    const hGroupUserId = ethers.id(groupUserId.toString())

    // 필터 설정
    const filter = {
        address: eventContractAddress,
        fromBlock: 0,
        toBlock: 'latest',
        topics: [
            ethers.id("EventTokenRecords(string,uint256,string,string,uint256,uint256,uint256)"), // 이벤트 시그니처
            hGroupIdHash,
            null,
            hGroupUserId
        ]
    };

    try {
        const logs = await provider.getLogs(filter)

        // 로그를 이벤트 객체로 디코딩
        const iface = new ethers.Interface(eventContractABI);
        const events = logs.map(log => iface.parseLog(log))

        return events;
    } catch (error) {
        console.error("Error fetching token history:", error);
        throw error;
    }
}

// 행사 종료 및 삭제
export const eventOver = async (_eventId, token) => {
    try {
        const eventId =  ethers.getUint(_eventId)
        const tokenToPB = ethers.parseUnits(token.toString(), 18) // PB 단위

        const txResponse = await eventContract.eventOver(_eventId, token)
        console.log(txResponse)
        console.log(`Transaction hash: ${txResponse.hash}`);

        // 트랜잭션 영수증 대기
        const receipt = await txResponse.wait();
        console.log(`Transaction confirmed in block: ${receipt.blockNumber}`);
        console.log(receipt)

        return "Success!"
    } catch (e) {
        console.log(e)
        console.log('error in event over')
    }
}

/* 3. Ledger Functions */
// 잔액 조회
export async function getBalance(groupId) {
    // 필터 설정
    const filter = {
        address: ledgerContractAddress,
        fromBlock: 0,
        toBlock: 'latest',
        topics: [
            ethers.id("RetrieveBalance(string,string,string,uint256)"), // 이벤트 시그니처
            ethers.id(groupId),
            ethers.id("ledger")
        ]
    };

    try {
        const logs = await provider.getLogs(filter)

        // 로그를 이벤트 객체로 디코딩
        const iface = new ethers.Interface(ledgerContractABI);
        const events = logs.map(log => iface.parseLog(log))

        return events;
    } catch (error) {
        console.error("Error fetching getBalance events:", error);
        throw error;
    }
}

// 거래 내역 조회
export async function getPastEvents(groupId) {
    const hGroupIdHash = ethers.id(groupId); // keccak256 해시
    const hCategory = ethers.id("ledger")

    // 필터 설정
    const filter = {
        address: ledgerContractAddress,
        fromBlock: 0,
        toBlock: 'latest',
        topics: [
            ethers.id("TransactionCreated(string,string,string,uint256,bool,uint256,string,string,uint256,string)"), // 이벤트 시그니처
            hGroupIdHash,
            hCategory
        ]
    };

    try {
        const logs = await provider.getLogs(filter)

        // 로그를 이벤트 객체로 디코딩
        const iface = new ethers.Interface(ledgerContractABI);
        const events = logs.map(log => iface.parseLog(log))
        console.log(events)
        return events;
    } catch (error) {
        console.error("Error fetching past events:", error);
        throw error;
    }
}

// 영수증 추가
export const addReceipt = async (groupId, transactionIdx, receiptUrl) => {
    try {
        console.log(`${groupId} ${transactionIdx} ${receiptUrl}`)
        console.log(typeof groupId)
        console.log(typeof transactionIdx)
        console.log(typeof receiptUrl)

        const txResponse = await ledgerContract.updateReceiptDetails(groupId, transactionIdx, receiptUrl)
        console.log(txResponse)
        console.log(`Transaction hash: ${txResponse.hash}`);

        // 트랜잭션 영수증 대기
        const receipt = await txResponse.wait();
        console.log(`Transaction confirmed in block: ${receipt.blockNumber}`);
        console.log(receipt)

        return "Success!"
    } catch (e) {
        console.log(e)
        console.log('error in add receipt')
    }
}