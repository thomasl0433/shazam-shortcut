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

   
    console.log('TOKEN IS: ', token)

    const {data} = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })

    console.log(data.tracks.items[0])
}

module.exports = {search}