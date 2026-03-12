// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initGallery();
    initContactForm();
    initSmoothScrolling();
    initLanguageSelector();
    initScrollIndicator();
    initCookieBanner();
    initMobileCallDropdown(); // Added initialization call for mobile call dropdown
    initDesktopCallDropdown(); // Added initialization call for desktop call dropdown
    initHeroCallDropdown(); // Added initialization call for hero call dropdown
    initReadyCallDropdown(); // Added initialization call for ready call dropdown
    initImageCarousel(); // Added initialization call for image carousel
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navOverlay = document.getElementById('nav-overlay');
    const navLinks = document.querySelectorAll('.nav-link');

    // Check if required elements exist
    if (!navbar || !navToggle || !navMenu || !navOverlay) {
        console.log('Navigation elements not found - skipping navigation initialization');
        return;
    }

    // Sticky navigation on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const isActive = navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        navOverlay.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (isActive) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });

    // Close mobile menu when clicking on overlay
    navOverlay.addEventListener('click', function() {
        closeMobileMenu();
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target) && !navOverlay.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Helper function to close mobile menu
    function closeMobileMenu() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Active navigation link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.service-card, .equipment-category, .contact-item, .gallery-item, .pricing-item'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Animate section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        observer.observe(header);
    });
}

// Gallery functionality
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('gallery-modal');
    const modalImage = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    const modalClose = document.querySelector('.modal-close');

    // Check if gallery elements exist on this page
    if (!modal || !modalImage || !modalCaption || !modalClose) {
        console.log('Gallery modal elements not found on this page - skipping gallery initialization');
        return;
    }

    // Open modal when clicking gallery items
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const caption = this.getAttribute('data-caption');
            
            // For demo purposes, we'll use placeholder images
            // In real implementation, you would use actual image URLs
            const imageUrl = 'data:image/svg+xml;base64,' + btoa(`
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
                    <rect fill="%23e6f3ff" width="400" height="300"/>
                    <text x="200" y="150" text-anchor="middle" fill="%233182ce" font-family="Arial" font-size="24">
                        ${caption}
                    </text>
                    <text x="200" y="180" text-anchor="middle" fill="%23718096" font-family="Arial" font-size="14">
                        Кликнете за да видите истинската снимка
                    </text>
                </svg>
            `);
            
            modalImage.src = imageUrl;
            modalImage.alt = caption;
            modalCaption.textContent = caption;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    modalClose.addEventListener('click', closeModal);
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name').trim();
        const phone = formData.get('phone').trim();
        const service = formData.get('service');
        const message = formData.get('message').trim();
        
        // Basic validation
        if (!validateForm(name, phone, service, message)) {
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Изпраща се...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            showNotification('Запитването ви е изпратено успешно! Ще се свържем с вас скоро.', 'success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

// Form validation
function validateForm(name, phone, service, message) {
    let isValid = true;
    
    // Clear previous errors
    clearAllErrors();
    
    // Validate name
    if (!name) {
        showFieldError('name', 'Моля, въведете вашето име');
        isValid = false;
    } else if (name.length < 2) {
        showFieldError('name', 'Името трябва да бъде поне 2 символа');
        isValid = false;
    }
    
    // Validate phone
    if (!phone) {
        showFieldError('phone', 'Моля, въведете вашия телефон');
        isValid = false;
    } else if (!isValidPhone(phone)) {
        showFieldError('phone', 'Моля, въведете валиден телефонен номер');
        isValid = false;
    }
    
    // Validate service (optional but recommended)
    if (!service) {
        showFieldError('service', 'Моля, изберете услуга');
        isValid = false;
    }
    
    // Validate message (optional but check length if provided)
    if (message && message.length < 10) {
        showFieldError('message', 'Съобщението трябва да бъде поне 10 символа');
        isValid = false;
    }
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    clearFieldError(field);
    
    switch (fieldName) {
        case 'name':
            if (!value) {
                showFieldError('name', 'Моля, въведете вашето име');
                return false;
            } else if (value.length < 2) {
                showFieldError('name', 'Името трябва да бъде поне 2 символа');
                return false;
            }
            break;
            
        case 'phone':
            if (!value) {
                showFieldError('phone', 'Моля, въведете вашия телефон');
                return false;
            } else if (!isValidPhone(value)) {
                showFieldError('phone', 'Моля, въведете валиден телефонен номер');
                return false;
            }
            break;
            
        case 'service':
            if (!value) {
                showFieldError('service', 'Моля, изберете услуга');
                return false;
            }
            break;
            
        case 'message':
            if (value && value.length < 10) {
                showFieldError('message', 'Съобщението трябва да бъде поне 10 символа');
                return false;
            }
            break;
    }
    
    return true;
}

function isValidPhone(phone) {
    // Bulgarian phone number validation
    const phoneRegex = /^(\+359|0)[0-9]{9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const formGroup = field.closest('.form-group');
    
    // Remove existing error
    const existingError = formGroup.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error class to field
    field.classList.add('error');
    
    // Create error message
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.color = '#e53e3e';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    
    formGroup.appendChild(errorElement);
}

function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.field-error');
    
    if (errorElement) {
        errorElement.remove();
    }
    
    field.classList.remove('error');
}

function clearAllErrors() {
    const errorElements = document.querySelectorAll('.field-error');
    errorElements.forEach(error => error.remove());
    
    const errorFields = document.querySelectorAll('.error');
    errorFields.forEach(field => field.classList.remove('error'));
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #48bb78, #38a169)' : type === 'error' ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 'linear-gradient(135deg, #3b82f6, #2563eb)'};
        color: white;
        padding: 1.25rem 1.75rem;
        border-radius: 16px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
        backdrop-filter: blur(10px);
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Service card interactions
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        const button = card.querySelector('.btn-outline');
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Scroll to contact form
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const offsetTop = contactSection.offsetTop - 70;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Focus on service dropdown after scrolling
                setTimeout(() => {
                    const serviceSelect = document.getElementById('service');
                    if (serviceSelect) {
                        serviceSelect.focus();
                    }
                }, 800);
            }
        });
    });
});

