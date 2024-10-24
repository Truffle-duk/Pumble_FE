import Keychain from "react-native-keychain";

const API_BASE_URL = "https://www.pumble.site/api"
const LOCAL_API_BASE_URL = "http://localhost:8080/api"

const getAccessToken = async () => {
    try {
        const credentials = await Keychain.getInternetCredentials("AccessToken");
        if (credentials) {
            return credentials.password; // AccessToken 반환
        } else {
            console.log('No access token found');
        }
    } catch (error) {
        console.error('Error retrieving access token:', error);
    }
};

const getRefreshToken = async () => {
    try {
        const credentials = await Keychain.getInternetCredentials("RefreshToken");
        if (credentials) {
            return credentials.password; // RefreshToken 반환
        } else {
            console.log('No refresh token found');
        }
    } catch (error) {
        console.error('Error retrieving refresh token:', error);
    }
};

const updateTokens = async (accessToken, refreshToken) => {
    try {
        const credentials = await Keychain.getInternetCredentials("AccessToken");
        if (credentials) {
            const email = credentials.username
            await Keychain.setInternetCredentials("AccessToken", email, accessToken);
            await Keychain.setInternetCredentials("RefreshToken", email, refreshToken);
        } else {
            console.log('No credential found');
        }
    } catch (error) {
        console.error('Error updating token:', error);
    }
}

export async function call(api, needToken, method, request/*, isMultipart=false*/) {
    let headers = await new Headers({
        "Content-Type": "application/json",
    })

    let token
    if (needToken) {
        token = await getAccessToken()
        headers.append("Authorization", "Bearer " + token)
    }
    // if(isMultipart){
    //     headers.set("Content-Type", "multipart/form-data");
    // }

    let options = {
        headers: headers,
        //url: LOCAL_API_BASE_URL + api,
        url: API_BASE_URL + api,
        method: method,
    };

    if (request) {
        /*if (isMultipart){
            options.body = request
        }*/
        options.body = JSON.stringify(request);
    }

    return fetch(options.url, options)
        .then((response) => {
            if (response.ok || response.status === 401) {
                return response.json()
            } else { //TODO: 200 이외의 코드 처리
                throw Error(response)
            }
        })
        .then(async (data) => {
            if (data.code && data.code === 200) {
                return data
            } else if (data.code && data.code === 'TOKEN4014') { //토큰 만료인 경우
                //1. rtk로 토큰들 재발급
                const refreshToken = await getRefreshToken()
                //const refreshApi = LOCAL_API_BASE_URL + '/auth/refresh'
                const refreshApi = API_BASE_URL + '/auth/refresh'
                const refreshOptions = {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({refreshToken: refreshToken})
                }
                const refreshData = await fetch(refreshApi, refreshOptions)
                    .then(response => {
                        return response.json()
                    })

                //2. 재발급한 토큰 갱신
                if (refreshData && refreshData.result) {
                    await updateTokens(refreshData.result.accessToken, refreshData.result.refreshToken);
                    return call(api, true, method, request);
                } else {
                    throw new Error('Failed to update tokens');
                }
            }
        })
        .catch(error => {
            console.log("http error")
            console.log(error)
        })
}