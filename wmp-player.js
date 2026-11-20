document.querySelectorAll(".wmp-player").forEach((player) => {
  const video = player.querySelector("video");
  const placeholder = player.querySelector(".wmp-placeholder");
  const titleEl = player.querySelector(".wmp-track-title");
  const timeEl = player.querySelector(".wmp-time");
  const playBtn = player.querySelector(".wmp-btn-play");
  const stopBtn = player.querySelector(".wmp-btn-stop");
  const rewindBtn = player.querySelector(".wmp-btn-rewind");
  const forwardBtn = player.querySelector(".wmp-btn-forward");
  const repeatBtn = player.querySelector(".wmp-btn-repeat");
  const volumeInput = player.querySelector(".wmp-volume input");
  const pageTitle = document.querySelector(".title");

  const videoSrc = player.dataset.video;
  if (videoSrc) {
    video.src = videoSrc;
    player.querySelector(".wmp-screen").classList.add("has-video");
  }

  if (pageTitle && titleEl) {
    titleEl.textContent = pageTitle.textContent.replace(/^\d+\.\s*/, "");
  }

  const playIcon = `<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`;
  const pauseIcon = `<svg viewBox="0 0 24 24"><path d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>`;

  function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  function updateTime() {
    const current = formatTime(video.currentTime);
    const total = formatTime(video.duration);
    timeEl.textContent = `${current} / ${total}`;
  }

  function setPlaying(playing) {
    playBtn.classList.toggle("is-playing", playing);
    playBtn.innerHTML = playing ? pauseIcon : playIcon;
    playBtn.setAttribute("aria-label", playing ? "pause" : "play");
  }

  playBtn.innerHTML = playIcon;
  playBtn.addEventListener("click", () => {
    if (!video.src) return;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });

  stopBtn.addEventListener("click", () => {
    video.pause();
    video.currentTime = 0;
    setPlaying(false);
    updateTime();
  });

  rewindBtn.addEventListener("click", () => {
    video.currentTime = Math.max(0, video.currentTime - 10);
  });

  forwardBtn.addEventListener("click", () => {
    video.currentTime = Math.min(video.duration || 0, video.currentTime + 10);
  });

  repeatBtn.addEventListener("click", () => {
    video.loop = !video.loop;
    repeatBtn.classList.toggle("active", video.loop);
  });

  volumeInput.addEventListener("input", () => {
    video.volume = volumeInput.value / 100;
  });

  video.addEventListener("play", () => setPlaying(true));
  video.addEventListener("pause", () => setPlaying(false));
  video.addEventListener("timeupdate", updateTime);
  video.addEventListener("loadedmetadata", updateTime);
  video.addEventListener("ended", () => setPlaying(false));

  video.addEventListener("click", () => {
    if (!video.src) return;
    if (video.paused) video.play();
    else video.pause();
  });

  if (!videoSrc && placeholder) {
    placeholder.textContent = "video coming soon";
  }
});
