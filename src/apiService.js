import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api/';

//https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=query&page=номер_страницы&per_page=12&key=твой_ключ

export default function apiService(page, query) {
    
    return axios('?image_type=photo&orientation=horizontal&q=' + query + `&page=${page}&per_page=12&key=6482848-443bdcc87ab7c743d3374b0c5`).then(response => response.data.hits);
}