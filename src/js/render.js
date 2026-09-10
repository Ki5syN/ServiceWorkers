function renerItem(data) {
  const { date, text } = data;
  const dateObject = new Date(date);

  const newsField = document.querySelector('.news');

  const newsCard = document.createElement('div');
  newsCard.classList.add('news-card');

  const newsDate = document.createElement('time');
  newsDate.classList.add('title');
  newsDate.setAttribute('datetime', dateObject.toISOString());
  newsDate.textContent = dateObject.toLocaleString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const newsItemGroup = document.createElement('div');
  newsItemGroup.classList.add('news-card-group');

  const newsAvatar = document.createElement('div');
  newsAvatar.classList.add('avatar');

  const newsText = document.createElement('span');
  newsText.classList.add('text');
  newsText.textContent = text;

  newsItemGroup.append(newsAvatar, newsText);
  newsCard.append(newsDate, newsItemGroup);

  newsField.append(newsCard);
}

export default function renderNews(data) {
  data.forEach((el) => {
    renerItem(el);
  });
}
