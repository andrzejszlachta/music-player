const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
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

// convert time to string
function timeToString(time) {
  const durationMinutes = Math.floor(time / 60);
  const durationSeconds = (Math.floor(time) % 60).toString().length === 2 ? Math.floor(time) % 60 : `0${Math.floor(time) % 60}`;
  return `${durationMinutes}:${durationSeconds}`;
}

// update time text
function updateTime(element, time) {
  const currentTimeString = timeToString(time);
  element.textContent = currentTimeString;
}

// update progress bar and time
function updateProgressBar(e) {
  if (isPlaying) {
    const { currentTime, duration } = e.srcElement;
    // update progress bar
    const progressPercent = currentTime / duration * 100;
    progress.style.width = progressPercent + '%';
    
    // if current time changed - update
    if (!currentTime) return
    updateTime(currentTimeEl, currentTime);

    // if duration time changed - update
    updateTime(durationEl, duration);
  }
}

// update current time
function updateCurrentTime(e) {
  const percentageOfAudio = e.offsetX / this.clientWidth;
  const newTime = percentageOfAudio * music.duration;
  music.currentTime = newTime;
  playSong();
}

// event listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('loadedmetadata', ()=> {
  updateTime(durationEl, music.duration);
  updateTime(currentTimeEl, music.currentTime);
});
progressContainer.addEventListener('click', updateCurrentTime);