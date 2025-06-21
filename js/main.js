// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize smooth scrolling for all anchor links
  initSmoothScroll();
  
  // Initialize the navbar scrolling effects
  initNavbarEffects();
  
  // Initialize scroll animations with different animation types
  initScrollAnimations();
  
  // Initialize interactive cursor
  initInteractiveCursor();
  
  // Initialize scroll progress indicator
  initScrollIndicator();
  
  // Initialize skill progress bars
  initSkillProgressBars();
  
  // Add wave dividers between sections
  setTimeout(() => {
    addSectionDividers();
  }, 300);
  
  // Initialize typewriter effect for subtitle if present
  initTypewriter();
  
  // Initialize project filter if present
  initProjectFilter();
  
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

// Initialize scroll animations with different animation types
function initScrollAnimations() {
  // Apply different animation classes to different elements
  document.querySelectorAll('.section-title').forEach(element => {
    element.classList.add('bounce-in');
  });
  
  document.querySelectorAll('.skill-category').forEach((element, index) => {
    if (index % 2 === 0) {
      element.classList.add('slide-in-left');
    } else {
      element.classList.add('slide-in-right');
    }
  });
  
  document.querySelectorAll('.timeline-item').forEach(element => {
    element.classList.add('fade-in');
  });
  
  document.querySelectorAll('.project-card').forEach((element, index) => {
    // Alternate between different animation types
    if (index % 3 === 0) {
      element.classList.add('bounce-in');
    } else if (index % 3 === 1) {
      element.classList.add('slide-in-left');
    } else {
      element.classList.add('fade-in');
    }
  });
  
  document.querySelectorAll('.publication-item').forEach(element => {
    element.classList.add('slide-in-right');
  });
  
  // Check if elements are in viewport and add visible class
  checkVisibility();
  window.addEventListener('scroll', checkVisibility);
}

// Check if elements are visible in the viewport
function checkVisibility() {
  // Get all elements with animation classes
  const animatedElements = document.querySelectorAll('.fade-in, .bounce-in, .slide-in-left, .slide-in-right');
  
  animatedElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    // Add visible class with a slight delay for cascading effect
    if (elementTop < window.innerHeight - elementVisible) {
      // Add a small random delay for a more natural feel
      setTimeout(() => {
        element.classList.add('visible');
      }, Math.random() * 200); 
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

// Type writer effect for the hero section
function initTypewriter() {
  // Create a typewriter element if it doesn't exist
  let typewriterElement = document.querySelector('.typewriter');
  
  // If there's no .typewriter element, add it to the subtitle
  if (!typewriterElement) {
    const leadText = document.querySelector('.lead');
    if (leadText) {
      const originalText = leadText.textContent;
      leadText.innerHTML = "<span class='typewriter'></span>";
      typewriterElement = document.querySelector('.typewriter');
      
      // Extract skills from the original text
      const skills = originalText.split('|').map(skill => skill.trim());
      // If no skills were found, use default skills
      if (skills.length < 2) {
        skills.push("Applied Microeconomics", "Health and Family Economics", "Impact Evaluation of Public Policies", "Gender and Sanitation Economics");
      }
      
      let titleIndex = 0;
      let charIndex = 0;
      let isDeleting = false;
      
      function type() {
        const currentTitle = skills[titleIndex];
        
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
          titleIndex = (titleIndex + 1) % skills.length;
          setTimeout(type, 500); // Wait before typing new text
        } 
        // Otherwise continue at normal speed
        else {
          setTimeout(type, isDeleting ? 100 : 150);
        }
      }
      
      // Start the typewriter effect after a delay
      setTimeout(type, 1000);
    }
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

// Interactive cursor
function initInteractiveCursor() {
  // Create cursor element
  const cursor = document.createElement('div');
  cursor.classList.add('cursor-interactive');
  document.body.appendChild(cursor);
  
  // Update cursor position with mouse movement
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });
  
  // Scale cursor on hoverable elements
  const hoverables = document.querySelectorAll('a, button, .skill-category, .project-card, .timeline-item');
  hoverables.forEach(hoverable => {
    hoverable.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursor.style.borderColor = 'var(--secondary-color)';
      cursor.style.backgroundColor = 'rgba(93, 156, 236, 0.1)';
    });
    
    hoverable.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.borderColor = 'var(--primary-color)';
      cursor.style.backgroundColor = 'transparent';
    });
  });
  
  // Hide cursor when leaving window
  document.addEventListener('mouseout', (e) => {
    if (e.relatedTarget == null || e.relatedTarget.nodeName === 'HTML') {
      cursor.style.opacity = '0';
    }
  });
  
  document.addEventListener('mouseover', () => {
    cursor.style.opacity = '1';
  });
}

// Scroll progress indicator
function initScrollIndicator() {
  // Create scroll indicator element
  const scrollIndicator = document.createElement('div');
  scrollIndicator.classList.add('scroll-indicator');
  document.body.appendChild(scrollIndicator);
  
  // Update width on scroll
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollIndicator.style.width = scrolled + '%';
  });
}

// Initialize skill progress bars
function initSkillProgressBars() {
  // Get all skill lists
  const skillLists = document.querySelectorAll('.skill-list');
  
  skillLists.forEach(list => {
    // For each skill item
    const skills = list.querySelectorAll('li');
    skills.forEach((skill, index) => {
      // Create a progress bar
      const skillBar = document.createElement('div');
      skillBar.classList.add('skill-bar');
      
      const skillProgress = document.createElement('div');
      skillProgress.classList.add('skill-progress');
      
      // Random progress level for each skill between 70 and 95%
      // In a real application these would be actual values
      const progressLevel = Math.floor(Math.random() * 25) + 70;
      skillProgress.setAttribute('data-progress', progressLevel);
      
      // Append the progress bar and text
      skillBar.appendChild(skillProgress);
      
      // Replace the bullet point with a progress bar
      skill.appendChild(skillBar);
    });
  });
  
  // Function to animate progress bars when they come into view
  function animateProgressBars() {
    const progressBars = document.querySelectorAll('.skill-progress');
    
    progressBars.forEach(bar => {
      const rect = bar.getBoundingClientRect();
      
      if (rect.top < window.innerHeight - 100 && bar.style.width === '') {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
      }
    });
  }
  
  // Check on scroll
  window.addEventListener('scroll', animateProgressBars);
  // Initial check
  setTimeout(animateProgressBars, 500);
}

// Add wave dividers between sections
function addSectionDividers() {
  const sections = document.querySelectorAll('section');
  
  // Don't add to the last section
  for (let i = 0; i < sections.length - 1; i++) {
    const section = sections[i];
    const nextSection = sections[i + 1];
    
    // Only add dividers between sections with different backgrounds
    if (section.classList.contains('bg-light') !== nextSection.classList.contains('bg-light')) {
      const divider = document.createElement('div');
      divider.classList.add('section-divider');
      
      // Create SVG for wave effect
      divider.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,50 C150,100 350,0 500,50 C650,100 850,0 1000,50 C1150,100 1350,0 1440,50 L1440,100 L0,100 Z"></path>
        </svg>
      `;
      
      // Set appropriate fill color based on next section
      const svgPath = divider.querySelector('svg path');
      if (nextSection.classList.contains('bg-light')) {
        svgPath.setAttribute('fill', '#f8f9fa');
      } else {
        svgPath.setAttribute('fill', '#fff');
      }
      
      // Insert divider after current section
      section.after(divider);
    }
  }
}
