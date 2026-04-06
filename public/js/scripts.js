/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

document.addEventListener("DOMContentLoaded", function () {
  const searchToggle = document.getElementById("searchToggle");
  const searchDropdown = document.getElementById("searchDropdown");
  const searchBox = document.getElementById("searchBox");

  const langToggle = document.getElementById("langToggle");
  const langDropdown = document.getElementById("langDropdown");
  const langMenu = document.getElementById("langMenu");

  // Search
  if (searchToggle && searchDropdown && searchBox) {
    searchToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      searchDropdown.classList.toggle("active");
      if (langDropdown) langDropdown.classList.remove("active");
    });

    searchBox.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }

  // Language
  if (langToggle && langDropdown && langMenu) {
    langToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      langDropdown.classList.toggle("active");
      if (searchDropdown) searchDropdown.classList.remove("active");
    });

    langMenu.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }

  // Click outside closes both
  document.addEventListener("click", function () {
    if (searchDropdown) searchDropdown.classList.remove("active");
    if (langDropdown) langDropdown.classList.remove("active");
  });
});