// Lazy loading for images (when real images are added)
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .field-error {
        color: #e53e3e;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    }
    
    .error {
        border-color: #e53e3e !important;
        box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1) !important;
    }
    
    .notification {
        animation: slideInRight 0.3s ease-out;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: 1rem;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
    
    .nav-link.active {
        color: #3182ce;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Handle scroll events here if needed
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Image Carousel functionality
function initImageCarousel() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    
    if (slides.length === 0) return;
    
    // Show specific slide
    window.showSlide = function(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        currentSlide = index;
    };
    
    // Auto-advance carousel
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 4000);
    
    // Initialize first slide
    showSlide(0);
}

// Hero Call Dropdown functionality
function initHeroCallDropdown() {
    const heroCallBtn = document.getElementById('hero-call-btn');
    const heroCallOptions = document.getElementById('hero-call-options');
    
    if (heroCallBtn && heroCallOptions) {
        console.log('Hero call dropdown initialized');
        
        // Toggle dropdown
        heroCallBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Hero call button clicked');
            
            heroCallOptions.classList.toggle('active');
            
            // Rotate chevron icon
            const chevron = this.querySelector('.fa-chevron-down');
            if (chevron) {
                chevron.style.transform = heroCallOptions.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!heroCallBtn.contains(e.target) && !heroCallOptions.contains(e.target)) {
                heroCallOptions.classList.remove('active');
                const chevron = heroCallBtn.querySelector('.fa-chevron-down');
                if (chevron) {
                    chevron.style.transform = 'rotate(0deg)';
                }
            }
        });
        
        // Close dropdown when clicking on an option
        const options = heroCallOptions.querySelectorAll('.hero-call-option');
        options.forEach(option => {
            option.addEventListener('click', function() {
                heroCallOptions.classList.remove('active');
                const chevron = heroCallBtn.querySelector('.fa-chevron-down');
                if (chevron) {
                    chevron.style.transform = 'rotate(0deg)';
                }
            });
        });
    } else {
        console.error('Hero call dropdown elements not found:', { heroCallBtn, heroCallOptions });
    }
}

