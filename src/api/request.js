import axios from "axios";

function getNewToken() {
    var refreshToken = localStorage.get('refreshSpotifyToken');
    request
        .post('/api/token', {
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        })
        .then(response => {
            console.log(response);
            localStorage.setItem('spotifyToken', response.data.access_token);
        })
}


const request = axios.create({
    baseURL: "https://api.spotify.com/v1/",
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('spotifyToken')}`,
        'Content-Type': 'application/json'
    }
});


// request.interceptors.request.use(function (config) {
//     return config;
// }, function (error) {
//     return Promise.reject(error);
// });


request.interceptors.response.use(function (response) {
    
    return response;
}, function (error) {
    
    if(error.response.status == 401) {
        getNewToken();
        return request.request(error.config);
    }
    return Promise.reject(error);
});


export default request;