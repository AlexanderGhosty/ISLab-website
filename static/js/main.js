

        // Contact form submission
        document.getElementById('contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
            this.reset();
        });

        // Mobile menu toggle
        const burger = document.querySelector('header button');
        if (burger) {
            burger.addEventListener('click', function() {
                const nav = document.querySelector('header nav');
                nav.classList.toggle('hidden');
                nav.classList.toggle('block');
                nav.classList.toggle('absolute');
                nav.classList.toggle('top-16');
                nav.classList.toggle('left-0');
                nav.classList.toggle('right-0');
                nav.classList.toggle('bg-white');
                nav.classList.toggle('p-4');
                nav.classList.toggle('shadow-md');
            });
        }

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const nav = document.querySelector('header nav');
                    if (!nav.classList.contains('hidden')) {
                        nav.classList.add('hidden');
                        nav.classList.remove('block', 'absolute', 'top-16', 'left-0', 'right-0', 'bg-white', 'p-4', 'shadow-md');
                    }
                }
            });
        });

         function animateHeight(element, renderCallback) {
            const start = element.offsetHeight;
            renderCallback();
            const end = element.scrollHeight;
            element.classList.add('expandable');
            element.style.maxHeight = start + 'px';
            requestAnimationFrame(() => {
                element.style.maxHeight = end + 'px';
            });
            element.addEventListener('transitionend', function handler() {
                element.classList.remove('expandable');
                element.style.maxHeight = '';
                element.removeEventListener('transitionend', handler);
            });
        }
    
        // ────────────── NEWS ──────────────

        // Render news
         function renderNews(newsToRender, animate = false) {
            const newsContainer = document.getElementById('news-container');
            const render = () => {
                newsContainer.innerHTML = '';
                newsToRender.forEach(news => {
                    const newsElement = document.createElement('div');
                    newsElement.className = 'bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden news-card hover:shadow-2xl transition-all duration-300 hover:-translate-y-1';
                    newsElement.innerHTML = `
                        <img src="${news.image}" alt="${news.title}" class="w-full aspect-[4/3] object-cover">
                        <div class="p-6">
                            <div class="flex items-center mb-3">
                                <div class="w-2 h-2 bg-accent rounded-full mr-2"></div>
                                <div class="text-sm text-gray-500">${news.date}</div>
                            </div>
                            <h4 class="font-bold text-xl mb-3 text-primary-900 leading-tight">${news.title}</h4>
                            <p class="text-gray-700 mb-6 leading-relaxed">${news.excerpt}</p>
                            <div class="pt-4 border-t border-gray-100">
                                <a href="/news/${news.id}/" class="inline-flex items-center text-gray hover:text-accent-light font-medium transition-colors duration-200">
                                    <i class="fas fa-arrow-right mr-2"></i>
                                    Подробнее
                                </a>
                            </div>
                        </div>
                    `;
                    newsContainer.appendChild(newsElement);
                });
            };

            if (animate) {
                animateHeight(newsContainer, render);
            } else {
                render();
            }
        }

        let newsUrl = '/api/news/';   // текущая страница
        let newsData = [];

        function loadNews(url = newsUrl) {
            fetch(url)
                .then(r => r.json())
                .then(data => {
                    const list = Array.isArray(data) ? data : data.results || [];
                    newsData = [...newsData, ...list];
                    renderNews(newsData, true);

                    newsUrl = data.next;   // DRF даёт next=null, когда страницы кончились
                    updateNewsButtons();
                })
                .catch(console.error);
        }

        function updateNewsButtons() {
            const loadMoreBtn = document.getElementById('load-more-news');
            const hideBtn = document.getElementById('hide-news');

            if (loadMoreBtn && hideBtn) {
                if (newsUrl) {
                    // There are more pages to load
                    loadMoreBtn.style.display = 'inline-block';
                    hideBtn.style.display = 'none';
                } else {
                    // All pages loaded, show hide button only if we have more than 6 items
                    if (newsData.length > 6) {
                        loadMoreBtn.style.display = 'none';
                        hideBtn.style.display = 'inline-block';
                    } else {
                        // Only one page, hide both buttons
                        loadMoreBtn.style.display = 'none';
                        hideBtn.style.display = 'none';
                    }
                }
            }
        }

        function initNewsPagination() {
            // Load more news
            const loadMoreBtn = document.getElementById('load-more-news');
            if (loadMoreBtn) {
                loadMoreBtn.addEventListener('click', () => {
                    if (newsUrl) {
                        loadNews(newsUrl);
                    }
                });
            }

            // Hide news (show only first page)
            const hideBtn = document.getElementById('hide-news');
            if (hideBtn) {
                hideBtn.addEventListener('click', () => {
                    // Reset to first page only
                    newsData = newsData.slice(0, 6); // Keep only first 6 items (first page)
                    renderNews(newsData, true);
                    newsUrl = '/api/news/?page=2'; // Set to second page for next load
                    updateNewsButtons();
                });
            }

            // Initially hide both buttons until first load
            if (loadMoreBtn) loadMoreBtn.style.display = 'none';
            if (hideBtn) hideBtn.style.display = 'none';
        }

        // ────────────── PUBS ──────────────

        // Render publications
        function renderPublications(pubsToRender, animate = false) {
            const pubsContainer = document.getElementById('publications-container');
            const render = () => {
                pubsContainer.innerHTML = '';
                pubsToRender.forEach(pub => {
                    const pubElement = document.createElement('div');
                    pubElement.className = 'bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6 publication-item transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group relative overflow-hidden';
                    pubElement.innerHTML = `
                        <!-- Gradient accent border -->
                        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-accent-light opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        <!-- Content -->
                        <h5 class="font-bold text-lg mb-3 text-primary-900 leading-tight group-hover:text-primary-900 transition-colors">${pub.title}</h5>
                        <p class="text-sm text-gray-600 mb-3 flex items-center">

                            ${pub.authors}
                        </p>
                        <p class="text-xs text-gray-500 mb-4 flex items-center">
                            <i class="fas fa-book mr-2 text-gray-400"></i>
                            ${pub.journal}
                        </p>

                        <!-- Action button -->
                        <div class="pt-4 border-t border-gray-100">
                            <a href="${pub.link}" class="inline-flex items-center text-primary hover:text-accent-light text-sm font-medium transition-colors duration-200">
                                <i class="fas fa-download mr-2"></i>
                                Скачать
                            </a>
                        </div>
                    `;
                    pubsContainer.appendChild(pubElement);
                });
            };

            if (animate) {
                animateHeight(pubsContainer, render);
            } else {
                render();
            }
        }

        let pubsUrl = '/api/publications/';   // текущая страница публикаций
        let pubsData = [];

        function loadPubs(url = pubsUrl) {
            fetch(url)
                .then(r => r.json())
                .then(data => {
                    console.log('PUBLICATION DATA', data);
                    const list = Array.isArray(data) ? data : data.results || [];
                    pubsData = [...pubsData, ...list];
                    renderPublications(pubsData, true);

                    pubsUrl = data.next;   // DRF вернёт null, когда страниц не останется
                    updatePubsButtons();
                })
                .catch(console.error);
        }

        function updatePubsButtons() {
            const loadMoreBtn = document.getElementById('load-more-pubs');
            const hideBtn = document.getElementById('hide-pubs');

            if (loadMoreBtn && hideBtn) {
                if (pubsUrl) {
                    // There are more pages to load
                    loadMoreBtn.style.display = 'inline-block';
                    hideBtn.style.display = 'none';
                } else {
                    // All pages loaded, show hide button only if we have more than 4 items
                    if (pubsData.length > 4) {
                        loadMoreBtn.style.display = 'none';
                        hideBtn.style.display = 'inline-block';
                    } else {
                        // Only one page, hide both buttons
                        loadMoreBtn.style.display = 'none';
                        hideBtn.style.display = 'none';
                    }
                }
            }
        }

        function initPubsPagination() {
            // Load more pubs
            const loadMoreBtn = document.getElementById('load-more-pubs');
            if (loadMoreBtn) {
                loadMoreBtn.addEventListener('click', () => {
                    if (pubsUrl) {
                        loadPubs(pubsUrl);
                    }
                });
            }

            // Hide pubs (show only first page)
            const hideBtn = document.getElementById('hide-pubs');
            if (hideBtn) {
                hideBtn.addEventListener('click', () => {
                    // Reset to first page only
                    pubsData = pubsData.slice(0, 4); // Keep only first 4 items (first page)
                    renderPublications(pubsData, true);
                    pubsUrl = '/api/publications/?page=2'; // Set to second page for next load
                    updatePubsButtons();
                });
            }

            // Initially hide both buttons until first load
            if (loadMoreBtn) loadMoreBtn.style.display = 'none';
            if (hideBtn) hideBtn.style.display = 'none';
        }

        // ────────────── STAFF ──────────────

        // Render staff
        function renderStaff(staffToRender, animate = false) {
            const staffContainer = document.getElementById('staff-container');
            const render = () => {
                staffContainer.innerHTML = '';
                staffToRender.forEach(staff => {
                    const staffElement = document.createElement('div');
                    staffElement.className = 'bg-white rounded-lg shadow-md overflow-hidden staff-card relative';
                    staffElement.innerHTML = `
                        <img src="${staff.image}" alt="${staff.name}" class="w-full aspect-[3/4] object-contain bg-gray-100
                        rounded-t-lg transition-transform duration-300 ease-in-out hover:scale-105" onerror="this.src='/static/img/staff_placeholder.webp'">
                        <div class="p-4">
                            <h5 class="font-bold text-lg">${staff.name}</h5>
                            <p class="text-blue-900 text-sm mb-2">${staff.position}</p>
                                                </div>
                        <div class="absolute inset-0 bg-blue-900 bg-opacity-80 text-white p-6 opacity-0 staff-overlay transition
                        duration-300 flex flex-col justify-center">
                            <h5 class="font-bold text-xl mb-2">${staff.name}</h5>
                            <p class="text-blue-200 text-sm mb-2">${staff.position}</p>
                            <p class="text-sm mb-4">${staff.bio}</p>
                            <div class="flex space-x-3">
                                <a href="#" class="text-white hover:text-blue-200"><i class="fab fa-vk"></i></a>
                                <a href="#" class="text-white hover:text-blue-200"><i class="fas fa-envelope"></i></a>
                                <a href="#" class="text-white hover:text-blue-200"><i class="fas fa-phone-alt"></i></a>
                            </div>
                        </div>
                    `;
                    staffContainer.appendChild(staffElement);
                });
            };

            if (animate) {
                animateHeight(staffContainer, render);
            } else {
                render();
            }
        }

        let staffUrl = '/api/staff/';   // текущая страница
        let staffData = [];

        function loadStaff(url = staffUrl) {
            fetch(url)
                .then(r => r.json())
                .then(data => {
                    const list = Array.isArray(data) ? data : data.results || [];
                    staffData = [...staffData, ...list];
                    renderStaff(staffData, true);

                    staffUrl = data.next;   // DRF даёт next=null, когда страницы кончились
                    updateStaffButtons();
                })
                .catch(console.error);
        }

        function updateStaffButtons() {
            const loadMoreBtn = document.getElementById('load-more-staff');
            const hideBtn = document.getElementById('hide-staff');

            if (loadMoreBtn && hideBtn) {
                if (staffUrl) {
                    // There are more pages to load
                    loadMoreBtn.style.display = 'inline-block';
                    hideBtn.style.display = 'none';
                } else {
                    // All pages loaded, show hide button only if we have more than 4 items
                    if (staffData.length > 4) {
                        loadMoreBtn.style.display = 'none';
                        hideBtn.style.display = 'inline-block';
                    } else {
                        // Only one page, hide both buttons
                        loadMoreBtn.style.display = 'none';
                        hideBtn.style.display = 'none';
                    }
                }
            }
        }

        function initStaffPagination() {
            // Load more staff
            const loadMoreBtn = document.getElementById('load-more-staff');
            if (loadMoreBtn) {
                loadMoreBtn.addEventListener('click', () => {
                    if (staffUrl) {
                        loadStaff(staffUrl);
                    }
                });
            }

            // Hide staff (show only first page)
            const hideBtn = document.getElementById('hide-staff');
            if (hideBtn) {
                hideBtn.addEventListener('click', () => {
                    // Reset to first page only
                    staffData = staffData.slice(0, 4); // Keep only first 4 items (first page)
                    renderStaff(staffData, true);
                    staffUrl = '/api/staff/?page=2'; // Set to second page for next load
                    updateStaffButtons();
                });
            }

            // Initially show load more button, hide hide button
            if (loadMoreBtn) loadMoreBtn.style.display = 'none'; // Will be shown after first load if needed
            if (hideBtn) hideBtn.style.display = 'none';
        }
    
        

        document.addEventListener('DOMContentLoaded', function() {
            // Initialize all pagination functions first, then load first pages
            initNewsPagination();
            initPubsPagination();
            initStaffPagination();

            const historyBtn  = document.getElementById('toggle-history');
            const historyMore = document.getElementById('history-more');
            if (historyBtn && historyMore) {
                historyBtn.addEventListener('click', () => {
                    const opened = historyMore.classList.toggle('open');
                    if (opened) {
                        historyMore.style.maxHeight = historyMore.scrollHeight + 'px';
                        historyBtn.textContent = 'Скрыть';
                    } else {
                        historyMore.style.maxHeight = null;
                        historyBtn.textContent = 'Подробнее';
                    }
                });
            }

            // Load first pages for all sections
            loadNews(); // This will load first page and show "Показать больше" button if needed
            loadPubs(); // This will load first page and show "Загрузить больше" button if needed
            loadStaff(); // This will load first page and show "Показать больше" button if needed
        });