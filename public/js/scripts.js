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

    // Shrink the navbar (deferred to avoid forced reflow on load)
    requestAnimationFrame(navbarShrink);

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
    // Skip: dropdown toggles, language button, search button
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (responsiveNavItem.classList.contains('dropdown-toggle')) return;
            if (responsiveNavItem.classList.contains('lang-btn')) return;
            if (responsiveNavItem.classList.contains('nav-icon-btn')) return;
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

// ===== LANG + SEARCH DROPDOWNS =====
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
      if (searchDropdown.classList.contains("active")) {
        const input = searchBox.querySelector("input");
        if (input) setTimeout(() => input.focus(), 50);
      }
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

// ===== PRODUCT SEARCH =====
(function () {
  var PRODUCTS = {
    en: [
      { name: 'ST-G Series Intelligent Ion Rod', url: '/products/static-eliminator/st-g-series', cat: 'Static Eliminator' },
      { name: 'ST-E Series Intelligent Ion Rod', url: '/products/static-eliminator/st-e-series', cat: 'Static Eliminator' },
      { name: 'ST-F Series Intelligent Ion Rod', url: '/products/static-eliminator/st-f-series', cat: 'Static Eliminator' },
      { name: 'ST-S200 Mini Ionizer Fan', url: '/products/static-eliminator/st-s200', cat: 'Static Eliminator' },
      { name: 'ST101A Table Ionizing Air Blower', url: '/products/static-eliminator/st-101a', cat: 'Static Eliminator' },
      { name: 'ST104A Horizontal Ion Blower', url: '/products/static-eliminator/st-104a', cat: 'Static Eliminator' },
      { name: 'ST1200 Horizontal Ion Fan', url: '/products/static-eliminator/st-1200', cat: 'Static Eliminator' },
      { name: 'Polarizer Precision Cleaning Machine', url: '/products/cleaning-machine/polarizer-cleaner', cat: 'Cleaning Machine' },
      { name: 'FPC 4-Axis Cleaning Machine', url: '/products/cleaning-machine/fpc-4-axis-cleaner', cat: 'Cleaning Machine' },
      { name: 'FPC 8-Axis Cleaning Machine', url: '/products/cleaning-machine/fpc-8-axis-cleaner', cat: 'Cleaning Machine' },
      { name: 'Optical Film Cleaning Machine', url: '/products/cleaning-machine/optical-film-cleaner', cat: 'Cleaning Machine' },
      { name: 'LCM Module Industrial Cleaning Machine', url: '/products/cleaning-machine/lcm-cleaner', cat: 'Cleaning Machine' },
      { name: 'PCB Surface Cleaning Machine', url: '/products/cleaning-machine/pcb-cleaner', cat: 'Cleaning Machine' },
      { name: 'PCB Vertical Cleaning System', url: '/products/cleaning-machine/pcb-vertical-cleaner', cat: 'Cleaning Machine' },
      { name: 'Roll Chip Universal Cleaning Machine', url: '/products/cleaning-machine/roll-chip-cleaner', cat: 'Cleaning Machine' },
      { name: 'SMT Inline Cleaning Machine', url: '/products/cleaning-machine/smt-cleaner', cat: 'Cleaning Machine' },
      { name: 'Backlight Panel Cleaning Machine', url: '/products/cleaning-machine/backlight-cleaner', cat: 'Cleaning Machine' },
      { name: 'CCL Cleaning Machine ST DT1340', url: '/products/cleaning-machine/ccl-cleaner', cat: 'Cleaning Machine' },
      { name: 'Inspection Table Cleaning Machine', url: '/products/cleaning-machine/inspection-cleaner', cat: 'Cleaning Machine' },
      { name: 'Custom Precision Machined Parts', url: '/products/precision-machined-parts/custom-precision-machined-parts', cat: 'Precision Parts' },
      { name: 'CNC-Milled Front Panel Rubber Roller Assembly', url: '/products/precision-machined-parts/cnc-milled-front-panel-rubber-roller-assembly', cat: 'Precision Parts' },
      { name: 'CNC-Milled Wing Connection Block', url: '/products/precision-machined-parts/cnc-wing-connection-block', cat: 'Precision Parts' },
      { name: 'Lathe-Machined Bearing Outer Retainer Plate', url: '/products/precision-machined-parts/lathe-machined-bearing-outer-retainer-plate', cat: 'Precision Parts' },
      { name: 'Lathe-Machined Shaft End Fixing Component', url: '/products/precision-machined-parts/lathe-machined-shaft-end-fixing-component', cat: 'Precision Parts' },
      { name: 'Milled Front Inner Fixing Plate Paper Roll Guide Rail', url: '/products/precision-machined-parts/milled-front-inner-fixing-plate-paper-roll-guide-rail', cat: 'Precision Parts' },
      { name: 'Precision Bearing Bracket CNC Milled', url: '/products/precision-machined-parts/precision-bearing-bracket-cnc-milled', cat: 'Precision Parts' },
      { name: 'Diffuser Cleaning Inspection Line', url: '/products/automation/product-a', cat: 'Automation' },
      { name: 'Robot Auto Loading Cleaning Machine', url: '/products/automation/product-b', cat: 'Automation' },
      { name: 'Polarizer Absorption Axis Angle Meter', url: '/products/automation/product-c', cat: 'Automation' },
    ],
    zh: [
      { name: 'ST-G 系列智能静电消除棒', url: '/zh/products/static-eliminator/st-g-series', cat: '静电消除' },
      { name: 'ST-E 系列智能离子棒', url: '/zh/products/static-eliminator/st-e-series', cat: '静电消除' },
      { name: 'ST-F 系列智能离子棒', url: '/zh/products/static-eliminator/st-f-series', cat: '静电消除' },
      { name: 'ST-S200 迷你离子风机', url: '/zh/products/static-eliminator/st-s200', cat: '静电消除' },
      { name: 'ST101A 台式离子鼓风机', url: '/zh/products/static-eliminator/st-101a', cat: '静电消除' },
      { name: 'ST104A 卧式离子鼓风机', url: '/zh/products/static-eliminator/st-104a', cat: '静电消除' },
      { name: 'ST1200 卧式离子风机', url: '/zh/products/static-eliminator/st-1200', cat: '静电消除' },
      { name: '偏光片精密清洁机', url: '/zh/products/cleaning-machine/polarizer-cleaner', cat: '清洁机' },
      { name: 'FPC四轴高精度清洁机', url: '/zh/products/cleaning-machine/fpc-4-axis-cleaner', cat: '清洁机' },
      { name: 'FPC八轴高端清洁机', url: '/zh/products/cleaning-machine/fpc-8-axis-cleaner', cat: '清洁机' },
      { name: '大尺寸光学薄膜清洁机', url: '/zh/products/cleaning-machine/optical-film-cleaner', cat: '清洁机' },
      { name: 'LCM模组工业清洁机', url: '/zh/products/cleaning-machine/lcm-cleaner', cat: '清洁机' },
      { name: 'PCB表面清洁机', url: '/zh/products/cleaning-machine/pcb-cleaner', cat: '清洁机' },
      { name: 'PCB垂直清洁系统', url: '/zh/products/cleaning-machine/pcb-vertical-cleaner', cat: '清洁机' },
      { name: '滚轮通用清洁机', url: '/zh/products/cleaning-machine/roll-chip-cleaner', cat: '清洁机' },
      { name: 'SMT在线清洁机', url: '/zh/products/cleaning-machine/smt-cleaner', cat: '清洁机' },
      { name: '背光板清洁机', url: '/zh/products/cleaning-machine/backlight-cleaner', cat: '清洁机' },
      { name: '史帝克CCL清洁机 ST DT1340', url: '/zh/products/cleaning-machine/ccl-cleaner', cat: '清洁机' },
      { name: '检验台清洁机', url: '/zh/products/cleaning-machine/inspection-cleaner', cat: '清洁机' },
      { name: '定制精密加工零件', url: '/zh/products/precision-machined-parts/custom-precision-machined-parts', cat: '精密零件' },
      { name: 'CNC铣削前面板橡胶辊组件', url: '/zh/products/precision-machined-parts/cnc-milled-front-panel-rubber-roller-assembly', cat: '精密零件' },
      { name: 'CNC翼型连接块', url: '/zh/products/precision-machined-parts/cnc-wing-connection-block', cat: '精密零件' },
      { name: '车床加工轴承外圆固定板', url: '/zh/products/precision-machined-parts/lathe-machined-bearing-outer-retainer-plate', cat: '精密零件' },
      { name: '车床加工轴端固定件', url: '/zh/products/precision-machined-parts/lathe-machined-shaft-end-fixing-component', cat: '精密零件' },
      { name: '铣削前内固定板纸卷导轨', url: '/zh/products/precision-machined-parts/milled-front-inner-fixing-plate-paper-roll-guide-rail', cat: '精密零件' },
      { name: '精密轴承支架（CNC铣削）', url: '/zh/products/precision-machined-parts/precision-bearing-bracket-cnc-milled', cat: '精密零件' },
      { name: '扩散板清洗检验生产线', url: '/zh/products/automation/product-a', cat: '自动化设备' },
      { name: '机器人自动上下料清洗机', url: '/zh/products/automation/product-b', cat: '自动化设备' },
      { name: '偏光片吸收轴角度测量仪', url: '/zh/products/automation/product-c', cat: '自动化设备' },
    ]
  };

  document.addEventListener('DOMContentLoaded', function () {
    var isZh = window.location.pathname.startsWith('/zh');
    var data = isZh ? PRODUCTS.zh : PRODUCTS.en;
    var placeholder = isZh ? '搜索产品...' : 'Search products...';
    var noResult = isZh ? '未找到相关产品' : 'No products found';

    var searchBox = document.getElementById('searchBox');
    if (!searchBox) return;

    // Add id to input and inject results container
    var input = searchBox.querySelector('input');
    if (!input) return;
    input.id = 'searchInput';
    input.placeholder = placeholder;
    input.setAttribute('autocomplete', 'off');

    var results = document.createElement('ul');
    results.id = 'searchResults';
    results.className = 'search-results';
    searchBox.appendChild(results);

    function renderResults(q) {
      results.innerHTML = '';
      if (!q) { results.style.display = 'none'; return; }
      var matches = data.filter(function (p) {
        return p.name.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q);
      }).slice(0, 8);

      if (matches.length === 0) {
        results.innerHTML = '<li class="search-no-result">' + noResult + '</li>';
      } else {
        matches.forEach(function (p) {
          var li = document.createElement('li');
          li.innerHTML =
            '<a href="' + p.url + '">' +
              '<span class="sr-name">' + p.name + '</span>' +
              '<span class="sr-cat">' + p.cat + '</span>' +
            '</a>';
          results.appendChild(li);
        });
      }
      results.style.display = 'block';
    }

    input.addEventListener('input', function () {
      renderResults(this.value.toLowerCase().trim());
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        var first = results.querySelector('a');
        if (first) window.location.href = first.href;
      }
      if (e.key === 'Escape') {
        results.style.display = 'none';
        var searchDropdown = document.getElementById('searchDropdown');
        if (searchDropdown) searchDropdown.classList.remove('active');
      }
    });

    // Close results on outside click
    document.addEventListener('click', function () {
      results.style.display = 'none';
    });

    searchBox.addEventListener('click', function (e) {
      e.stopPropagation();
    });
  });
})();