// Ready Call Dropdown functionality
function initReadyCallDropdown() {
    const readyCallBtn = document.getElementById('ready-call-btn');
    const readyCallOptions = document.getElementById('ready-call-options');
    
    if (readyCallBtn && readyCallOptions) {
        console.log('Ready call dropdown initialized');
        
        // Toggle dropdown
        readyCallBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Ready call button clicked');
            
            readyCallOptions.classList.toggle('active');
            
            // Rotate chevron icon
            const chevron = this.querySelector('.fa-chevron-down');
            if (chevron) {
                chevron.style.transform = readyCallOptions.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!readyCallBtn.contains(e.target) && !readyCallOptions.contains(e.target)) {
                readyCallOptions.classList.remove('active');
                const chevron = readyCallBtn.querySelector('.fa-chevron-down');
                if (chevron) {
                    chevron.style.transform = 'rotate(0deg)';
                }
            }
        });
        
        // Close dropdown when clicking on an option
        const options = readyCallOptions.querySelectorAll('.ready-call-option');
        options.forEach(option => {
            option.addEventListener('click', function() {
                readyCallOptions.classList.remove('active');
                const chevron = readyCallBtn.querySelector('.fa-chevron-down');
                if (chevron) {
                    chevron.style.transform = 'rotate(0deg)';
                }
            });
        });
    } else {
        console.error('Ready call dropdown elements not found:', { readyCallBtn, readyCallOptions });
    }
}

// Desktop Call Dropdown functionality
function initDesktopCallDropdown() {
    const desktopCallBtn = document.getElementById('desktop-call-btn');
    const desktopCallOptions = document.getElementById('desktop-call-options');
    
    console.log('Desktop call dropdown initialization:', { desktopCallBtn, desktopCallOptions });
    
    if (desktopCallBtn && desktopCallOptions) {
        console.log('Desktop call dropdown initialized');
        
        // Remove any existing event listeners to prevent duplicates
        const newDesktopCallBtn = desktopCallBtn.cloneNode(true);
        desktopCallBtn.parentNode.replaceChild(newDesktopCallBtn, desktopCallBtn);
        
        // Toggle dropdown
        newDesktopCallBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Desktop call button clicked');
            
            // Close any other open dropdowns first
            const allDropdowns = document.querySelectorAll('.desktop-call-options, .mobile-call-options, .hero-call-options, .ready-call-options');
            allDropdowns.forEach(dropdown => {
                if (dropdown !== desktopCallOptions) {
                    dropdown.classList.remove('active');
                }
            });
            
            // Toggle current dropdown
            const isActive = desktopCallOptions.classList.toggle('active');
            console.log('Dropdown toggled:', isActive);
            
            // Rotate chevron icon
            const chevron = this.querySelector('.fa-chevron-down');
            if (chevron) {
                chevron.style.transform = isActive ? 'rotate(180deg)' : 'rotate(0deg)';
            }
            
            // Force visibility as backup
            if (isActive) {
                desktopCallOptions.style.display = 'block';
                desktopCallOptions.style.zIndex = '999999';
                desktopCallOptions.style.opacity = '1';
                desktopCallOptions.style.visibility = 'visible';
            } else {
                desktopCallOptions.style.display = 'none';
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!newDesktopCallBtn.contains(e.target) && !desktopCallOptions.contains(e.target)) {
                desktopCallOptions.classList.remove('active');
                desktopCallOptions.style.display = 'none';
                const chevron = newDesktopCallBtn.querySelector('.fa-chevron-down');
                if (chevron) {
                    chevron.style.transform = 'rotate(0deg)';
                }
            }
        });
        
        // Close dropdown when clicking on an option
        const options = desktopCallOptions.querySelectorAll('.desktop-call-option');
        options.forEach(option => {
            option.addEventListener('click', function() {
                desktopCallOptions.classList.remove('active');
                desktopCallOptions.style.display = 'none';
                const chevron = newDesktopCallBtn.querySelector('.fa-chevron-down');
                if (chevron) {
                    chevron.style.transform = 'rotate(0deg)';
                }
            });
        });
        
        // Also add hover functionality for desktop
        newDesktopCallBtn.addEventListener('mouseenter', function() {
            desktopCallOptions.classList.add('active');
            desktopCallOptions.style.display = 'block';
            desktopCallOptions.style.zIndex = '999999';
            desktopCallOptions.style.opacity = '1';
            desktopCallOptions.style.visibility = 'visible';
            const chevron = this.querySelector('.fa-chevron-down');
            if (chevron) {
                chevron.style.transform = 'rotate(180deg)';
            }
        });
        
        const dropdownContainer = newDesktopCallBtn.closest('.desktop-call-dropdown');
        if (dropdownContainer) {
            dropdownContainer.addEventListener('mouseleave', function() {
                desktopCallOptions.classList.remove('active');
                desktopCallOptions.style.display = 'none';
                const chevron = newDesktopCallBtn.querySelector('.fa-chevron-down');
                if (chevron) {
                    chevron.style.transform = 'rotate(0deg)';
                }
            });
        }
        
    } else {
        console.warn('Desktop call dropdown elements not found on this page');
    }
}

