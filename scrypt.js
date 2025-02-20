const API_KEY = "AIzaSyAnAMu84PP3Bt2pCLrgn35Ih7EQAXvcGF4";

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const videoList = document.getElementById("video-list");

searchButton.addEventListener("click", () => {
  const query = searchInput.value;
  searchVideos(query);
});

// пошук через YouTube API
async function searchVideos(query) {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&maxResults=5&type=video&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    showVideos(data.items);
  } catch (error) {
    console.error("Помилка при запиті до API", error);
  }
}

// списoк відео
function showVideos(videos) {
  videoList.innerHTML = "";
  videos.forEach((video) => {
    const videoItem = document.createElement("div");
    videoItem.classList.add("video-item");

    videoItem.innerHTML = `
            <img src="${video.snippet.thumbnails.default.url}" alt="${video.snippet.title}">
            <span>${video.snippet.title}</span>
        `;

    videoItem.addEventListener("click", () => playVideo(video.id.videoId));

    videoList.appendChild(videoItem);
  });
}

// Функція відтворення відео
function playVideo(videoId) {
  videoList.innerHTML = `
        <iframe width="100%" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
        <br>
        <button onclick="searchVideos('${searchInput.value}')">Назад</button>
    `;
}
