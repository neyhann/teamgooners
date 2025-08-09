


// Enhanced Animation Functions
function animateOnScroll() {
   const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .bounce-in');
   
   const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
         if (entry.isIntersecting) {
            entry.target.classList.add('visible');
         }
      });
   }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
   });
   
   elements.forEach(element => {
      observer.observe(element);
   });
}

function addHoverEffects() {
   // Add floating animation to specific elements
   const floatElements = document.querySelectorAll('.courseSec, .subSec');
   floatElements.forEach(element => {
      element.classList.add('float');
   });
   
   // Add pulse animation to buttons
   const pulseElements = document.querySelectorAll('.coverDiv .mainDiv .mainSec>a');
   pulseElements.forEach(element => {
      element.classList.add('pulse');
   });
   
   // Add glow effect to navigation items
   const glowElements = document.querySelectorAll('.navItems span a');
   glowElements.forEach(element => {
      element.classList.add('glow');
   });
}

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', function() {
   // Initialize animations
   animateOnScroll();
   addHoverEffects();
   

});

var sidebar = document.getElementById("sidebar");
var sidebarControl = false;

function toggleSidebar(){
   if (!sidebarControl){
      sidebar.classList.add('open');
      sidebarControl = true;
   }else{
      sidebar.classList.remove('open');
      sidebarControl = false;
   }
}

// Video Modal controls
function openVideoModal() {
   const modal = document.getElementById('videoModal');
   const video = document.getElementById('modalVideo');
   
   if (!modal || !video) {
      console.error('Video modal elements not found!');
      return;
   }
   
   // Add lights-off effect to body
   document.body.classList.add('modal-open');
   
   // Show the modal
   modal.classList.add('show');
   
   // Set video source and load
   video.src = 'img/Uniglobe Walkthrough.mp4';
   video.load();
   
   // Auto-play video when modal opens
   setTimeout(() => {
      video.play().catch(e => console.log('Auto-play prevented:', e));
   }, 100);
   
   // Debug: Check if modal is visible
   console.log('Modal opened, checking visibility...');
   console.log('Modal display:', window.getComputedStyle(modal).display);
   console.log('Modal z-index:', window.getComputedStyle(modal).zIndex);
   console.log('Body has modal-open class:', document.body.classList.contains('modal-open'));
}

function closeVideoModal() {
   const modal = document.getElementById('videoModal');
   const video = document.getElementById('modalVideo');
   
   if (!modal) {
      return;
   }
   
   // Remove lights-off effect from body
   document.body.classList.remove('modal-open');
   
   // Hide the modal
   modal.classList.remove('show');
   
   if (video) {
      video.pause(); // Pause video when modal closes
   }
}

function testLightsOff() {
   console.log('Testing lights-off effect...');
   
   // Add lights-off effect
   document.body.classList.add('modal-open');
   
   // Show a simple test modal
   const testModal = document.createElement('div');
   testModal.innerHTML = `
      <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                  background: white; padding: 30px; border-radius: 10px; z-index: 10000;">
         <h3>Lights-Off Test</h3>
         <p>If you can see this clearly, the lights-off effect is working!</p>
         <button onclick="this.parentElement.parentElement.remove(); document.body.classList.remove('modal-open');">
            Close Test
         </button>
      </div>
   `;
   document.body.appendChild(testModal);
   
   // Auto-remove after 5 seconds
   setTimeout(() => {
      if (testModal.parentElement) {
         testModal.remove();
         document.body.classList.remove('modal-open');
      }
   }, 5000);
}