// Mobile Call Dropdown functionality
function initMobileCallDropdown() {
    const mobileCallBtn = document.getElementById('mobile-call-btn');
    const mobileCallOptions = document.getElementById('mobile-call-options');
    
    if (mobileCallBtn && mobileCallOptions) {
        console.log('Mobile call dropdown initialized');
        
        // Toggle dropdown
        mobileCallBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mobile call button clicked');
            
            mobileCallOptions.classList.toggle('active');
            
            // Rotate chevron icon
            const chevron = this.querySelector('.fa-chevron-down');
            if (chevron) {
                chevron.style.transform = mobileCallOptions.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileCallBtn.contains(e.target) && !mobileCallOptions.contains(e.target)) {
                mobileCallOptions.classList.remove('active');
                const chevron = mobileCallBtn.querySelector('.fa-chevron-down');
                if (chevron) {
                    chevron.style.transform = 'rotate(0deg)';
                }
            }
        });
        
        // Close dropdown when clicking on an option
        const options = mobileCallOptions.querySelectorAll('.mobile-call-option');
        options.forEach(option => {
            option.addEventListener('click', function() {
                mobileCallOptions.classList.remove('active');
                const chevron = mobileCallBtn.querySelector('.fa-chevron-down');
                if (chevron) {
                    chevron.style.transform = 'rotate(0deg)';
                }
            });
        });
    } else {
        console.error('Mobile call dropdown elements not found:', { mobileCallBtn, mobileCallOptions });
    }
}

