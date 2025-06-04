

        // Contact form submission
        document.getElementById('contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
            this.reset();
        });

        // Mobile menu toggle
        document.querySelector('header button').addEventListener('click', function() {
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

        // ────────────── NEWS ──────────────

        // Render news
        function renderNews(newsToRender) {
            const newsContainer = document.getElementById('news-container');
            newsContainer.innerHTML = '';
            
            newsToRender.forEach(news => {
                const newsElement = document.createElement('div');
                newsElement.className = 'bg-white rounded-lg shadow-md overflow-hidden news-card transition duration-300';
                newsElement.innerHTML = `
                    <img src="${news.image}" alt="${news.title}" class="w-full aspect-[4/3] object-cover">
                    <div class="p-6">
                        <div class="text-sm text-gray-500 mb-2">${news.date}</div>
                        <h4 class="font-bold text-lg mb-2">${news.title}</h4>
                        <p class="text-gray-700 mb-4">${news.excerpt}</p>
                        <a href="/news/${news.id}/" class="text-blue-900 font-medium hover:underline">Подробнее</a>
                    </div>
                `;
                newsContainer.appendChild(newsElement);
            });
        }

        let newsUrl = '/api/news/';   // текущая страница
        let newsData = [];

        function loadNews(url = newsUrl) {
            fetch(url)
                .then(r => r.json())
                .then(data => {
                    const list = Array.isArray(data) ? data : data.results || [];
                    newsData = [...newsData, ...list];
                    renderNews(newsData);

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
                    // All pages loaded, show hide button only if we have more than 4 items
                    if (newsData.length > 4) {
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
                    newsData = newsData.slice(0, 4); // Keep only first 4 items (first page)
                    renderNews(newsData);
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
        function renderPublications(pubsToRender) {
            const pubsContainer = document.getElementById('publications-container');
            pubsContainer.innerHTML = '';
            
            pubsToRender.forEach(pub => {
                const pubElement = document.createElement('div');
                pubElement.className = 'bg-white p-4 rounded-lg shadow-sm publication-item transition';
                pubElement.innerHTML = `
                    <h5 class="font-bold mb-1">${pub.title}</h5>
                    <p class="text-sm text-gray-600 mb-2">${pub.authors}</p>
                    <p class="text-xs text-gray-500 mb-2">${pub.journal}</p>
                    <a href="${pub.link}" class="text-blue-900 text-sm hover:underline inline-flex items-center">
                        <i class="fas fa-download mr-1"></i> Скачать
                    </a>
                `;
                pubsContainer.appendChild(pubElement);
            });
        }

        let pubsUrl = '/api/publications/';   // текущая страница публикаций
        let pubsData = [];

        function loadPubs(url = pubsUrl) {
            fetch(url)
                .then(r => r.json())
                .then(data => {
                    const list = Array.isArray(data) ? data : data.results || [];
                    pubsData = [...pubsData, ...list];
                    renderPublications(pubsData);

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
                    renderPublications(pubsData);
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
        function renderStaff(staffToRender) {
            const staffContainer = document.getElementById('staff-container');
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
        }

        let staffUrl = '/api/staff/';   // текущая страница
        let staffData = [];

        function loadStaff(url = staffUrl) {
            fetch(url)
                .then(r => r.json())
                .then(data => {
                    const list = Array.isArray(data) ? data : data.results || [];
                    staffData = [...staffData, ...list];
                    renderStaff(staffData);

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
                    renderStaff(staffData);
                    staffUrl = '/api/staff/?page=2'; // Set to second page for next load
                    updateStaffButtons();
                });
            }

            // Initially show load more button, hide hide button
            if (loadMoreBtn) loadMoreBtn.style.display = 'none'; // Will be shown after first load if needed
            if (hideBtn) hideBtn.style.display = 'none';
        }

    // ────────────── PROJECTS ──────────────
        let projectsUrl  = "/api/projects/";
        let projectsData = [];

        function renderProjects(list) {
            const box = document.getElementById("projects-container");
            box.innerHTML = "";
            list.forEach(p => {
                box.insertAdjacentHTML("beforeend", `
                    <div class="bg-white p-6 rounded-lg shadow-sm">
                        <h5 class="font-bold text-lg mb-2">${p.title}</h5>
                        <p class="text-gray-700 mb-2"><strong>Цель:</strong> ${p.goal}</p>
                        ${p.result ? `<p class="text-gray-700 mb-2"><strong>Результат:</strong> ${p.result}</p>` : ""}
                        <div class="flex justify-between items-center text-sm text-gray-500">
                            <span>${p.start_year}${p.end_year ? "–" + p.end_year : ""}</span>
                            <span>${p.sponsor || ""}</span>
                        </div>
                    </div>
                `);
            });
        }

        function loadProjects(url = projectsUrl) {
            fetch(url)
                .then(r => r.json())
                .then(data => {
                    const items = Array.isArray(data) ? data : (data.results || []);
                    projectsData = [...projectsData, ...items];
                    renderProjects(projectsData);

                    projectsUrl = data.next;   // DRF pagination
                    updateProjectsButtons();
                })
                .catch(console.error);
        }

        function updateProjectsButtons() {
            const loadMoreBtn = document.getElementById('load-more-projects');
            const hideBtn = document.getElementById('hide-projects');

            if (loadMoreBtn && hideBtn) {
                if (projectsUrl) {
                    // There are more pages to load
                    loadMoreBtn.style.display = 'inline-block';
                    hideBtn.style.display = 'none';
                } else {
                    // All pages loaded, show hide button only if we have more than 4 items
                    if (projectsData.length > 4) {
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

        function initProjectsPagination() {
            // Load more projects
            const loadMoreBtn = document.getElementById('load-more-projects');
            if (loadMoreBtn) {
                loadMoreBtn.addEventListener('click', () => {
                    if (projectsUrl) {
                        loadProjects(projectsUrl);
                    }
                });
            }

            // Hide projects (show only first page)
            const hideBtn = document.getElementById('hide-projects');
            if (hideBtn) {
                hideBtn.addEventListener('click', () => {
                    // Reset to first page only
                    projectsData = projectsData.slice(0, 4); // Keep only first 4 items (first page)
                    renderProjects(projectsData);
                    projectsUrl = '/api/projects/?page=2'; // Set to second page for next load
                    updateProjectsButtons();
                });
            }

            // Initially hide both buttons until first load
            if (loadMoreBtn) loadMoreBtn.style.display = 'none';
            if (hideBtn) hideBtn.style.display = 'none';
        }

        /* ───────────────── Tabs «Проекты / Публикации» ───────────────── */
        document.querySelectorAll('#projpub-tabs .tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
            // визуальное состояние
            document.querySelectorAll('#projpub-tabs .tab-btn').forEach(b => {
                b.classList.toggle('border-primary-900', b === btn);
                b.classList.toggle('text-primary-900',  b === btn);
                b.classList.toggle('text-gray-500',     b !== btn);
            });
        
            // show/hide panels
            const showProjects = btn.dataset.tab === 'projects';
            document.getElementById('projects-panel').classList.toggle('hidden', !showProjects);
            document.getElementById('pubs-panel').classList.toggle   ('hidden',  showProjects);
            });
        });
        

        document.addEventListener('DOMContentLoaded', function() {
            // Initialize all pagination functions first, then load first pages
            initNewsPagination();
            initPubsPagination();
            initProjectsPagination();
            initStaffPagination();

            // Load first pages for all sections
            loadNews(); // This will load first page and show "Показать больше" button if needed
            loadPubs(); // This will load first page and show "Загрузить больше" button if needed
            loadProjects(); // This will load first page and show "Показать больше" button if needed
            loadStaff(); // This will load first page and show "Показать больше" button if needed
        });