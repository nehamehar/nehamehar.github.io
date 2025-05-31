document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const pageSections = document.querySelectorAll('.page-section');
    const mainContent = document.querySelector('main');
    const scrollToHomeBtn = document.getElementById('scrollToHomeBtn');

    
    // Function to update active navigation link based on current scroll position
    function updateActiveNavLink() {
        let currentPageId = 'home'; // Default to home

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    currentPageId = entry.target.id;

                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.dataset.page === currentPageId) {
                            link.classList.add('active');
                        }
                    });

                    // Toggle Scroll to Home button visibility
                    if (currentPageId === 'home') {
                        scrollToHomeBtn.classList.add('hidden');
                    } else {
                        scrollToHomeBtn.classList.remove('hidden');
                    }
                }
            });
        }, {
            root: mainContent,
            threshold: 0.5 // Trigger when 50% of the section is visible
        });

        pageSections.forEach(section => {
            observer.observe(section);
        });
    }

    // Event listeners for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = e.target.dataset.page;
            scrollToPage(pageId);
        });
    });

    // Event listener for Scroll to Home button
    scrollToHomeBtn.addEventListener('click', () => {
        scrollToPage('home');
    });

    // Initial setup on page load
    updateActiveNavLink();

    const initialHash = window.location.hash.substring(1);
    if (initialHash && document.getElementById(initialHash)) {
        scrollToPage(initialHash);
    } else {
        scrollToPage('home');
    }
});
