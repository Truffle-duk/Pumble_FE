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
            return credentials.username; // RefreshToken 반환
        } else {
            console.log('No Auth found');
        }
    } catch (error) {
        console.error('Error retrieving Auth:', error);
    }
};

export async function GroupCall(method){
    if(method==="GID"){
        gid= await getGID()
        return gid
    }else{
        auth= await getAuth()
        return auth
    }
}