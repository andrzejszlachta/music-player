const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// music
const songs = [
  {
    imgName: 'eco-technology-img.png',
    audioName: 'eco-technology-audio.mp3',
    displayName: 'Eco Technology',
    artist: 'Lexin Music',
  },
  {
    imgName: 'futuristic-beat-img.png',
    audioName: 'futuristic-beat-audio.mp3',
    displayName: 'Futuristic Beat',
    artist: 'Royalty Free Music',
  },
  {
    imgName: 'leva-eternity-img.png',
    audioName: 'leva-eternity-audio.mp3',
    displayName: 'Leva Eternity',
    artist: 'Lemon Music Studio',
  },
]

// check if playing
let isPlaying = false;

// play
function playSong()  {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

// pause
function pauseSong()  {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
}

// play or pause event listener
playBtn.addEventListener('click', ()=> (isPlaying? pauseSong() : playSong()));

// update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `./assets/audio/${song.audioName}`;
  image.src = `./assets/img/${song.imgName}`;
}

// current song
let songIndex = 0;

// previous song
function prevSong() {
  songIndex--;
  if (songIndex < 0) songIndex = songs.length - 1;
  loadSong(songs[songIndex]);
  playSong();
}

// next song
function nextSong() {
  songIndex++;
  if (songIndex >= songs.length) songIndex = 0;
  loadSong(songs[songIndex]);
  playSong();
}

// on load - select firt song
loadSong(songs[songIndex]);

// event listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);