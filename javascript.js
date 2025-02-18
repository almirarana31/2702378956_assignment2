document.addEventListener('DOMContentLoaded', function() {
  // Rating system functionality
  const ratingContainer = document.getElementById('rating');
  
  if (ratingContainer) {  // Only run this code if we're on a page with ratings
    const ratingStars = document.querySelectorAll('#rating span');
    let selectedRating = 0;
    
    ratingStars.forEach(star => {
      star.addEventListener('click', () => {
        selectedRating = parseInt(star.dataset.value); // Convert string to number
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
  
  // Form handling
  const ticketForm = document.getElementById('ticket-form');
  
  if (ticketForm) {  // Only run this code if we're on a page with the form
    ticketForm.addEventListener('submit', function(event) {
      event.preventDefault();  // Stop form from submitting normally
      
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
      
      // Reset form and rating display
      ticketForm.reset();
      updateRatingDisplay(0);
      
      // Redirect to thank you page
      window.location.href = "thankyou.html";
    });
  }
});

// Function for any page that needs to access the rating display logic
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