function toggleFullscreen() {
   const modal = document.getElementById('videoModal');
   const video = document.getElementById('modalVideo');
   const fullscreenBtn = document.querySelector('.fullscreen-btn i');
   
   if (!modal || !fullscreenBtn) {
      return;
   }
   
   if (!document.fullscreenElement) {
      // Enter fullscreen
      if (modal.requestFullscreen) {
         modal.requestFullscreen().then(() => {
            fullscreenBtn.className = 'fa-solid fa-compress';
         }).catch(err => {
            console.log('Fullscreen request failed:', err);
         });
      } else if (modal.webkitRequestFullscreen) {
         modal.webkitRequestFullscreen();
         fullscreenBtn.className = 'fa-solid fa-compress';
      } else if (modal.msRequestFullscreen) {
         modal.msRequestFullscreen();
         fullscreenBtn.className = 'fa-solid fa-compress';
      }
   } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
         document.exitFullscreen().then(() => {
            fullscreenBtn.className = 'fa-solid fa-expand';
         }).catch(err => {
            console.log('Exit fullscreen failed:', err);
         });
      } else if (document.webkitExitFullscreen) {
         document.webkitExitFullscreen();
         fullscreenBtn.className = 'fa-solid fa-expand';
      } else if (document.msExitFullscreen) {
         document.msExitFullscreen();
         fullscreenBtn.className = 'fa-solid fa-expand';
      }
   }
}



// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', function() {
   const modal = document.getElementById('videoModal');
   const fullscreenBtn = document.querySelector('.fullscreen-btn i');
   
   modal.addEventListener('click', function(e) {
      if (e.target === modal) {
         closeVideoModal();
      }
   });
   
   // Close modal with Escape key
   document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('show')) {
         closeVideoModal();
      }
   });
   
   // Handle fullscreen changes
   document.addEventListener('fullscreenchange', function() {
      const fullscreenBtn = document.querySelector('.fullscreen-btn i');
      if (fullscreenBtn) {
         if (!document.fullscreenElement) {
            fullscreenBtn.className = 'fa-solid fa-expand';
         } else {
            fullscreenBtn.className = 'fa-solid fa-compress';
         }
      }
   });
   
   document.addEventListener('webkitfullscreenchange', function() {
      const fullscreenBtn = document.querySelector('.fullscreen-btn i');
      if (fullscreenBtn) {
         if (!document.webkitFullscreenElement) {
            fullscreenBtn.className = 'fa-solid fa-expand';
         } else {
            fullscreenBtn.className = 'fa-solid fa-compress';
         }
      }
   });
   
   document.addEventListener('msfullscreenchange', function() {
      const fullscreenBtn = document.querySelector('.fullscreen-btn i');
      if (fullscreenBtn) {
         if (!document.msFullscreenElement) {
            fullscreenBtn.className = 'fa-solid fa-expand';
         } else {
            fullscreenBtn.className = 'fa-solid fa-compress';
         }
      }
   });
   
   // Close sidebar when clicking outside
   document.addEventListener('click', function(e) {
      if (sidebarControl && !sidebar.contains(e.target) && !document.getElementById('hamburgerIcon').contains(e.target)) {
         sidebar.classList.remove('open');
         sidebarControl = false;
      }
   });
   
   // Close sidebar when pressing Escape key
   document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && sidebarControl) {
         sidebar.classList.remove('open');
         sidebarControl = false;
      }
   });
   
   // Add smooth scrolling for FAQ details
   const faqDetails = document.querySelectorAll('.faq-list details');
   faqDetails.forEach(detail => {
      detail.addEventListener('toggle', function() {
         if (this.open) {
            this.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
         }
      });
   });
});


var firstComment = document.getElementById("firstComment");

// firstComment.style.marginLeft = "-50px";

function move(){

}

// Dark/Light Mode Toggle (removed since button was deleted)
// var themeToggle = document.getElementById("themeToggle");
// var isDarkMode = false;

// function toggleTheme() {
//     // Dark mode functionality removed
// }

// themeToggle.addEventListener("click", toggleTheme);

