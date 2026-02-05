// Hero Subtitle Rotation
const heroSubtitles = [
    '나에게 알맞는 창업 운영자금<br>어디에서 알아보나요?',
    '임대보증금 없이<br>창업 할 수 있을까요?',
    '여러분의 창업과 폐업을<br>지원합니다.',
    '폐업해야 하는데<br>철거는 어디에 맡겨야 되나요?'
];

let currentSubtitleIndex = 0;
const heroSubtitleElement = document.getElementById('hero-subtitle');

if (heroSubtitleElement) {
    // 초기 텍스트도 모바일용으로 설정
    if (window.innerWidth <= 768) {
        heroSubtitleElement.innerHTML = heroSubtitles[0];
    }
    
    setInterval(() => {
        // 페이드 아웃
        heroSubtitleElement.style.opacity = '0';
        heroSubtitleElement.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            // 다음 텍스트로 변경
            currentSubtitleIndex = (currentSubtitleIndex + 1) % heroSubtitles.length;
            heroSubtitleElement.innerHTML = heroSubtitles[currentSubtitleIndex];
            
            // 페이드 인
            heroSubtitleElement.style.opacity = '1';
            heroSubtitleElement.style.transform = 'translateY(0)';
        }, 300);
    }, 3000);
}

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');

if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const mobileNavLinks = mobileNav.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });
}

// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.icon-item, .partner-item, .cta-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add animation class
document.addEventListener('DOMContentLoaded', () => {
    // Add staggered animation delay to icon items
    document.querySelectorAll('.icon-item').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Add staggered animation delay to partner items
    document.querySelectorAll('.partner-item').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Add staggered animation delay to CTA cards
    document.querySelectorAll('.cta-card').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.15}s`;
    });
});

// Animation trigger
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Active navigation link based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});
