const findSongs = () => {
    const searchText = document.getElementById('search-feild').value;
    // data load.....
    url = `https://api.lyrics.ovh/suggest/${searchText}`
    displayToggle();
    fetch(url)
        .then(res => res.json())
        .then(data => getSongDe(data.data))

}


const getSongDe = (songs) => {
    const songInfo = document.getElementById('songInfo');
    songInfo.innerHTML= '';
    songs.forEach(song => {
        const div = document.createElement('div');
        div.className = "single-result row align-items-center my-3 p-3";
        div.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
        </div>
        <audio controls>
            <source src="${song.preview}" type="audio/ogg">
        </audio>
        <div class="col-md-3 text-md-right text-center">
            <button onclick='getlis("${song.artist.name}","${song.title}")' class="btn btn-success">Get Lyrics</button>
        </div>
        `
        songInfo.appendChild(div);
        displayToggle();
    });
}

// load data...
const getlis = (artist,title)=>{
        url=`https://api.lyrics.ovh/v1/${artist}/${title}`

        fetch(url)
        .then(res => res.json())
        .then(data => getLyric(data.lyrics))
        .catch(error => console.log(error));
}

const getLyric=(songText) => {
    const lyrics = document.getElementById("lyrics-text");
    lyrics.innerText = songText;
}

const displayToggle = (show) => {
    const spinner = document.getElementById('spinner');
    const songs = document.getElementById('songInfo');
    spinner.classList.toggle('d-none');
    songs.classList.toggle('d-none');

}

document.getElementById('search-feild').addEventListener("keypress", function(event){
    if(event.key==="Enter"){
        document.getElementById("search-btn").click();
    }
});