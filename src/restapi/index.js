import axios from 'axios';

// Instance of axios with base setup
const carsAPI = axios.create({
  baseURL: 'https://car-api2.p.rapidapi.com/api',
  timeout: 5000,
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
    'X-RapidAPI-Host': 'car-api2.p.rapidapi.com',
  },
  params: {
    direction: 'asc',
    sort: 'name',
  },
});

/**
 * Fetches manufacturers from REST API
 * @returns
 *   An array of all car manufacturers
 */
export async function getMakes() {
  try {
    const endpoint = 'makes';
    const response = await carsAPI.get(endpoint);
    return response.data.data;
  } catch (err) {
    throw err;
  }
}

/**
 * Fetches models of given make
 * @param {number} make
 *   ID of car manufacturer
 * @returns
 *   An Array of car models
 */
export async function getModels(make_id) {
  try {
    const endpoint = 'models';
    const response = await carsAPI.get(endpoint, {
      params: {
        year: '2020', // Free API I'm using is limiting queries to 2020 for non-paying users
        verbose: 'yes',
        make_id: make_id,
      },
    });
    return response.data.data;
  } catch (err) {
    throw err;
  }
}
