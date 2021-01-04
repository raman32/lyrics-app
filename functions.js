
// Download functions 
 async function getSongListAsync(searchQuery) {
    let songsList = await fetch("https://api.lyrics.ovh/suggest/" + searchQuery)
        .then(response => response.json())
        .then(data => data);
    return songsList;
}
 async function getSongLyricsAsync(artist, title) {
    let songLyrics = await fetch("https://api.lyrics.ovh/v1/" + artist + "/" + title)
        .then(response => response.json())
        .then(data => data.lyrics);
    return songLyrics;
}
 async function getSongsListFromLinkAsync(songListApiLink) {
    let songsList = await fetch("https://cors-anywhere.herokuapp.com/" + songListApiLink).then(response => response.json())
        .then(data => data);
    return songsList;
}
try {
if(module!=undefined)
    module.exports= exports=  {getSongListAsync:getSongListAsync,getSongsListFromLinkAsync:getSongsListFromLinkAsync,getSongLyricsAsync:getSongLyricsAsync}
}
catch {

}