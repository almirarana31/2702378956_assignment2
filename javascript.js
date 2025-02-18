const ratingStars = document.querySelectorAll('#rating span');
let selectedRating = 0;

ratingStars.forEach(star => {
  star.addEventListener('click', () => {
    selectedRating = star.dataset.value; // Get the selected rating
    updateRatingDisplay(selectedRating);
  });
});

function updateRatingDisplay(rating) {
  ratingStars.forEach(star => {
    if (star.dataset.value <= rating) {
      star.classList.add('selected');
    } else {
      star.classList.remove('selected');
    }
  });
}

ticketForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const category = document.getElementById('category').value;
  const priority = document.getElementById('priority').value;
  const message = document.getElementById('message').value;

  if (!name || !email || !message || selectedRating === 0) {
    alert('Please fill out all required fields and provide a rating.');
    return;
  }

  const ticket = {
    name,
    email,
    category,
    priority,
    message,
    rating: selectedRating
  };

  let tickets = JSON.parse(localStorage.getItem('tickets')) || [];
  tickets.push(ticket);
  localStorage.setItem('tickets', JSON.stringify(tickets));

  ticketForm.reset();
  updateRatingDisplay(0);  

  window.location.href = "thankyou.html";

});
