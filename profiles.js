document.addEventListener('DOMContentLoaded', function() {
  const profileData = {
    almira: {
      name: 'Almira Rana',
      role: 'Front-end Devlopment Lead',
      email: 'almira.rana@binus.ac.id',
      phone: '+62 8123 4567 890',
      bio: 'Almira is a member of this team, she is a student of Binus University International.',
      expertise: ['IT Infrastructure', 'Network Security', 'Database Management'],
      projects: ['Implemented the helpdesk ticketing system', 'Led digital transformation initiative', 'Conducts monthly tech workshops for seniors']
    },
    orlando: {
      name: 'Orlando Padiman',
      role: 'Full-stack Integration Lead',
      email: 'orlando.padiman@binus.ac.id',
      phone: '+62 8123 4567 890',
      bio: 'Orlando is a member of this team, he is a student of Binus University International.',
      expertise: ['Volunteer Management', 'Event Planning', 'Community Outreach'],
      projects: ['Annual Community Service Day', 'Youth Leadership Program', 'Disaster Relief Coordination']
    },
    ariel: {
      name: 'Ariel Darmawijaya',
      role: 'Back-end Development Lead',
      email: 'ariel.darmawijaya@binus.ac.id',
      phone: '+62 8123 4567 890',
      bio: 'Ariel is a member of this team, he is a student of Binus University International.',
      expertise: ['Fundraising', 'Donor Relations', 'Grant Writing'],
      projects: ['Annual Fundraising Gala', 'Corporate Sponsorship Program', 'Scholarship Fund Management']
    },
    abyan: {
      name: 'Abyan Kartasasmita',
      role: 'Testing Lead',
      email: 'abyan.kartasasmita@binus.ac.id',
      phone: '+62 8123 4567 890',
      bio: 'Abyan is a member of this team, he is a student of Binus University International.',
      expertise: ['Fundraising', 'Donor Relations', 'Grant Writing'],
      projects: ['Annual Fundraising Gala', 'Corporate Sponsorship Program', 'Scholarship Fund Management']
    }
  };
  
  const modal = document.getElementById('profile-modal');
  const modalContent = document.getElementById('modal-content-container');
  const closeModal = document.querySelector('.close-modal');
  
  const profileButtons = document.querySelectorAll('.view-profile-btn');
  profileButtons.forEach(button => {
    button.addEventListener('click', function() {
      const profileId = this.getAttribute('data-profile');
      const profile = profileData[profileId];
      
      modalContent.innerHTML = `
        <div class="full-profile">
          <div class="profile-header">
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
      
      modal.style.display = 'block';
      setTimeout(() => {
        modal.style.opacity = '1';
      }, 10);
    });
  });
  
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