// Language Selector functionality
function initLanguageSelector() {
    // Desktop language selector
    const langBtn = document.getElementById('lang-btn');
    const langDropdown = document.getElementById('lang-dropdown');
    const currentFlag = document.getElementById('current-flag');
    
    // Mobile language selector
    const mobileLangBtn = document.getElementById('mobile-lang-btn');
    const mobileLangDropdown = document.getElementById('mobile-lang-dropdown');
    const mobileCurrentFlag = document.getElementById('mobile-current-flag');
    
    const langOptions = document.querySelectorAll('.lang-option');

    console.log('Language selector initialized:', {
        langBtn, langDropdown, 
        mobileLangBtn, mobileLangDropdown,
        langOptions: langOptions.length
    });
    
    // Simple test - try to click the mobile button programmatically
    setTimeout(() => {
        if (mobileLangBtn) {
            console.log('Testing mobile language button click...');
            mobileLangBtn.click();
        }
    }, 1000);

    // Desktop language selector
    if (langBtn && langDropdown) {
        // Toggle dropdown
        langBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Desktop language button clicked');
            langBtn.classList.toggle('active');
            langDropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
                langBtn.classList.remove('active');
                langDropdown.classList.remove('active');
            }
        });
    }

    // Mobile language selector
    if (mobileLangBtn && mobileLangDropdown) {
        console.log('Mobile language selector found');
        
        // Toggle dropdown
        mobileLangBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mobile language button clicked - before toggle');
            console.log('Current classes:', mobileLangBtn.className, mobileLangDropdown.className);
            
            mobileLangBtn.classList.toggle('active');
            mobileLangDropdown.classList.toggle('active');
            
            // Force display style as backup
            if (mobileLangDropdown.classList.contains('active')) {
                mobileLangDropdown.style.display = 'block';
                mobileLangDropdown.style.zIndex = '9999';
                mobileLangDropdown.style.opacity = '1';
                mobileLangDropdown.style.visibility = 'visible';
            } else {
                mobileLangDropdown.style.display = 'none';
            }
            
            console.log('Mobile language button clicked - after toggle');
            console.log('New classes:', mobileLangBtn.className, mobileLangDropdown.className);
            console.log('Dropdown display style:', window.getComputedStyle(mobileLangDropdown).display);
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileLangBtn.contains(e.target) && !mobileLangDropdown.contains(e.target)) {
                mobileLangBtn.classList.remove('active');
                mobileLangDropdown.classList.remove('active');
                mobileLangDropdown.style.display = 'none';
            }
        });
    } else {
        console.error('Mobile language selector elements not found:', { mobileLangBtn, mobileLangDropdown });
    }

    // Handle language selection for both desktop and mobile
    langOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all options
            langOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to selected option
            this.classList.add('active');
            
            // Update current language display for both desktop and mobile
            const lang = this.getAttribute('data-lang');
            const flag = this.getAttribute('data-flag');
            
            if (currentFlag) currentFlag.src = flag;
            if (mobileCurrentFlag) mobileCurrentFlag.src = flag;
            
            // Close both dropdowns
            if (langBtn) langBtn.classList.remove('active');
            if (langDropdown) langDropdown.classList.remove('active');
            if (mobileLangBtn) mobileLangBtn.classList.remove('active');
            if (mobileLangDropdown) mobileLangDropdown.classList.remove('active');
            
            console.log('Language selected:', lang);
            
            // Here you would typically implement actual language switching
            // For now, just show a notification
            showNotification(`Езикът е променен на ${this.querySelector('span').textContent}`, 'info');
        });
    });
}

