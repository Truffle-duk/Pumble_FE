const API_BASE_URL = "http://localhost:8080/api"
export function call(api, method, request) {
    let headers = new Headers({
        "Content-Type": "application/json",
    })

    /*const accessToken = localStorage.getItem("ACCESS_TOKEN")
    if (accessToken && accessToken !== null) {
        headers.append("Authorization", "Bearer " + accessToken)
    }*/

    let options = {
        headers: headers,
        url: API_BASE_URL + api,
        method: method,
    };

    if (request) {
        options.body = JSON.stringify(request);
    }

    return fetch(options.url, options)
        .then((response) => {
            if (response.status === 200) {
                return response.json()
            } /*else if (response.status === 403) {
                window.location.href = "/login"
            }*/ else { //TODO: 200 이외의 코드 처리
                Promise.reject(response);
                throw Error(response)
            }
        })
        .catch(error => {
            console.log("http error")
            console.log(error)
        })
}