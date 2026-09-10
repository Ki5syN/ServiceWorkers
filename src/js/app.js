import render from './render';

const widget = document.querySelector('.widget');
document.addEventListener('click', onClick);

async function fetchNews() {
  widget.classList.remove('state-loading', 'state-error', 'state-success');

  widget.classList.add('state-loading');

  try {
    const response = await fetch('https://serviceworkers-for-backend.onrender.com/api/news');

    if (!response.ok) {
      throw new Error(`Ошибка сервера: ${response.status}`);
    }

    const newsList = await response.json();

    widget.classList.remove('state-loading');
    widget.classList.add('state-success');

    render(newsList);
  } catch (err) {
    widget.classList.remove('state-loading');
    widget.classList.add('state-error');

    console.log(`Ошибка сервера: ${err}`);
  }
}

fetchNews();

function onClick(event) {
  if (!event.target.closest('.refresh')) {
    return;
  }

  fetchNews();
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/js/server-worker.js', { scope: '/' })
      .then((registration) => {
        console.log('✅ Server Worker успешно зарегистрирован в области:', registration.scope);
      })
      .catch((error) => {
        console.error('❌ Ошибка регистрации Server Worker:', error);
      });
  });
}
