import Keychain from "react-native-keychain";

const getGID = async () => {
    try {
        const credentials = await Keychain.getInternetCredentials("GroupInfo");
        if (credentials) {
            return credentials.password; // GID 반환
        } else {
            console.log('No GID token found');
        }
    } catch (error) {
        console.error('Error retrieving GID:', error);
    }
};

const getAuth = async () => {
    try {
        const credentials = await Keychain.getInternetCredentials("GroupInfo");
        if (credentials) {
            return credentials.username; // 역할 반환
        } else {
            console.log('No Auth found');
        }
    } catch (error) {
        console.error('Error retrieving Auth:', error);
    }
};

export async function GroupCall(method, groupIdList){
    if(method==="GID"){
        const savedGroupId = await getGID()

        if (groupIdList) {

            if (groupIdList.some(groupId => groupId.toString() === savedGroupId)) {
                return savedGroupId
            } else {
                return groupIdList[0]
            }

        } else {
            return savedGroupId
        }

    }else{
        return await getAuth()
    }
}