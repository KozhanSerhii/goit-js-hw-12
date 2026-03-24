import axios from 'axios';

const API_KEY = '55097686-021960f1602add3603143e36a';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page = 1) {
  const searchParams = {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 15,
    },
  };

  const response = await axios.get(BASE_URL, searchParams);
  return response.data;
}