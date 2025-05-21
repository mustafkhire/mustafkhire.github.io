// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Handle resume link click to open PDF in a new tab
document.addEventListener('DOMContentLoaded', function() {
    const resumeLink = document.getElementById('resume-link');
    
    // Add click event for opening the resume in a new tab
    if (resumeLink) {
        resumeLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.open('assets/Resume.pdf', '_blank');
        });
    }
    
    // Add scroll animation for section reveals
    const revealElements = document.querySelectorAll('.projects-section, .skills, .about, .contact');
    
    const revealOnScroll = function() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('revealed');
            }
        });
    };
    
    // Initial check on page load
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);
});