const axios = require('axios');

// add song to playlist

// 1) find song on spotify
// 2) add song to playlist

const search = async (artist, title, token) => {
    let query = encodeURIComponent(title);

    const url = `https://api.spotify.com/v1/search?q=track%3A${query}&type=track&include_external=true`;

    if (token === undefined || token === "") {
        console.log("TOKEN IS NOT SAVED")
    }

    const {data} = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
 
    // reshape data into easily digestible format
    const searchResult = data.tracks.items.map((item) => {
        return {
            title: item.name,
            title_uri: item.uri,
            artist: item.artists.map(e => {
                return {
                    name: e.name, 
                    uri: e.uri
                }
            })
        }
    })

    checkSearch(searchResult, artist, title, token);

    /*  data format in [searchResult]
    title, title_id, artist, artist_id
    */
}

const checkSearch = (searchResult, artist, title, token) => {
    for (let i = 0; i < searchResult.length; i++) {
        const title_temp = searchResult[i]['title'].toLowerCase()
        for (let j = 0; j < searchResult[i]['artist'].length; j++) {
            const artist_temp = searchResult[i]['artist'][j]['name'].toLowerCase()
  
            if (artist_temp === artist && title_temp === title) {
                // console.log('found match')
                addToPlaylist(searchResult[i]['title_uri'], token)
                return;
            } else {
                // console.log('no match')
            }
        }
    }
}

const addToPlaylist = async (title_uri, token) => {
    const playlist_id = "5yJDsNo6BRTRH7zhCp14XR" 
    const url = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?uris=${encodeURIComponent(title_uri)}`
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }

    const data = {
        uris: [title_uri]
    }

    axios
        .post(url, data, config)
        .then(res => console.log(res))
        .catch(err => console.log(err))
} 

module.exports = {search}