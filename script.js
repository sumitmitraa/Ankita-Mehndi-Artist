// Loading Screen
window.addEventListener('load', function() {
    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 2000);
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

mobileMenuBtn.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    this.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
});

// Close mobile menu when clicking on links
navMenu.addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
        navMenu.classList.remove('active');
        mobileMenuBtn.textContent = '☰';
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }

    // Header background change
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'linear-gradient(135deg, rgba(74, 29, 29, 0.95), rgba(107, 43, 43, 0.95))';
    } else {
        header.style.background = 'linear-gradient(135deg, var(--royal-maroon), var(--light-maroon))';
    }
});

scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Fade In Animation on Scroll
function fadeInOnScroll() {
    const elements = document.querySelectorAll('.service-card, .gallery-item, .testimonial-card, .feature-item, .process-step');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('fade-in');
        }
    });
}

window.addEventListener('scroll', fadeInOnScroll);

// Contact Form Handling with EmailJS
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const service = formData.get('service');

    // Simple form validation
    if (!name || !phone || !service) {
        alert('कृपया सभी आवश्यक फील्ड भरें। (Please fill all required fields.)');
        return;
    }

    // Phone validation
    const phoneRegex = /^[6-9]\d{9}$/;
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10 || !phoneRegex.test(cleanPhone)) {
        alert('कृपया वैध फोन नंबर डालें। (Please enter a valid phone number.)');
        return;
    }

    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending... 📤';
    submitBtn.disabled = true;

    // Send email using EmailJS
    emailjs.sendForm("service_gz3bs5e", "template_28zg9p7", this)
        .then(() => {
            alert(`🎉 धन्यवाद ${name}! 🎉\n\nआपका बुकिंग रिक्वेस्ट सफलतापूर्वक भेजा गया है। हम 2 घंटे के अंदर आपसे संपर्क करेंगे।\n\nThank you ${name}! Your booking request has been sent successfully. We will contact you within 2 hours.\n\n📱 For urgent bookings, WhatsApp us directly!`);

            // Reset form
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        })
        .catch((error) => {
            console.error("EmailJS Error:", error);
            alert("❌ कुछ गलत हुआ! कृपया बाद में पुनः प्रयास करें। (Something went wrong, please try again later.)");
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        
        // Create sparkle effect
        for (let i = 0; i < 10; i++) {
            setTimeout(() => createSparkle(), i * 100);
        }
    }, 1500);
});

// Gallery Item Click Effect
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        }, 100);
    });
});

// Auto-scroll testimonials on mobile
function autoScrollTestimonials() {
    const slider = document.getElementById('testimonialSlider');
    if (window.innerWidth <= 768) {
        let scrollAmount = 0;
        const scrollSpeed = 1;
        
        setInterval(() => {
            scrollAmount += scrollSpeed;
            if (scrollAmount >= slider.scrollWidth - slider.clientWidth) {
                scrollAmount = 0;
            }
            slider.scrollLeft = scrollAmount;
        }, 50);
    }
}

// Initialize auto-scroll after delay
setTimeout(autoScrollTestimonials, 3000);

// Hover effects for service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.service-icon');
        icon.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.service-icon');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Dynamic greeting based on time
function updateGreeting() {
    const hour = new Date().getHours();
    let greeting;
    
    if (hour < 12) {
        greeting = "सुप्रभात! Good Morning!";
    } else if (hour < 17) {
        greeting = "नमस्ते! Good Afternoon!";
    } else {
        greeting = "शुभ संध्या! Good Evening!";
    }
    
    // Update hero subtitle with greeting
    setTimeout(() => {
        const subtitle = document.querySelector('.hero-subtitle');
        subtitle.textContent = greeting + " • Traditional Excellence • Modern Elegance";
    }, 2500);
}

updateGreeting();

// Add sparkle effects
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.left = Math.random() * window.innerWidth + 'px';
    sparkle.style.top = Math.random() * window.innerHeight + 'px';
    sparkle.style.width = '4px';
    sparkle.style.height = '4px';
    sparkle.style.background = 'var(--gold)';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9999';
    sparkle.style.animation = 'sparkleAnimation 2s ease-out forwards';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 2000);
}

// Add sparkle effect CSS
const sparkleCSS = `
    @keyframes sparkleAnimation {
        0% {
            opacity: 1;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
`;

const style = document.createElement('style');
style.textContent = sparkleCSS;
document.head.appendChild(style);

// Trigger sparkles on button clicks
document.querySelectorAll('.btn-primary, .btn-secondary, .book-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => createSparkle(), i * 100);
        }
    });
});