// Scroll Animation Observer
const observerOptions = {
   threshold: 0.1,
   rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
   entries.forEach(entry => {
      if (entry.isIntersecting) {
         entry.target.classList.add('visible');
      }
   });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', function() {
   const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
   animatedElements.forEach(el => {
      observer.observe(el);
   });
   
   // Prevent right-click context menu
   document.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      return false;
   });
   
   // Prevent keyboard shortcuts for saving images
            document.addEventListener('keydown', function(e) {
            // Prevent Ctrl+S (Save)
            if (e.ctrlKey && e.key === 's') {
               e.preventDefault();
               return false;
            }
            // Prevent Ctrl+Shift+I (Developer Tools)
            if (e.ctrlKey && e.shiftKey && e.key === 'I') {
               e.preventDefault();
               return false;
            }
            // Prevent F12 (Developer Tools)
            if (e.key === 'F12') {
               e.preventDefault();
               return false;
            }
         });
         
         // Function to scroll to top when logo is clicked
         function scrollToTop() {
            window.scrollTo({
               top: 0,
               behavior: 'smooth'
            });
         }
         
         // Testimonials Carousel Auto-Rotation
         // Initialize carousel when DOM is loaded
         function initializeCarousel() {
            console.log('Initializing testimonials carousel...');
            
            const testimonialCards = document.querySelectorAll('.testimonial-card');
            const indicators = document.querySelectorAll('.indicator');
            const carouselContainer = document.querySelector('.carousel-container');
            
            console.log('Found testimonial cards:', testimonialCards.length);
            console.log('Found indicators:', indicators.length);
            
            if (testimonialCards.length === 0) {
               console.error('No testimonial cards found!');
               return;
            }
            
            let currentSlide = 0;
            let interval;
            
            function showSlide(index) {
               console.log('Showing slide:', index);
               
               // Hide all cards
               testimonialCards.forEach(card => {
                  card.classList.remove('active');
               });
               
               // Remove active class from all indicators
               indicators.forEach(indicator => {
                  indicator.classList.remove('active');
               });
               
               // Show current card and activate indicator
               if (testimonialCards[index]) {
                  testimonialCards[index].classList.add('active');
               }
               if (indicators[index]) {
                  indicators[index].classList.add('active');
               }
            }
            
            function nextSlide() {
               currentSlide = (currentSlide + 1) % testimonialCards.length;
               showSlide(currentSlide);
            }
            
            function prevSlide() {
               currentSlide = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
               showSlide(currentSlide);
            }
            
            function startAutoRotation() {
               console.log('Starting auto rotation...');
               stopAutoRotation(); // Clear any existing interval
               interval = setInterval(nextSlide, 3000); // Change every 3 seconds
            }
            
            function stopAutoRotation() {
               if (interval) {
                  clearInterval(interval);
                  interval = null;
               }
            }
            
            // Initialize carousel
            showSlide(0);
            startAutoRotation();
            
            // Add click events to indicators
            indicators.forEach((indicator, index) => {
               indicator.addEventListener('click', () => {
                  console.log('Indicator clicked:', index);
                  currentSlide = index;
                  showSlide(currentSlide);
                  stopAutoRotation();
                  startAutoRotation(); // Restart timer
               });
            });
            
            // Pause auto-rotation on hover
            if (carouselContainer) {
               carouselContainer.addEventListener('mouseenter', () => {
                  console.log('Mouse entered carousel - pausing auto rotation');
                  stopAutoRotation();
               });
               carouselContainer.addEventListener('mouseleave', () => {
                  console.log('Mouse left carousel - resuming auto rotation');
                  startAutoRotation();
               });
            }
            
            // Make changeSlide function globally available
            window.changeSlide = function(direction) {
               console.log('changeSlide called with direction:', direction);
               if (direction === 1) {
                  nextSlide();
               } else {
                  prevSlide();
               }
               stopAutoRotation();
               startAutoRotation(); // Restart timer
            };
            
            // Add click event listeners to arrow buttons for extra reliability
            const prevBtn = document.querySelector('.prev-btn');
            const nextBtn = document.querySelector('.next-btn');
            
            if (prevBtn) {
               prevBtn.addEventListener('click', function(e) {
                  e.preventDefault();
                  console.log('Previous button clicked');
                  changeSlide(-1);
               });
            }
            
            if (nextBtn) {
               nextBtn.addEventListener('click', function(e) {
                  e.preventDefault();
                  console.log('Next button clicked');
                  changeSlide(1);
               });
            }
            
            // Add keyboard navigation
            document.addEventListener('keydown', function(e) {
               if (e.key === 'ArrowLeft') {
                  prevSlide();
                  stopAutoRotation();
                  startAutoRotation();
               } else if (e.key === 'ArrowRight') {
                  nextSlide();
                  stopAutoRotation();
                  startAutoRotation();
               }
            });
            
            // Add touch/swipe support for mobile
            let touchStartX = 0;
            let touchEndX = 0;
            
            if (carouselContainer) {
               carouselContainer.addEventListener('touchstart', function(e) {
                  touchStartX = e.changedTouches[0].screenX;
               });
               
               carouselContainer.addEventListener('touchend', function(e) {
                  touchEndX = e.changedTouches[0].screenX;
                  handleSwipe();
               });
            }
            
            function handleSwipe() {
               const swipeThreshold = 50;
               const diff = touchStartX - touchEndX;
               
               if (Math.abs(diff) > swipeThreshold) {
                  if (diff > 0) {
                     // Swipe left - next slide
                     nextSlide();
                  } else {
                     // Swipe right - previous slide
                     prevSlide();
                  }
                  stopAutoRotation();
                  startAutoRotation();
               }
            }
            
            console.log('Carousel initialization complete!');
         }
         
         // Call initializeCarousel when DOM is ready
         if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeCarousel);
         } else {
            initializeCarousel();
         }
         
         // Video error handling and button initialization
         document.addEventListener('DOMContentLoaded', function() {
            // Initialize video modal button with event listener
            const videoBtn = document.querySelector('.video-btn');
            if (videoBtn) {
               videoBtn.addEventListener('click', function(e) {
                  openVideoModal();
               });
            }
            
            // Initialize video elements with error handling
            const videos = document.querySelectorAll('video');
            videos.forEach(video => {
               video.addEventListener('error', function(e) {
                  console.error('Video loading error:', e);
                  // Show a fallback message
                  const errorMsg = document.createElement('div');
                  errorMsg.innerHTML = '<p style="color: #ff6b6b; text-align: center; padding: 20px;">Video could not be loaded. Please check the file path.</p>';
                  video.parentNode.insertBefore(errorMsg, video);
               });
            });
         });
   
   // Smooth scrolling for all navigation links
   const navLinks = document.querySelectorAll('.navItems a');
   console.log('Found navigation links:', navLinks.length); // Debug log
   navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
         console.log('Navigation link clicked:', this.getAttribute('href')); // Debug log
         e.preventDefault(); // Prevent default anchor behavior
         
         // Close sidebar if it's open
         if (sidebarControl) {
            sidebar.classList.remove('open');
            sidebarControl = false;
         }
         
         // Get the target section from href
         const targetId = this.getAttribute('href').substring(1);
         const targetSection = document.getElementById(targetId);
         
         console.log('Target section:', targetId, targetSection); // Debug log
         
         if (targetSection) {
            // Calculate offset for fixed header (80px height)
            const headerHeight = 80;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            // Smooth scroll to the target section with offset
            window.scrollTo({
               top: targetPosition,
               behavior: 'smooth'
            });
         }
      });
   });
   
   // Also handle any other anchor links with hash URLs
   const allAnchorLinks = document.querySelectorAll('a[href^="#"]');
   allAnchorLinks.forEach(link => {
      link.addEventListener('click', function(e) {
         const href = this.getAttribute('href');
         
         // Skip if it's just "#" (placeholder link)
         if (href === '#') {
            e.preventDefault();
            return;
         }
         
         const targetId = href.substring(1);
         const targetSection = document.getElementById(targetId);
         
         if (targetSection) {
            e.preventDefault();
            
            // Calculate offset for fixed header
            const headerHeight = 80;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            // Smooth scroll to the target section
            window.scrollTo({
               top: targetPosition,
               behavior: 'smooth'
            });
         }
      });
   });
});


