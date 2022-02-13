import request from "../request";

export default {
    
    getPlaylistFirstTrack(playlistId) {
        request
            .get(`playlists/${playlistId}/tracks?limit=1`)
            .then(response => {
                return response.data.items[0];
            })
    },

    getPlaylists() {
        var playlists = [];
        request
            .get('me/playlists')
            .then(response => {
                var resPlaylists = response.data.items;
                resPlaylists.map(playlist => {
                    playlists.push({
                        id: playlist.id,
                        name: playlist.name,
                        owner: playlist.owner.display_name,
                        coverArtUrl: playlist.images[0].url,
                    })
                })
            })
        return playlists;
        },

}