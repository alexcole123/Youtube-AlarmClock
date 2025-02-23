
document.addEventListener("DOMContentLoaded", function () {
    // First, let's check if the clock element exists
    const clockPar = document.getElementById("clockPar");
    if (!clockPar) {
        console.error("Clock element not found!");
        return;
    }

    const youtubeBox = document.getElementById("youtubeBox");
    const videosContainer = document.getElementById("videosContainer");
    const alarmTimeInput = document.getElementById("alarmTime");
    const selectedVideoContainer = document.getElementById("selectedVideoContainer");
    const selectedVideo = document.getElementById("selectedVideo");

    let selectedVideoId = null;

    // Improved clock function
    function startClock() {
        function updateTime() {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            clockPar.textContent = `${hours}:${minutes}:${seconds}`;
        }

        // Initial call to display time immediately
        updateTime();
        // Update every second
        setInterval(updateTime, 1000);
    }

    function checkAlarm() {
        const now = new Date();
        const currentHours = now.getHours();
        const currentMinutes = now.getMinutes();

        const alarmTime = alarmTimeInput.value;
        if (alarmTime) {
            const [alarmHours, alarmMinutes] = alarmTime.split(':').map(Number); // Parse alarm time

            if (currentHours === alarmHours && currentMinutes === alarmMinutes && selectedVideoId) {
                playSelectedVideo();
                console.log("Alarm triggered!");
            } else {
                //console.log(`Current: ${currentHours}:${currentMinutes}, Alarm: ${alarmHours}:${alarmMinutes}`);
            }
        }
    }
    setInterval(checkAlarm, 1000);


    function playSelectedVideo() {
        if (selectedVideoId) {
            if (!selectedVideo.src.includes(selectedVideoId)) { // Corrected check
                selectedVideoContainer.style.display = 'block';
                selectedVideo.src = `https://www.youtube.com/embed/${selectedVideoId}?autoplay=1&mute=0`; // Corrected URL
            }
        }
    }
    youtubeBox.addEventListener('input', function () {
        const query = youtubeBox.value;
        const apiKey = "AIzaSyDYshjmu6S3WNpxPNYn6i9Pouga72uMRdA";

        fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${encodeURIComponent(query)}&part=snippet&type=video`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                videosContainer.innerHTML = '';

                if (!data.items) {
                    console.error('No videos found.');
                    return;
                }

                data.items.forEach(item => {
                    const videoId = item.id.videoId;
                    const videoTitle = item.snippet.title;
                    const videoThumbnail = item.snippet.thumbnails.default.url;

                    const videoElement = document.createElement('div');
                    videoElement.classList.add('video-item');
                    videoElement.innerHTML = `
                        <img src="${videoThumbnail}" alt="${videoTitle}">
                        <p>${videoTitle}</p>
                    `;

                    videoElement.addEventListener('click', function () {
                        selectedVideoId = videoId;

                        // Show selected video title inside the page
                        const selectedVideoText = document.createElement("p");
                        selectedVideoText.innerText = `Selected: ${videoTitle}`;
                        selectedVideoContainer.style.display = "block";

                        // Remove old text (if any) and add the new one
                        const existingText = selectedVideoContainer.querySelector("p");
                        if (existingText) existingText.remove();
                        selectedVideoContainer.prepend(selectedVideoText);
                    });

                    videosContainer.appendChild(videoElement);
                });
            })
            .catch(error => {
                console.error('Error:', error);
                videosContainer.innerHTML = `<p>Error fetching videos. Please try again later.</p>`;
            });
    });

    // Add the event listener for the name element 
    const nameElement = document.getElementById("nameProducer");
    nameElement.addEventListener('click', function () {
        alert("By Alex Cole");
    });

    // Start the clock immediately
    startClock();
});
