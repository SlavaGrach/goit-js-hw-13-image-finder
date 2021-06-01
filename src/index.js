import apiService from './apiService';
import picturesTpl from './template/picturestpl.hbs';
import './style.css';
import * as basicLightbox from 'basiclightbox';
import './basicLightbox.min.css';

const formSearchRef = document.querySelector('#search-form');
const picturesGalery = document.querySelector('.gallery');
const buttonRef = document.querySelector('.load-more');
const inputRef = document.querySelector('input');


let pageNumber = 1;
buttonRef.style.visibility = 'hidden';

formSearchRef.addEventListener('submit', event => {
    
    event.preventDefault();
    pageNumber = 1;
    picturesGalery.innerHTML = '';
    apiService(pageNumber, inputRef.value).then(renderPictures);
    buttonRef.style.visibility = 'visible';
     
});

function renderPictures(data) {
       
    picturesGalery.insertAdjacentHTML('beforeend', picturesTpl(data));
    scroll();  
    
}

function scroll() {

    setTimeout(() => {
        buttonRef.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    }, 500);

}

function loadMoreImages() {
    pageNumber += 1;
    apiService(pageNumber, inputRef.value).then(renderPictures);
       
}

buttonRef.addEventListener('click', () => {
    loadMoreImages();
     
})

picturesGalery.addEventListener('click', (event) => {
    if (event.target.nodeName !== 'IMG') {
        return;
    }
    basicLightbox.create(`
    <img src=${event.target.dataset.source} width="800" height="600">
    `).show()
})



