
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
   
   // Close sidebar when navigation links are clicked
   const navLinks = document.querySelectorAll('.navItems a');
   navLinks.forEach(link => {
      link.addEventListener('click', function() {
         // Close sidebar if it's open
         if (sidebarControl) {
            sidebar.classList.remove('open');
            sidebarControl = false;
         }
      });
   });
});