// Scroll Indicator functionality
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (!scrollIndicator) return;

    // Smooth scroll to next section when clicking the indicator
    scrollIndicator.addEventListener('click', function() {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Hide scroll indicator when user scrolls down
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    });
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Change Language Function
function changeLanguage(lang) {
    if (!translations[lang]) {
        console.error('Language not found:', lang);
        return;
    }
    
    const elements = {
        // Navigation
        'nav-home': document.querySelector('a[href="#home"].nav-link'),
        'nav-about': document.querySelector('a[href="#about"].nav-link'),
        'nav-services': document.querySelector('a[href="#services"].nav-link'),
        'nav-equipment': document.querySelector('a[href="#equipment"].nav-link'),
        'nav-pricing': document.querySelector('a[href="#pricing"].nav-link'),
        'nav-contact': document.querySelector('a[href="#contact"].nav-link'),
        'nav-call': document.querySelector('.btn-cta'),
        
        // Hero
        'hero-title': document.querySelector('.hero-title'),
        'hero-subtitle': document.querySelector('.hero-subtitle'),
        'hero-btn-request': document.querySelector('.hero-buttons .btn-primary'),
        'scroll-text': document.querySelector('.scroll-indicator span'),
        
        // About
        'about-title': document.querySelector('#about .section-header h2'),
        'about-subtitle': document.querySelector('#about .section-header p'),
        'about-text': document.querySelector('.about-text p'),
        
        // Services
        'services-title': document.querySelector('#services .section-header h2'),
        'services-subtitle': document.querySelector('#services .section-header p'),
        
        // Equipment
        'equipment-title': document.querySelector('.equipment .section-header h2'),
        'equipment-subtitle': document.querySelector('.equipment .section-header p'),
        
        // Pricing
        'pricing-title': document.querySelector('#pricing .section-header h2'),
        'pricing-subtitle': document.querySelector('#pricing .section-header p'),
        
        // Gallery
        'gallery-title': document.querySelector('#gallery .section-header h2'),
        'gallery-subtitle': document.querySelector('#gallery .section-header p'),
        
        // Contact
        'contact-title': document.querySelector('#contact .section-header h2'),
        'contact-subtitle': document.querySelector('#contact .section-header p'),
    };
    
    // Update all elements
    Object.keys(elements).forEach(key => {
        const element = elements[key];
        if (element && translations[lang][key]) {
            // For buttons with icons, preserve the icon
            if (element.querySelector('i')) {
                const icon = element.querySelector('i').outerHTML;
                const text = translations[lang][key];
                element.innerHTML = icon + ' ' + text;
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
    
    // Update service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        const title = card.querySelector('h3');
        const text = card.querySelector('p');
        const btn = card.querySelector('.btn-outline');
        
        if (title) title.textContent = translations[lang][`service${index + 1}-title`];
        if (text) text.textContent = translations[lang][`service${index + 1}-text`];
        if (btn) btn.textContent = translations[lang]['btn-read-more'];
    });
    
    // Update equipment categories
    const equipmentCards = document.querySelectorAll('.equipment-category');
    equipmentCards.forEach((card, index) => {
        const title = card.querySelector('h3');
        if (title) {
            const icon = title.querySelector('i').outerHTML;
            title.innerHTML = icon + ' ' + translations[lang][`equipment${index + 1}-title`];
        }
    });
    
    // Update pricing items
    const pricingItems = document.querySelectorAll('.pricing-item');
    pricingItems.forEach((item, index) => {
        const title = item.querySelector('h4');
        const text = item.querySelector('p');
        
        if (title) title.textContent = translations[lang][`pricing${index + 1}-title`];
        if (text) text.textContent = translations[lang][`pricing${index + 1}-text`];
    });
    
    // Update pricing CTA
    const pricingCta = document.querySelector('.pricing-cta');
    if (pricingCta) {
        const title = pricingCta.querySelector('h3');
        const text = pricingCta.querySelector('p');
        const btn = pricingCta.querySelector('.btn-primary');
        
        if (title) title.textContent = translations[lang]['pricing-cta-title'];
        if (text) text.textContent = translations[lang]['pricing-cta-text'];
        if (btn) btn.textContent = translations[lang]['pricing-cta-btn'];
    }
    
    // Update contact form
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        const nameLabel = contactForm.querySelector('label[for="name"]');
        const phoneLabel = contactForm.querySelector('label[for="phone"]');
        const serviceLabel = contactForm.querySelector('label[for="service"]');
        const messageLabel = contactForm.querySelector('label[for="message"]');
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        
        if (nameLabel) nameLabel.textContent = translations[lang]['contact-name'] + ' *';
        if (phoneLabel) phoneLabel.textContent = translations[lang]['contact-phone'] + ' *';
        if (serviceLabel) serviceLabel.textContent = translations[lang]['contact-service'];
        if (messageLabel) messageLabel.textContent = translations[lang]['contact-message'];
        if (submitBtn) submitBtn.textContent = translations[lang]['contact-submit'];
    }
    
    // Update contact details
    const contactDetails = document.querySelectorAll('.contact-detail');
    const contactTitles = ['contact-phone-title', 'contact-email-title', 'contact-address-title', 'contact-hours-title'];
    contactDetails.forEach((detail, index) => {
        const title = detail.querySelector('h4');
        if (title && contactTitles[index]) {
            title.textContent = translations[lang][contactTitles[index]];
        }
    });
    
    // Update footer
    const footerText = document.querySelector('.footer-section p');
    if (footerText) footerText.textContent = translations[lang]['footer-text'];
    
    const footerCopyright = document.querySelector('.footer-bottom p:first-child');
    if (footerCopyright) footerCopyright.textContent = translations[lang]['footer-copyright'];
    
    // Store selected language
    localStorage.setItem('selectedLanguage', lang);
    
    console.log('Language changed successfully to:', lang);
}

// Load saved language on page load
window.addEventListener('load', function() {
    const savedLang = localStorage.getItem('selectedLanguage') || 'bg';
    if (savedLang !== 'bg') {
        changeLanguage(savedLang);
        
        // Update active language option and flag
        document.querySelectorAll('.lang-option').forEach(opt => {
            opt.classList.remove('active');
            if (opt.getAttribute('data-lang') === savedLang) {
                opt.classList.add('active');
                const flag = opt.getAttribute('data-flag');
                const currentFlag = document.getElementById('current-flag');
                if (currentFlag) currentFlag.src = flag;
            }
        });
    }
});

// Accessibility functionality
function initAccessibility() {
    const accessibilityBtn = document.getElementById('accessibility-btn');
    const accessibilityMenu = document.getElementById('accessibility-menu');
    const accessibilityReset = document.getElementById('accessibility-reset');
    
    // Accessibility options
    const options = {
        'high-contrast': 'high-contrast',
        'large-text': 'large-text',
        'dyslexia-friendly': 'dyslexia-friendly',
        'focus-mode': 'focus-mode',
        'grayscale': 'grayscale',
        'link-highlight': 'link-highlight',
        'cursor-large': 'cursor-large'
    };
    
    // Load saved accessibility settings
    loadAccessibilitySettings();
    
    // Toggle accessibility menu
    if (accessibilityBtn) {
        accessibilityBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('Accessibility button clicked');
            accessibilityMenu.classList.toggle('show');
            console.log('Menu show class:', accessibilityMenu.classList.contains('show'));
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (accessibilityMenu && !accessibilityBtn.contains(e.target) && !accessibilityMenu.contains(e.target)) {
            accessibilityMenu.classList.remove('show');
        }
    });
    
    // Handle each accessibility option
    Object.keys(options).forEach(optionId => {
        const checkbox = document.getElementById(optionId);
        const toggle = checkbox.nextElementSibling;
        
        if (checkbox && toggle) {
            // Click on toggle
            toggle.addEventListener('click', function() {
                checkbox.checked = !checkbox.checked;
                toggleAccessibilityFeature(optionId, checkbox.checked);
            });
            
            // Click on label
            const label = checkbox.parentElement.querySelector('label');
            if (label) {
                label.addEventListener('click', function(e) {
                    if (e.target.tagName !== 'INPUT') {
                        checkbox.checked = !checkbox.checked;
                        toggleAccessibilityFeature(optionId, checkbox.checked);
                    }
                });
            }
            
            // Direct checkbox change
            checkbox.addEventListener('change', function() {
                toggleAccessibilityFeature(optionId, checkbox.checked);
            });
        }
    });
    
    // Reset all settings
    if (accessibilityReset) {
        accessibilityReset.addEventListener('click', function() {
            Object.keys(options).forEach(optionId => {
                const checkbox = document.getElementById(optionId);
                if (checkbox) {
                    checkbox.checked = false;
                    document.body.classList.remove(options[optionId]);
                }
            });
            localStorage.removeItem('accessibilitySettings');
            console.log('Accessibility settings reset');
        });
    }
    
    function toggleAccessibilityFeature(optionId, enabled) {
        const className = options[optionId];
        
        if (enabled) {
            document.body.classList.add(className);
        } else {
            document.body.classList.remove(className);
        }
        
        saveAccessibilitySettings();
        console.log(`${optionId}: ${enabled ? 'enabled' : 'disabled'}`);
    }
    
    function saveAccessibilitySettings() {
        const settings = {};
        Object.keys(options).forEach(optionId => {
            const checkbox = document.getElementById(optionId);
            if (checkbox) {
                settings[optionId] = checkbox.checked;
            }
        });
        localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
    }
    
    function loadAccessibilitySettings() {
        const saved = localStorage.getItem('accessibilitySettings');
        if (saved) {
            const settings = JSON.parse(saved);
            Object.keys(settings).forEach(optionId => {
                const checkbox = document.getElementById(optionId);
                if (checkbox && settings[optionId]) {
                    checkbox.checked = true;
                    document.body.classList.add(options[optionId]);
                }
            });
        }
    }
}

