function getMessage() {
    return apiCall("message", "GET", null);
}

function apiCall(uri, httpVerb, body) {
    log(body);
    const request = new Request(api + uri, {
        method: httpVerb,
        body: body,
        credentials: 'include',
    });

    log(request);
    return fetch(request)
        .then(response => response.json());
}

function registerCall(url, httpVerb, body){
    return apiCall(url, httpVerb, body);
}