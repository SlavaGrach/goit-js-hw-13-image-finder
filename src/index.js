import fetchPicture from './fetchpikcers';
import picturesTpl from './template/picturestpl.hbs';
import './style.css';
import * as basicLightbox from 'basiclightbox';
import './basicLightbox.min.css';

const formSearchRef = document.querySelector('#search-form');
const picturesGalery = document.querySelector('.gallery');
const buttonRef = document.querySelector('.load-more');
const inputRef = document.querySelector('input');


let pageNumber = 1;

formSearchRef.addEventListener('submit', event => {
    
    event.preventDefault();
    pageNumber = 1;
    picturesGalery.innerHTML = '';
    fetchPicture(pageNumber, inputRef.value).then(renderPictures);
});

function renderPictures(data) {
    
    picturesGalery.insertAdjacentHTML('beforeend', picturesTpl(data));
    window.scrollTo(
        {
            top: scrollHeight,
            left: 0,
            behavior: 'smooth',
        });
}

buttonRef.addEventListener('click', () => {
    pageNumber += 1;
    fetchPicture(pageNumber, inputRef.value).then(renderPictures);
    
})

picturesGalery.addEventListener('click', (event) => {
    if (event.target.nodeName !== 'IMG') {
        return;
    }

    basicLightbox.create(`
    <img src=${event.target.dataset.source} width="800" height="600">
`).show()

})

// console.log(fetchPicture('cat'));