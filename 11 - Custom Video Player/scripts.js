//Elements
const player = document.querySelector('.player'),
			video = player.querySelector('.viewer'),
			progress = player.querySelector('.progress'),
			progressBar = player.querySelector('.progress__filled'),
			toggle = player.querySelector('.toggle'),
			skipButtons = player.querySelectorAll('[data-skip]'),
			ranges = player.querySelectorAll('.player__slider');

//Functions
function togglePlay() {
	video.paused ? video.play() : video.pause(); //only .paused prop on video!

	// you can also do it like
	// const method = video.paused ? 'play' : 'pause';
	// video[method]();
	// ...but it's harder to read, so not that okay, I think
}

function updateButton() {
  toggle.textContent = this.paused ? '►' : '❚ ❚';
}

function skip() {
	video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
	video[this.name] = this.value; //name coincides with value on purpose, so
}

function handleProgress() {
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
}

//Event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton); //play video event
video.addEventListener('pause', updateButton); //pause video event
video.addEventListener('timeupdate', handleProgress); //also a 'progress' event, which is exactly the same

toggle.addEventListener('click', togglePlay);
skipButtons.forEach( button => button.addEventListener('click', skip));
ranges.forEach( range => range.addEventListener('change', handleRangeUpdate));
// ranges.forEach( range => range.addEventListener('mousemove', handleRangeUpdate));

progress.addEventListener('click', scrub);