const playBtn = document.querySelector("#play");
const rewindBtn = document.querySelector("#rewind");
const forwardBtn = document.querySelector("#forward");
const audio = document.querySelector("#audio");
const progressBar = document.querySelector(".progress-container");
const progress = document.querySelector(".progress");
const title = document.querySelector("#song");
const artist = document.querySelector("#artist-name");
const cover = document.querySelector("#img");
let currentIndex = 0;
let nextSong;

const tracks = [
  {
    img: "/images/48d167b4.png",
    song: "/songs/pullUp.mp3",
    artist: "Young Thug",
    name: "Pull Up",
  },
  {
    img: "/images/FutureAstronautStatus.png",
    song: "/songs/space-cadet.mp3",
    artist: "Future",
    name: "Space Cadet",
  },
  {
    img: "/images/https___images.genius.com_8cf0d4972215eb5b472b56470d15f5dd.1000x1000x1.png",
    song: "/songs/Weak.mp3",
    artist: "Chief Keef",
    name: "Weak",
  },
];
let song = tracks[currentIndex].song;

function updateSong() {
  cover.src = tracks[currentIndex].img;
  title.innerHTML = tracks[currentIndex].name;
  artist.innerHTML = tracks[currentIndex].artist;
  audio.src = tracks[currentIndex].song;
}

function playSong() {
  playBtn.classList.remove("fa-play");
  playBtn.classList.add("fa-pause");
  audio.play();
}

function pauseSong() {
  playBtn.classList.remove("fa-pause");
  playBtn.classList.add("fa-play");
  audio.pause();
}

function skipSong() {
  currentIndex++;
  if (currentIndex > tracks.length - 1) {
    currentIndex = 0;
  }
  updateSong();
  playSong();
  console.log("hi");
}

function goBack() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = tracks.length - 1;
  }
  updateSong();
  playSong();
}

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

function updateProgress() {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progressBar.offsetWidth) * audio.duration;
  audio.currentTime = scrubTime;
}

audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", skipSong);

// progress bar event listeners
let mouseDown = false;
progressBar.addEventListener("click", scrub);
progressBar.addEventListener("mousemove", (e) => mouseDown && scrub(e));
progress.addEventListener("mousedown", () => (mouseDown = true));
progressBar.addEventListener("mouseup", () => (mouseDown = false));

// Btn event listeners
forwardBtn.addEventListener("click", skipSong);
rewindBtn.addEventListener("click", goBack);
