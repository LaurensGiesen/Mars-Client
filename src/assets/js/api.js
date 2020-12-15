function getMessage() {
    return apiCall("message", "GET", null);
}

function apiCall(uri, httpVerb, body) {
    console.log(body);
    let api = `${config.host ? config.host + '/': ''}${config.group ? config.group + '/' : ''}api/`;
    const request = new Request(api + uri, {
        method: httpVerb,
        body: body,
        credentials: 'include',
    });
    console.log(request);
    return fetch(request)
        .then(response => response.json());
}

function registerCall(url, httpVerb, body){
    return apiCall(url, httpVerb, body);
}