// Cookie Modal functionality
function initCookieBanner() {
    const cookieModal = document.getElementById('cookie-modal');
    const cookieSettingsBtn = document.getElementById('cookie-settings-btn');
    const cookieClose = document.getElementById('cookie-close');
    const cookieSave = document.getElementById('cookie-save');
    const cookieAcceptAll = document.getElementById('cookie-accept-all');
    
    const cookieNecessary = document.getElementById('cookie-necessary');
    const cookieFunctional = document.getElementById('cookie-functional');
    const cookieAnalytics = document.getElementById('cookie-analytics');
    
    if (!cookieModal) return;
    
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    if (!cookieConsent) {
        // Show modal after a short delay
        setTimeout(() => {
            showCookieModal();
        }, 1500);
    } else {
        // Show settings button if consent was given
        cookieSettingsBtn.classList.add('show');
        
        // Load saved preferences
        loadCookiePreferences();
    }
    
    // Open modal from settings button
    if (cookieSettingsBtn) {
        cookieSettingsBtn.addEventListener('click', function() {
            showCookieModal();
        });
    }
    
    // Close modal
    if (cookieClose) {
        cookieClose.addEventListener('click', function() {
            hideCookieModal();
        });
    }
    
    // Close modal when clicking outside
    cookieModal.addEventListener('click', function(e) {
        if (e.target === cookieModal) {
            hideCookieModal();
        }
    });
    
    // Save selected cookies
    if (cookieSave) {
        cookieSave.addEventListener('click', function() {
            saveCookiePreferences();
            hideCookieModal();
            cookieSettingsBtn.classList.add('show');
        });
    }
    
    // Accept all cookies
    if (cookieAcceptAll) {
        cookieAcceptAll.addEventListener('click', function() {
            cookieFunctional.checked = true;
            cookieAnalytics.checked = true;
            saveCookiePreferences();
            hideCookieModal();
            cookieSettingsBtn.classList.add('show');
        });
    }
    
    function showCookieModal() {
        cookieModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    function hideCookieModal() {
        cookieModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
    
    function saveCookiePreferences() {
        const preferences = {
            necessary: true, // Always true
            functional: cookieFunctional.checked,
            analytics: cookieAnalytics.checked,
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('cookieConsent', 'configured');
        localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
        
        console.log('Cookie preferences saved:', preferences);
    }
    
    function loadCookiePreferences() {
        const saved = localStorage.getItem('cookiePreferences');
        if (saved) {
            const preferences = JSON.parse(saved);
            cookieFunctional.checked = preferences.functional || false;
            cookieAnalytics.checked = preferences.analytics || false;
        }
    }
}
