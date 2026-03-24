import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(image => `
      <li class="gallery-item">
        <a class="gallery-link" href="${image.largeImageURL}">
          <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}" />
        </a>
        <div class="info">
          <p><b>Likes</b> <span>${image.likes}</span></p>
          <p><b>Views</b> <span>${image.views}</span></p>
          <p><b>Comments</b> <span>${image.comments}</span></p>
          <p><b>Downloads</b> <span>${image.downloads}</span></p>
        </div>
      </li>
    `)
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('hidden');
}

export function hideLoader() {
  loader.classList.add('hidden');
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('hidden');
}