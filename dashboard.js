document.addEventListener('DOMContentLoaded', function() {
  function updateDashboardStats() {
    const tickets = JSON.parse(localStorage.getItem('tickets')) || [];
    
    document.getElementById('total-tickets').querySelector('.stat-number').textContent = tickets.length;

    document.getElementById('open-tickets').querySelector('.stat-number').textContent = tickets.length;
    document.getElementById('resolved-tickets').querySelector('.stat-number').textContent = '0';
  }
  
  const navToggle = document.createElement('button');
  navToggle.classList.add('nav-toggle');
  navToggle.innerHTML = '☰';
  navToggle.setAttribute('aria-label', 'Toggle navigation menu');
  
  const header = document.querySelector('header');
  const nav = document.getElementById('main-nav');
  
  header.insertBefore(navToggle, nav);
  
  navToggle.addEventListener('click', function() {
    nav.classList.toggle('active');
    if (nav.classList.contains('active')) {
      navToggle.innerHTML = '✕';
    } else {
      navToggle.innerHTML = '☰';
    }
  });

  updateDashboardStats();
});