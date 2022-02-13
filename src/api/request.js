import axios from "axios";

const request = axios.create({
    baseURL: "https://api.spotify.com/v1/",
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('spotifyToken')}`,
        'Content-Type': 'application/json'
    }
});

export default request;