// Service card click to contact
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function() {
        const serviceName = this.querySelector('h3').textContent;
        const contactSection = document.getElementById('contact');
        const serviceSelect = document.getElementById('service');
        
        // Scroll to contact
        contactSection.scrollIntoView({ behavior: 'smooth' });
        
        // Pre-select service
        setTimeout(() => {
            const options = serviceSelect.options;
            for (let i = 0; i < options.length; i++) {
                if (options[i].text.includes(serviceName.split(' ')[0])) {
                    serviceSelect.selectedIndex = i;
                    break;
                }
            }
        }, 800);
    });
});

// Form field animations
document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(field => {
    field.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    field.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Auto-set minimum date to today
const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

// Add floating elements for decoration
function createFloatingElement() {
    const element = document.createElement('div');
    element.style.position = 'fixed';
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = window.innerHeight + 'px';
    element.style.fontSize = '1.5rem';
    element.style.opacity = '0.1';
    element.style.pointerEvents = 'none';
    element.style.zIndex = '1';
    element.textContent = ['🌸', '🌺', '✨', '🎨', '💫'][Math.floor(Math.random() * 5)];
    element.style.animation = 'floatUp 10s linear forwards';
    
    document.body.appendChild(element);
    
    setTimeout(() => {
        element.remove();
    }, 10000);
}

// Add floating animation CSS
const floatingCSS = `
    @keyframes floatUp {
        to {
            transform: translateY(-${window.innerHeight + 100}px) rotate(360deg);
            opacity: 0;
        }
    }
`;

const floatingStyle = document.createElement('style');
floatingStyle.textContent = floatingCSS;
document.head.appendChild(floatingStyle);

// Create floating elements occasionally
setInterval(createFloatingElement, 5000);

// Initialize animations
setTimeout(() => {
    fadeInOnScroll();
}, 100);

// Add entrance animations with delay
setTimeout(() => {
    document.querySelectorAll('.service-card').forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }, index * 100);
    });
}, 1000);

// Performance optimization for mobile
let ticking = false;
function handleScroll() {
    if (!ticking) {
        requestAnimationFrame(() => {
            fadeInOnScroll();
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', handleScroll, { passive: true });

// Add click feedback for all interactive elements
document.querySelectorAll('button, .service-card, .gallery-item, .social-link').forEach(element => {
    element.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// Lazy loading for better performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements for lazy loading
setTimeout(() => {
    document.querySelectorAll('.service-card, .feature-item, .process-step, .gallery-item').forEach(el => {
        observer.observe(el);
    });
}, 2000);

// Add typing effect for hero title (optional)
function typeWriter() {
    const text = "Royal Mehndi Artistry";
    const heroTitle = document.querySelector('.hero-content h1');
    let i = 0;
    
    heroTitle.textContent = '';
    
    function type() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    }
    
    setTimeout(type, 2500);
}

// Uncomment to enable typing effect
// typeWriter();

// Add success animation for form submission
function showSuccessAnimation() {
    const successDiv = document.createElement('div');
    successDiv.style.position = 'fixed';
    successDiv.style.top = '50%';
    successDiv.style.left = '50%';
    successDiv.style.transform = 'translate(-50%, -50%)';
    successDiv.style.background = 'var(--royal-maroon)';
    successDiv.style.color = 'var(--gold)';
    successDiv.style.padding = '2rem';
    successDiv.style.borderRadius = '20px';
    successDiv.style.textAlign = 'center';
    successDiv.style.zIndex = '10000';
    successDiv.style.animation = 'fadeInUp 0.5s ease-out';
    successDiv.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 1rem;">🎉</div>
        <div style="font-family: 'Playfair Display', serif; font-size: 1.5rem;">
            Booking Request Sent!
        </div>
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Enhanced form submission with better UX
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Sending... 📤';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showSuccessAnimation();
        this.reset();
        submitBtn.textContent = 'Send Booking Request 📱';
        submitBtn.disabled = false;
    }, 1500);
});

// Add dynamic current year
document.addEventListener('DOMContentLoaded', function() {
    const currentYear = new Date().getFullYear();
    const footerText = document.querySelector('.footer-bottom p');
    if (footerText) {
        footerText.innerHTML = footerText.innerHTML.replace('2025', currentYear);
    }
});

// Add click-to-call functionality for phone numbers
document.querySelectorAll('.contact-item').forEach(item => {
    const phoneText = item.querySelector('p');
    if (phoneText && phoneText.textContent.includes('+91')) {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            const phone = phoneText.textContent.replace(/\s/g, '');
            window.open(`tel:${phone}`, '_self');
        });
    }
});

// Initialize everything after page load
window.addEventListener('load', function() {
    // Pre-load critical images (if you had real images)
    // const imageUrls = ['image1.jpg', 'image2.jpg'];
    // imageUrls.forEach(url => {
    //     const img = new Image();
    //     img.src = url;
    // });
    
    console.log('🎨 Ankita Mehndi Arts Website Loaded Successfully!');
    console.log('📱 Ready to accept bookings!');
});