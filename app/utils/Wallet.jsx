import {Text} from "react-native";
import "@ethersproject/shims";
import {ethers} from "ethers";
import * as Keychain from 'react-native-keychain';
import {ACCESS_CONTROL, ACCESSIBLE} from "react-native-keychain";
import {useEffect, useState} from "react";

const saveWalletInfo = async (key, value, service) => {
    const info = JSON.stringify(value);
    try {
        await Keychain.setGenericPassword(key, info, {
            service: service,
            accessible: ACCESSIBLE.WHEN_UNLOCKED
            //accessControl: ACCESS_CONTROL.DEVICE_PASSCODE
        });
        console.log('✨WalletInfo saved successfully!')
    } catch (e) {
        console.log('🚨Problems occurs while saving walletInfo')
        console.log(e)
    }
}

const getWalletInfo = async (service) => {
    try {
        const info = await Keychain.getGenericPassword({
            service: service,
            /*authenticationPrompt: {
                title: "키체인 접근",
                description: "지갑 정보를 가져오기 위해 키체인에 접근하시겠습니까?"
            }*/
        });

        if (info) {
            const value = JSON.parse(info.password);
            console.log(`${service} address: ` + value.address + `
${service} privateKey: ` + value.key);
        } else {
            console.log('WalletInfo doesn\'t exist');
        }
    } catch (e) {
        console.log('Failed to load walletInfo');
    }
}


const Wallet = () => {
    const [walletInfo, setWalletInfo] = useState({
        key: "",
        address: ""
    });
    const [walletInfo2, setWalletInfo2] = useState({
        key: "",
        address: ""
    });

    useEffect(() => {
        const wallet = ethers.Wallet.createRandom();
        setWalletInfo({
            key: wallet.privateKey,
            address: wallet.address
        })

        const wallet2 = ethers.Wallet.createRandom();
        setWalletInfo2({
            key: wallet2.privateKey,
            address: wallet2.address
        })
    }, []);

    saveWalletInfo('myWallet', walletInfo, "PumbleWalletService");
    saveWalletInfo('groupWallet', walletInfo2, "PumbleGroupWalletService");
    getWalletInfo("PumbleWalletService");
    getWalletInfo("PumbleGroupWalletService");
    return (
        <>
            <Text>{walletInfo.key}</Text>
            <Text>{walletInfo.address}</Text>

            <Text>{walletInfo2.key}</Text>
            <Text>{walletInfo2.address}</Text>
        </>
    )
}

export default Wallet;