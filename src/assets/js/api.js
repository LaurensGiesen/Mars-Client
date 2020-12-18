"use strict";

function apiCall(uri, httpVerb, body) {
    const api = `${config.host ? config.host + '/': ''}${config.group ? config.group + '/' : ''}api/`;
    const request = new Request(api + uri, {
        method: httpVerb,
        body: body,
        credentials: 'include',
    });
    return fetch(request)
        .then(response => response.json());
}

function registerCall(url, httpVerb, body){
    return apiCall(url, httpVerb, body);
}
