let currentPage = 1;
let currentQuery = '';

function searchImages() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();

    if (query === '') {
        alert('Please enter a search term.');
        return;
    }

    // If the query changed, reset page and clear images
    if (query !== currentQuery) {
        currentPage = 1;
        document.getElementById('imageContainer').innerHTML = '';
        currentQuery = query;
    }

    const apiKey = 'Fa1U4fP53h508vwQ-3heXRlmxknIisgNfZID6-kTFrA'; // Replace with your Unsplash API key
    const apiUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&page=${currentPage}&client_id=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayImages(data.results);

            const buttonContainer = document.querySelector('.button-container');
            buttonContainer.style.display = 'block';
        })
        .catch(error => console.error('Error fetching images:', error));
}

function displayImages(images) {
    const imageContainer = document.getElementById('imageContainer');

    images.forEach(image => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('image-card');

        const imgElement = document.createElement('img');
        imgElement.src = image.urls.regular;
        imgElement.alt = image.alt_description || 'Image';

        // Add zoom icon
        const zoomIcon = document.createElement('span');
        zoomIcon.className = 'zoom-icon';
        zoomIcon.innerHTML = '&#128269;';

        cardElement.appendChild(imgElement);
        cardElement.appendChild(zoomIcon);

        // Click event to open modal
        cardElement.addEventListener('click', function() {
            openModal(image.urls.full, image.alt_description || 'Image');
        });

        imageContainer.appendChild(cardElement);
    });

    currentPage++;
}

// Modal logic
function openModal(imgUrl, altText) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    modal.style.display = 'flex';
    modalImg.src = imgUrl;
    modalImg.alt = altText;
}

document.getElementById('modalClose').onclick = function() {
    document.getElementById('imageModal').style.display = 'none';
};
document.getElementById('imageModal').onclick = function(e) {
    if (e.target === this) this.style.display = 'none';
};

document.addEventListener('DOMContentLoaded', function() {
    const buttonContainer = document.querySelector('.button-container');
    buttonContainer.style.display = 'none';
});

function showMore() {
    searchImages();
}