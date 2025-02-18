document.addEventListener('DOMContentLoaded', function() {
  const ratingContainer = document.getElementById('rating');
  
  if (ratingContainer) {  
    const ratingStars = document.querySelectorAll('#rating span');
    let selectedRating = 0;
    
    ratingStars.forEach(star => {
      star.addEventListener('click', () => {
        selectedRating = parseInt(star.dataset.value);
        updateRatingDisplay(selectedRating);
      });
    });
    
    function updateRatingDisplay(rating) {
      ratingStars.forEach(star => {
        if (parseInt(star.dataset.value) <= rating) {
          star.classList.add('selected');
        } else {
          star.classList.remove('selected');
        }
      });
    }
  }
  
  const ticketForm = document.getElementById('ticket-form');
  
  if (ticketForm) { 
    ticketForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const category = document.getElementById('category').value;
      const priority = document.getElementById('priority') ? document.getElementById('priority').value : 'Normal';
      const message = document.getElementById('message').value;
      const ratingStars = document.querySelectorAll('#rating span.selected');
      const selectedRating = ratingStars.length;
      
      if (!name || !email || !message) {
        alert('Please fill out all required fields.');
        return;
      }
      
      if (selectedRating === 0) {
        alert('Please provide a rating for your issue.');
        return;
      }
      
      const ticket = {
        name,
        email,
        category,
        priority,
        message,
        rating: selectedRating,
        timestamp: new Date().toLocaleString()
      };
      
      let tickets = JSON.parse(localStorage.getItem('tickets')) || [];
      tickets.push(ticket);
      localStorage.setItem('tickets', JSON.stringify(tickets));
      
      ticketForm.reset();
      updateRatingDisplay(0);
      
      window.location.href = "thankyou.html";
    });
  }
});

function updateRatingDisplay(rating) {
  const ratingStars = document.querySelectorAll('#rating span');
  if (ratingStars) {
    ratingStars.forEach(star => {
      if (parseInt(star.dataset.value) <= rating) {
        star.classList.add('selected');
      } else {
        star.classList.remove('selected');
      }
    });
  }
}