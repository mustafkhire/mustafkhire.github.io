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

    // Enhanced Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Set loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="btn-text">Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
            formStatus.style.display = 'none';
            
            try {
                // First validate the form
                if (!contactForm.checkValidity()) {
                    throw new Error('Please fill all required fields');
                }

                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                const responseData = await response.json();
                
                if (response.ok && responseData.success) {
                    formStatus.textContent = 'Message sent successfully!';
                    formStatus.className = 'success';
                    formStatus.style.display = 'block';
                    contactForm.reset();
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        formStatus.style.display = 'none';
                    }, 5000);
                } else {
                    throw new Error(responseData.error || 'Failed to send message');
                }
            } catch (error) {
                formStatus.textContent = error.message || 'Error sending message. Please try again.';
                formStatus.className = 'error';
                formStatus.style.display = 'block';
                console.error('Form submission error:', error);
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span class="btn-text">Send Message</span>';
            }
        });
    }
});