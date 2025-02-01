(function() {
  "use strict";

  // Ensure DOM is loaded before running the script
  document.addEventListener('DOMContentLoaded', function () {

    /**
     * Apply .scrolled class to the body as the page is scrolled down
     */
    function toggleScrolled() {
      const selectBody = document.querySelector('body');
      const selectHeader = document.querySelector('#header');
      if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
      if (window.scrollY > 100) {
        selectBody.classList.add('scrolled');
      } else {
        selectBody.classList.remove('scrolled');
      }
    }

    document.addEventListener('scroll', toggleScrolled);
    window.addEventListener('load', toggleScrolled);


    // Function to change the background color of the header on scroll
function changeHeaderBackground() {
  const header = document.getElementById('header');
  
  if (window.scrollY > 100) {
    // Change background color when the scroll position is greater than 100px
    header.style.backgroundColor = '#47b2e4'; // Change this to your desired color
  } else {
    // Reset the background color when the scroll position is less than 100px
    header.style.backgroundColor = 'transparent'; // Reset to default
  }
}



// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to light
const currentTheme = localStorage.getItem('theme') || 'light';
body.classList.toggle('dark-mode', currentTheme === 'dark');
updateButtonText();

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    updateButtonText();
});

function updateButtonText() {
    themeToggle.textContent = body.classList.contains('dark-mode') ? 'Toggle Light Mode' : 'Toggle Dark Mode';
}

// Header scroll effect
function toggleHeaderClass() {
    const header = document.querySelector('#header');
    if (window.scrollY > 100) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
}

window.addEventListener('load', toggleHeaderClass);
document.addEventListener('scroll', toggleHeaderClass);


    /**
     * Mobile nav toggle
     */
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
    if (mobileNavToggleBtn) {
      function mobileNavToogle() {
        document.querySelector('body').classList.toggle('mobile-nav-active');
        mobileNavToggleBtn.classList.toggle('bi-list');
        mobileNavToggleBtn.classList.toggle('bi-x');
      }
      mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
    }

    /**
     * Hide mobile nav on same-page/hash links
     */
    document.querySelectorAll('#navmenu a').forEach(navmenu => {
      navmenu.addEventListener('click', () => {
        if (document.querySelector('.mobile-nav-active')) {
          mobileNavToogle();
        }
      });
    });

    /**
     * Toggle mobile nav dropdowns
     */
    document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
      navmenu.addEventListener('click', function(e) {
        e.preventDefault();
        this.parentNode.classList.toggle('active');
        this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
        e.stopImmediatePropagation();
      });
    });

    /**
     * Preloader
     */
    const preloader = document.querySelector('#preloader');
    if (preloader) {
      window.addEventListener('load', () => {
        preloader.remove();
      });
    }

    /**
     * Scroll top button
     */
    let scrollTop = document.querySelector('.scroll-top');
    function toggleScrollTop() {
      if (scrollTop) {
        window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
      }
    }
    if (scrollTop) {
      scrollTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

    window.addEventListener('load', toggleScrollTop);
    document.addEventListener('scroll', toggleScrollTop);

    /**
     * Animation on scroll function and init
     */
    function aosInit() {
      // Check if AOS is loaded and ready
      if (typeof AOS !== 'undefined') {
        AOS.init({
          duration: 100,
          easing: 'ease-in-out',
          once: true,
          mirror: false
        });
      }
    }
    
    // Ensure AOS is initialized only after all resources have been loaded
    window.addEventListener('load', function() {
      // Adding a slight delay to make sure everything is loaded
      setTimeout(aosInit, 100); 
    });
    

    /**
     * Initiate glightbox
     */
    const glightbox = GLightbox({
      selector: '.glightbox'
    });

    /**
     * Init swiper sliders
     */
    function initSwiper() {
      document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
        let config = JSON.parse(
          swiperElement.querySelector(".swiper-config").innerHTML.trim()
        );

        if (swiperElement.classList.contains("swiper-tab")) {
          initSwiperWithCustomPagination(swiperElement, config);
        } else {
          new Swiper(swiperElement, config);
        }
      });
    }

    window.addEventListener("load", initSwiper);




    const multipleItemCarousel = document.querySelector("#carouselExampleControls");

    if (window.matchMedia("(min-width:576px)").matches) {
      const carousel = new bootstrap.Carousel(multipleItemCarousel, {
        interval: false
      });
    
      var carouselWidth = $(".carousel-inner")[0].scrollWidth;
      var cardWidth = $(".carousel-item").width();
    
      var scrollPosition = 0;
    
      $(".carousel-control-next").on("click", function () {
        if (scrollPosition < carouselWidth - cardWidth * 4) {
          scrollPosition = scrollPosition + cardWidth;
          $(".carousel-inner").animate({ scrollLeft: scrollPosition }, 600);
        }
      });
      $(".carousel-control-prev").on("click", function () {
        if (scrollPosition > 0) {
          scrollPosition = scrollPosition - cardWidth;
          $(".carousel-inner").animate({ scrollLeft: scrollPosition }, 600);
        }
      });
    } else {
      $(multipleItemCarousel).addClass("slide");
    }



    
    /**
     * Frequently Asked Questions Toggle
     */
    
    
    /**
     * Init isotope layout and filters
     */
    document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
      let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
      let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
      let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

      let initIsotope;
      imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
        initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
          itemSelector: '.isotope-item',
          layoutMode: layout,
          filter: filter,
          sortBy: sort
        });
      });

      isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
        filters.addEventListener('click', function() {
          isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          initIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof aosInit === 'function') {
            aosInit();
          }
        }, false);
      });

    });
    document.addEventListener('DOMContentLoaded', function () {
      var swiper = new Swiper('.init-swiper', {
        loop: true,  // Loop through the slides
        speed: 600,  // Transition speed in ms
        autoplay: {
          delay: 5000,  // Delay between each slide in ms
          disableOnInteraction: false,  // Keeps autoplay running even if the user interacts with the slider
        },
        slidesPerView: 'auto',  // Adjusts the number of slides visible at a time based on screen size
        pagination: {
          el: '.swiper-pagination',  // Pagination element
          type: 'bullets',  // Pagination type (bullets)
          clickable: true,  // Makes the pagination clickable
        },
      });
    });
    

    /**
     * Correct scrolling position upon page load for URLs containing hash links.
     */
    window.addEventListener('load', function(e) {
      if (window.location.hash) {
        if (document.querySelector(window.location.hash)) {
          setTimeout(() => {
            let section = document.querySelector(window.location.hash);
            let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
            window.scrollTo({
              top: section.offsetTop - parseInt(scrollMarginTop),
              behavior: 'smooth'
            });
          }, 100);
        }
      }
    });

    /**
     * Navmenu Scrollspy
     */
    let navmenulinks = document.querySelectorAll('.navmenu a');

    function navmenuScrollspy() {
      navmenulinks.forEach(navmenulink => {
        if (!navmenulink.hash) return;
        let section = document.querySelector(navmenulink.hash);
        if (!section) return;
        let position = window.scrollY + 200;
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
          navmenulink.classList.add('active');
        } else {
          navmenulink.classList.remove('active');
        }
      })
    }

    window.addEventListener('load', navmenuScrollspy);
    document.addEventListener('scroll', navmenuScrollspy);

  });
  document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section[id]")
    const navLinks = document.querySelectorAll("#navmenu ul li a")
  
    function highlightNavOnScroll() {
      const scrollPosition = window.scrollY
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150 // Adjust this value based on your header height
        const sectionHeight = section.offsetHeight
        const sectionId = section.getAttribute("id")
  
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLinks.forEach((link) => {
            link.classList.remove("active")
            if (link.getAttribute("href") === `#${sectionId}`) {
              link.classList.add("active")
            }
          })
        }
      })
    }
  
    window.addEventListener("scroll", highlightNavOnScroll)
    highlightNavOnScroll() // Call once to set initial state
  })
  
  // Ensure Isotope is initialized when the DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  var iso = new Isotope('.isotope-container', {
    itemSelector: '.portfolio-item',
    layoutMode: 'masonry',
    filter: '*' // Default filter is all
  });

  // Filter items when a filter button is clicked
  const filters = document.querySelectorAll('.portfolio-filters li');
  filters.forEach(filter => {
    filter.addEventListener('click', function () {
      // Remove 'filter-active' class from all filters
      filters.forEach(f => f.classList.remove('filter-active'));
      // Add 'filter-active' class to the clicked filter
      filter.classList.add('filter-active');
      
      // Get the filter value and apply it to Isotope
      var filterValue = filter.getAttribute('data-filter');
      iso.arrange({ filter: filterValue });
    });
  });
});


