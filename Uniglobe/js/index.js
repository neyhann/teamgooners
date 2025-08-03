
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
   modal.classList.add('show');
   document.body.style.overflow = 'hidden'; // Prevent background scrolling
   
   // Add lights-off effect
   document.body.style.filter = 'brightness(0.3)';
   
   // Auto-play video when modal opens
   setTimeout(() => {
      video.play().catch(e => console.log('Auto-play prevented'));
   }, 100);
}

function closeVideoModal() {
   const modal = document.getElementById('videoModal');
   const video = document.getElementById('modalVideo');
   modal.classList.remove('show');
   document.body.style.overflow = 'auto'; // Restore scrolling
   document.body.style.filter = 'none'; // Remove lights-off effect
   video.pause(); // Pause video when modal closes
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', function() {
   const modal = document.getElementById('videoModal');
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
         document.addEventListener('DOMContentLoaded', function() {
            const testimonialCards = document.querySelectorAll('.testimonial-card');
            const indicators = document.querySelectorAll('.indicator');
            let currentSlide = 0;
            let interval;
            
            function showSlide(index) {
               // Hide all cards
               testimonialCards.forEach(card => {
                  card.classList.remove('active');
               });
               
               // Remove active class from all indicators
               indicators.forEach(indicator => {
                  indicator.classList.remove('active');
               });
               
               // Show current card and activate indicator
               testimonialCards[index].classList.add('active');
               indicators[index].classList.add('active');
            }
            
            function nextSlide() {
               currentSlide = (currentSlide + 1) % testimonialCards.length;
               showSlide(currentSlide);
            }
            
            function startAutoRotation() {
               interval = setInterval(nextSlide, 3000); // Change every 3 seconds
            }
            
            function stopAutoRotation() {
               clearInterval(interval);
            }
            
            // Initialize carousel
            showSlide(0);
            startAutoRotation();
            
            // Add click events to indicators
            indicators.forEach((indicator, index) => {
               indicator.addEventListener('click', () => {
                  currentSlide = index;
                  showSlide(currentSlide);
                  stopAutoRotation();
                  startAutoRotation(); // Restart timer
               });
            });
            
            // Pause auto-rotation on hover
            const carouselContainer = document.querySelector('.carousel-container');
            if (carouselContainer) {
               carouselContainer.addEventListener('mouseenter', stopAutoRotation);
               carouselContainer.addEventListener('mouseleave', startAutoRotation);
            }
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
