document.addEventListener('DOMContentLoaded', function() {
  // Profile data (in a real app, this would come from a database)
  const profileData = {
    jane: {
      name: 'Jane Smith',
      role: 'Technical Support Lead',
      email: 'jane.smith@lionsclub.example.org',
      phone: '(555) 123-4567',
      bio: 'Jane has been with the Lion\'s Club for over 12 years. She has a background in computer science and volunteers her time to ensure our systems run smoothly. In her free time, she enjoys hiking and photography.',
      expertise: ['IT Infrastructure', 'Network Security', 'Database Management'],
      projects: ['Implemented the helpdesk ticketing system', 'Led digital transformation initiative', 'Conducts monthly tech workshops for seniors']
    },
    john: {
      name: 'John Davis',
      role: 'Volunteer Coordinator',
      email: 'john.davis@lionsclub.example.org',
      phone: '(555) 234-5678',
      bio: 'John coordinates our volunteer programs and has been an active member for 8 years. He has a background in community organization and is passionate about connecting people with meaningful service opportunities.',
      expertise: ['Volunteer Management', 'Event Planning', 'Community Outreach'],
      projects: ['Annual Community Service Day', 'Youth Leadership Program', 'Disaster Relief Coordination']
    },
    maria: {
      name: 'Maria Gonzalez',
      role: 'Donations Manager',
      email: 'maria.gonzalez@lionsclub.example.org',
      phone: '(555) 345-6789',
      bio: 'Maria oversees all donation programs and has been with us for 6 years. She has a background in nonprofit management and is dedicated to maximizing the impact of every contribution.',
      expertise: ['Fundraising', 'Donor Relations', 'Grant Writing'],
      projects: ['Annual Fundraising Gala', 'Corporate Sponsorship Program', 'Scholarship Fund Management']
    }
  };
  
  // Modal functionality
  const modal = document.getElementById('profile-modal');
  const modalContent = document.getElementById('modal-content-container');
  const closeModal = document.querySelector('.close-modal');
  
  // Open modal when profile buttons are clicked
  const profileButtons = document.querySelectorAll('.view-profile-btn');
  profileButtons.forEach(button => {
    button.addEventListener('click', function() {
      const profileId = this.getAttribute('data-profile');
      const profile = profileData[profileId];
      
      // Create modal content
      modalContent.innerHTML = `
        <div class="full-profile">
          <div class="profile-header">
            <img src="https://via.placeholder.com/200" alt="${profile.name}" class="profile-large-img">
            <div>
              <h2>${profile.name}</h2>
              <p class="role">${profile.role}</p>
              <p><strong>Email:</strong> ${profile.email}</p>
              <p><strong>Phone:</strong> ${profile.phone}</p>
            </div>
          </div>
          
          <div class="profile-body">
            <h3>Biography</h3>
            <p>${profile.bio}</p>
            
            <h3>Areas of Expertise</h3>
            <ul>
              ${profile.expertise.map(item => `<li>${item}</li>`).join('')}
            </ul>
            
            <h3>Key Projects</h3>
            <ul>
              ${profile.projects.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>
        </div>
      `;
      
      // Show modal with animation
      modal.style.display = 'block';
      setTimeout(() => {
        modal.style.opacity = '1';
      }, 10);
    });
  });
  
  // Close modal functionality
  closeModal.addEventListener('click', closeModalFunction);
  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      closeModalFunction();
    }
  });
  
  function closeModalFunction() {
    modal.style.opacity = '0';
    setTimeout(() => {
      modal.style.display = 'none';
    }, 300);
  }
  
  // Add mobile menu toggle functionality
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
});