// ===== MOBILE: COLLAPSIBLE SOCIAL BUTTONS =====
document.addEventListener('DOMContentLoaded', function () {
  if (window.innerWidth >= 768) return;

  var social = document.querySelector('.floating-social');
  if (!social) return;

  // Separate "always visible" from secondary buttons
  var alwaysClasses = ['email', 'whatsapp', 'top'];
  var allBtns = Array.from(social.querySelectorAll('.float-btn'));
  var always = allBtns.filter(function (b) {
    return alwaysClasses.some(function (c) { return b.classList.contains(c); });
  });
  var secondary = allBtns.filter(function (b) {
    return !alwaysClasses.some(function (c) { return b.classList.contains(c); });
  });

  // Build collapsible group
  var group = document.createElement('div');
  group.className = 'float-social-group';
  group.style.cssText = 'display:none;flex-direction:column;gap:8px;';
  secondary.forEach(function (b) { group.appendChild(b); });

  // Toggle button
  var toggle = document.createElement('button');
  toggle.className = 'float-btn float-toggle';
  toggle.setAttribute('aria-label', 'More social links');
  toggle.innerHTML = '<i class="fas fa-plus"></i>';
  toggle.addEventListener('click', function () {
    var open = group.style.display === 'flex';
    group.style.display = open ? 'none' : 'flex';
    toggle.classList.toggle('open', !open);
    toggle.innerHTML = open
      ? '<i class="fas fa-plus"></i>'
      : '<i class="fas fa-times"></i>';
  });

  // Rebuild: group (hidden), toggle, email, whatsapp, top
  social.innerHTML = '';
  social.appendChild(group);
  social.appendChild(toggle);
  always.forEach(function (b) { social.appendChild(b); });
});
