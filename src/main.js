import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions.js';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
const perPage = 15;

form.addEventListener('submit', async event => {
  event.preventDefault();
  
  query = event.currentTarget.elements['search-text'].value.trim();
  page = 1; 

  if (query === "") {
    iziToast.warning({ message: "Please fill the search field" });
    return;
  }

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    
    if (data.hits.length === 0) {
      iziToast.error({ message: "Sorry, there are no images matching your search query." });
      return;
    }

    createGallery(data.hits);

    if (data.totalHits > perPage) {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({ message: "Error fetching data!" });
  } finally {
    hideLoader();
    form.reset();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);
    
    smoothScroll();

    const totalPages = Math.ceil(data.totalHits / perPage);
    if (page >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({ message: "Error loading more images!" });
  } finally {
    hideLoader();
  }
});

function smoothScroll() {
  const card = document.querySelector('.gallery-item');
  if (card) {
    const { height } = card.getBoundingClientRect();
    window.scrollBy({
      top: height * 2,
      behavior: 'smooth',
    });
  }
}