import render from './render';

const widget  = document.querySelector('.widget')


async function fetchNews () {

  widget.classList.remove('state-loading','state-error', 'state-success' );

  widget.classList.add('state-loading');

  try{
    const response = await fetch('https://serviceworkers-for-backend.onrender.com/api/news');

     if (!response.ok) {
      throw new Error(`Ошибка сервера: ${response.status}`);
    }

    const newsList = await response.json();

    widget.classList.remove('state-loading');
    widget.classList.add('state-success');

    render(newsList);

  }catch(err){

    widget.classList.remove('state-loading');
    widget.classList.add('state-error');

    console.log(`Ошибка сервера: ${err}`);
  }

}

fetchNews ()


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/serwer-worker.js')
      .then((registration) => {
        console.log('✅ Service Worker успешно зарегистрирован в области:', registration.scope);
      })
      .catch((error) => {
        console.error('❌ Ошибка регистрации Service Worker:', error);
      });
  });
}