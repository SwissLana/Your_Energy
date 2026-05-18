import axios from 'axios';
import { BASE_URL } from '../utils/constants';

axios.defaults.baseURL = BASE_URL;

export async function fetchFilters(filter, page, limit) {
  const response = await axios.get('/filters', {
    params: {
      filter,
      page,
      limit,
    },
  });

  return response.data;
}

export async function fetchExercises(params) {
  const response = await axios.get('/exercises', {
    params,
  });

  return response.data;
}

export async function fetchExerciseById(id) {
  const response = await axios.get(`/exercises/${id}`);
  return response.data;
}

export async function fetchQuote() {
  const response = await axios.get('/quote');
  return response.data;
}

export async function subscribe(email) {
  const response = await axios.post('/subscription', { email });
  return response.data;
}

export async function sendRating(id, ratingData) {
  const response = await axios.patch(`/exercises/${id}/rating`, ratingData);

  return response.data;
}
