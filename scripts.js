// Initiliazation 
let searchQueryDOM = document.getElementById("searchTextbox");
let searchButtonDOM = document.getElementById("searchButton");
let songSearhContinerDOM = document.getElementById("songSearhContiner");
let lyricsContinerDOM = document.getElementById("songLyricsContainer");
let paginationContainerDOM = document.getElementById("paginationContainer");
let previousPaginationDOM = document.getElementById("previousPagination");
let nextPaginationDOM = document.getElementById("nextPagination");
let nextLink;
let previousLink;


// Custom Router 
function router() {
    let path = location.hash.slice(1).toLowerCase() || '/';
    if (path == "/lyrics") {
        showLyrics();
    }
    else if (path == "/search") {
        showSongList();
    }
    else {
        showNone();
    }
}
function showNone() {
    document.location.hash = "/";
    songSearhContinerDOM.style.display = "none";
    lyricsContinerDOM.style.display = "none";
    paginationContainerDOM.style.display = "none";
}
function showLyrics() {
    document.location.hash = "/lyrics";
    songSearhContinerDOM.style.display = "none";
    lyricsContinerDOM.style.display = "block";
    paginationContainerDOM.style.display = "none";
}
function showSongList() {
    document.location.hash = "/search";
    songSearhContinerDOM.style.display = "grid";
    lyricsContinerDOM.style.display = "none";
    paginationContainerDOM.style.display = "flex";
}
window.addEventListener("hashchange", router);



// DOM update functions
function updateSongsListDOM(songsList) {
    songSearhContinerDOM.innerHTML = "";
    songsList.data.forEach(element => {
        songSearhContinerDOM.innerHTML += `
    <div class="songCard">
    <div>
    <div class="songArtist">`
            + element.artist.name +
            ` - </div>
    <div class="songTitle">`
            + element.title +
            `</div>
    </div>
    <div class="showLyricsButton" artist="`+ element.artist.name + `" title="` + element.title + `">
    Show Lyrics
    <div>
    </div>
    `
    });
}
function addEventHandlersToShowLyrics() {
    [...document.getElementsByClassName("showLyricsButton")].forEach((element) =>
        element.addEventListener("click", showLyricsButtonClickHandler));
}


//Event Handlers
async function showLyricsButtonClickHandler(event) {
    //console.log(event);
    let lyrics = await getSongLyricsAsync(event.target.attributes.artist.value, event.target.attributes.title.value);
    lyricsContinerDOM.children[0].innerText = event.target.attributes.artist.value;
    lyricsContinerDOM.children[1].innerText = event.target.attributes.title.value;
    lyricsContinerDOM.children[2].innerText = lyrics;
    showLyrics();
}
async function paginationClickHandler(songListApiLink) {
    let songsList = await getSongsListFromLinkAsync(songListApiLink);
    nextLink = songsList.next;
    previousLink = songsList.prev;
    updateSongsListDOM(songsList);
    addEventHandlersToShowLyrics();
    nextPaginationDOM.style.display = nextLink !== undefined ? "block" : "none";
    previousPaginationDOM.style.display = previousLink !== undefined ? "block" : "none";
}

async function searchButtonClickHandler() {
    let songsList = await getSongListAsync(searchQueryDOM.value);
    nextLink = songsList.next;
    previousLink = undefined;
    updateSongsListDOM(songsList);
    addEventHandlersToShowLyrics();
    showSongList();
    nextPaginationDOM.style.display = nextLink !== undefined ? "block" : "none";
    previousPaginationDOM.style.display = "none";
}

// Attach Eventhandlers to DOM
searchButtonDOM.addEventListener("click", searchButtonClickHandler);
nextPaginationDOM.addEventListener("click", () => paginationClickHandler(nextLink));
previousPaginationDOM.addEventListener("click", () => paginationClickHandler(previousLink));
searchQueryDOM.addEventListener("keypress", (event) => event.key === "Enter" && searchButtonClickHandler());
