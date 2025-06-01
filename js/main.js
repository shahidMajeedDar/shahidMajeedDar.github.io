// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize smooth scrolling for all anchor links
  initSmoothScroll();
  
  // Initialize the navbar scrolling effects
  initNavbarEffects();
  
  // Initialize scroll animations
  initScrollAnimations();
  
  // Update copyright year
  updateCopyrightYear();
});

// Smooth scrolling for all anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Close mobile nav menu if open
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        if (navbarCollapse.classList.contains('show')) {
          navbarToggler.click();
        }
        
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Navbar effects when scrolling
function initNavbarEffects() {
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
    
    // Add active class to nav items based on scroll position
    highlightNavOnScroll();
  });
}

// Highlight the current section in the navbar
function highlightNavOnScroll() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

// Initialize scroll animations
function initScrollAnimations() {
  // Add fade-in class to elements to be animated
  document.querySelectorAll('.section-title, .timeline-item, .skill-category, .project-card, .publication-item')
    .forEach(element => {
      element.classList.add('fade-in');
    });
  
  // Check if elements are in viewport and add visible class
  checkVisibility();
  window.addEventListener('scroll', checkVisibility);
}

// Check if elements are visible in the viewport
function checkVisibility() {
  document.querySelectorAll('.fade-in').forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add('visible');
    }
  });
}

// Update copyright year
function updateCopyrightYear() {
  const copyrightYearElement = document.querySelector('footer p');
  if (copyrightYearElement) {
    const currentYear = new Date().getFullYear();
    copyrightYearElement.textContent = copyrightYearElement.textContent.replace(/\d{4}/, currentYear);
  }
}

// Dynamically load GitHub contributions
async function loadGitHubContributions() {
  try {
    // This would normally fetch data from the GitHub API
    // Since direct API calls might not be possible in this demo, we'll keep the static image
    console.log('GitHub contributions would be loaded here in a real implementation');
  } catch (error) {
    console.error('Error loading GitHub contributions:', error);
  }
}

// Type writer effect for the hero section (optional)
function initTypewriter() {
  const titles = ["AI Engineer", "ML & LLM Enthusiast", "FastAPI Developer"];
  const typewriterElement = document.querySelector('.typewriter');
  
  if (typewriterElement) {
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
      const currentTitle = titles[titleIndex];
      
      if (isDeleting) {
        // Deleting text
        typewriterElement.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
      } else {
        // Typing text
        typewriterElement.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
      }
      
      // If finished typing, start deleting
      if (!isDeleting && charIndex === currentTitle.length) {
        isDeleting = true;
        setTimeout(type, 1500); // Wait before deleting
      } 
      // If finished deleting, move to next title
      else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        setTimeout(type, 500); // Wait before typing new text
      } 
      // Otherwise continue at normal speed
      else {
        setTimeout(type, isDeleting ? 100 : 150);
      }
    }
    
    // Start the typewriter effect
    setTimeout(type, 1000);
  }
}

// Create project filter functionality if needed
function initProjectFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filterValue = button.getAttribute('data-filter');
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter projects
        projectCards.forEach(card => {
          if (filterValue === 'all') {
            card.style.display = 'block';
          } else if (!card.classList.contains(filterValue)) {
            card.style.display = 'none';
          } else {
            card.style.display = 'block';
          }
        });
      });
    });
  }
}
