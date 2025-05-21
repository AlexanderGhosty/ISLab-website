const NEWS_ID = (function () {
  const parts = window.location.pathname.split('/').filter(Boolean);
  return parts[parts.length - 1];
})();

if (!NEWS_ID) {
  document.getElementById('loading').textContent = 'Некорректный URL новости.';
} else {
  fetch(`/api/news/${NEWS_ID}/`)
    .then((r) => {
      if (!r.ok) throw new Error(r.status);
      return r.json();
    })
    .then(renderNews)
    .catch((err) => {
      console.error(err);
    });
}

function renderNews(data) {
  // Set breadcrumb
  document.getElementById('breadcrumb-title').textContent = data.title;

  // Set title
  document.getElementById('news-title').textContent = data.title;

  // Set date
  const dateOptions = {year: 'numeric', month: 'long', day: 'numeric'};
  const dateText = new Date(data.date).toLocaleDateString('ru-RU', dateOptions);
  document.getElementById('date-text').textContent = dateText;
  document.getElementById('news-date').setAttribute('datetime', data.date);

  // Set tags
  if (data.tags && data.tags.length) {
    const tagsContainer = document.getElementById('news-tags');
    data.tags.forEach(tag => {
      const tagElement = document.createElement('span');
      tagElement.className = 'tag';
      tagElement.textContent = tag;
      tagsContainer.appendChild(tagElement);
    });
  }

  // Set main image
  if (data.image) {
    document.getElementById('news-main-image').src = data.image;
    document.getElementById('news-main-image').alt = data.title;
    if (data.image_caption) {
      document.getElementById('image-caption').textContent = data.image_caption;
    }
  }

  // Set content
  document.getElementById('news-content').innerHTML = data.content;


  // Set gallery
  if (Array.isArray(data.gallery) && data.gallery.length) {
    const galleryBox = document.getElementById('news-gallery');
    document.getElementById('gallery-wrapper').classList.remove('hidden');
    document.getElementById('gallery-count').textContent = `${data.gallery.length} фото`;

    data.gallery.slice(0, 6).forEach((item) => {
      const galleryItem = document.createElement('div');
      galleryItem.className = 'gallery-item';

      const img = document.createElement('img');
      img.src = item.image;
      img.alt = item.caption || data.title;
      img.dataset.caption = item.caption || '';

      img.addEventListener('click', () => {
        openModal(item.image, item.caption || '');
      });

      galleryItem.appendChild(img);
      galleryBox.appendChild(galleryItem);
    });
  }

  // Set share buttons
  const currentUrl = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(data.title);
  document.getElementById('share-vk').href = `https://vk.com/share.php?url=${currentUrl}&title=${title}`;
  document.getElementById('share-tg').href = `https://t.me/share/url?url=${currentUrl}&text=${title}`;

  // Hide loading, show article
  document.getElementById('loading').remove();
  document.getElementById('news-article').classList.remove('hidden');
}

const modalEl = document.getElementById('image-modal');
const modalCard = document.getElementById('modal-card');
const modalImg = document.getElementById('modal-image');
const modalCap = document.getElementById('modal-caption');
const btnClose = document.getElementById('modal-close');

function openModal(src, caption = '') {
  modalImg.src = src;
  modalImg.alt = caption;
  modalCap.textContent = caption;

  modalEl.classList.remove('invisible', 'opacity-0');
  modalCard.classList.remove('scale-95');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalEl.classList.add('opacity-0');
  modalCard.classList.add('scale-95');
  setTimeout(() => {
    modalEl.classList.add('invisible');
    document.body.style.overflow = '';
    modalImg.src = '';
  }, 300);
}

window.openModal = openModal;
window.closeModal = closeModal;

/* Close handlers */
btnClose.addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => e.key === 'Escape' && closeModal());
modalEl.addEventListener('click', (e) => e.target === modalEl && closeModal());