// FAQ
document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-new");
  console.log(faqItems)

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    console.log(question)

    // Add event listener to each question
    question.addEventListener("click", function () {
      const isActive = item.classList.contains("faq-active");

      // Close all FAQ items
      faqItems.forEach((faq) => {
        faq.classList.remove("faq-active");
        faq.querySelector(".faq-content").style.display = "none";
      });

      // Toggle the clicked item
      if (!isActive) {
        item.classList.add("faq-active");
        item.querySelector(".faq-content").style.display = "block"; // Show content
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const faqContainer = document.querySelector(".faq-container");

  faqContainer.addEventListener("click", function (event) {
    console.log('hello')
    // Check if the clicked element is either a question or toggle icon
    const faqItem = event.target.closest(".faq-item");
    
    if (faqItem) {
      const content = faqItem.querySelector(".faq-content");
      const isActive = faqItem.classList.contains("faq-active");

      // Close all FAQ items
      const allFaqItems = document.querySelectorAll(".faq-item");
      allFaqItems.forEach((item) => {
        item.classList.remove("faq-active");
        item.querySelector(".faq-content").style.display = "none";
      });

      // Toggle the clicked item
      if (!isActive) {
        faqItem.classList.add("faq-active");
        content.style.display = "block"; // Show content
      }
    }
  });
});




})();
