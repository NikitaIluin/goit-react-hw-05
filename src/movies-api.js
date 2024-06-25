import axios from 'axios'
const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNGUwMWEwMGYyYzNmY2E3NWJjZmRiNjMzYjc3NjMyOSIsInN1YiI6IjY2MDU4MzBjZDQwMGYzMDE3ZDkwNmFkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ue_SMfaFUwoXHhAsi06mOohgKi-YxSsQiww4Ew58Isk';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
axios.defaults.headers['Authorization'] = ' Bearer ' + API_TOKEN;

export const fetchData = async (path = '', newParams= {} ) => {
    const {data} = await axios.get(path, {
        params: {
            language: 'en-US',
            ...newParams
        }
    });
    return data;
};

export const imgBaseURL = 'https://image.tmdb.org/t/p/w500'










// url 'https://api.themoviedb.org/3/trending/movie/day?language=en-US'
// key 34e01a00f2c3fca75bcfdb633b776329
// hueta 'accept: application/json'