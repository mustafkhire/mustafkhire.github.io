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
            window.open('assets/resume.pdf', '_blank');
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

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Set loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    formStatus.textContent = 'Message sent successfully!';
                    formStatus.className = 'success';
                    contactForm.reset();
                } else {
                    throw new Error('Failed to send message');
                }
            } catch (error) {
                formStatus.textContent = 'Error sending message. Please try again.';
                formStatus.className = 'error';
                console.error('Form submission error:', error);
            } finally {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
                
                // Hide status message after 5 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            }
        });
    }
});