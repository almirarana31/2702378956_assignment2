document.addEventListener('DOMContentLoaded', function() {
  // Load and display tickets
  loadTickets();
  
  // Add sorting functionality
  setupSorting();
  
  // Mobile menu functionality
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

function loadTickets(sortBy = 'newest') {
  const ticketList = document.getElementById('ticket-list');
  let tickets = JSON.parse(localStorage.getItem('tickets')) || [];

  if (tickets.length === 0) {
    ticketList.innerHTML = '<p class="no-tickets">No tickets submitted yet. <a href="submit.html">Create your first ticket</a>.</p>';
    return;
  }

  // Sort tickets based on current selection
  tickets = sortTickets(tickets, sortBy);

  // Create sort controls if not already present
  if (!document.querySelector('.sort-controls')) {
    const sortControls = document.createElement('div');
    sortControls.className = 'sort-controls';
    sortControls.innerHTML = `
      <label for="sort-select">Sort by:</label>
      <select id="sort-select">
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="priority-high">Highest Priority</option>
        <option value="priority-low">Lowest Priority</option>
        <option value="severity-high">Highest Severity</option>
        <option value="severity-low">Lowest Severity</option>
      </select>
    `;
    ticketList.parentNode.insertBefore(sortControls, ticketList);
  }

  // Clear existing tickets
  ticketList.innerHTML = '';
  
  // Display ticket count
  const ticketCountElement = document.createElement('div');
  ticketCountElement.className = 'ticket-count';
  ticketCountElement.textContent = `Showing ${tickets.length} ticket${tickets.length !== 1 ? 's' : ''}`;
  ticketList.appendChild(ticketCountElement);

  // Create and append tickets
  tickets.forEach((ticket, index) => {
    const ticketElement = document.createElement('div');
    ticketElement.classList.add('ticket');
    
    // Add animation delay for staggered appearance
    ticketElement.style.animationDelay = `${index * 0.05}s`;
    
    // Add class based on priority if available
    if (ticket.priority) {
      ticketElement.classList.add(`priority-${ticket.priority.toLowerCase()}`);
    }
    
    // Use the timestamp if available, otherwise "Not specified"
    const timestampDisplay = ticket.timestamp || 'Not specified';
    
    // Generate star rating display
    const starRating = generateStarRating(ticket.rating);
    
    ticketElement.innerHTML = `
      <div class="ticket-header">
        <h3>Ticket #${index + 1}: ${ticket.category}</h3>
        <span class="ticket-priority ${ticket.priority?.toLowerCase() || 'normal'}">${ticket.priority || 'Normal'}</span>
      </div>
      <div class="ticket-body">
        <p><strong>From:</strong> ${ticket.name} (${ticket.email})</p>
        <p><strong>Submitted:</strong> ${timestampDisplay}</p>
        <p><strong>Message:</strong> ${ticket.message}</p>
        <div class="ticket-rating">
          <strong>Severity Rating:</strong> 
          <div class="stars">${starRating}</div>
        </div>
      </div>
      <div class="ticket-actions">
        <button class="ticket-action-btn respond-btn" data-ticket-id="${index}">Respond</button>
        <button class="ticket-action-btn resolve-btn" data-ticket-id="${index}">Resolve</button>
        <button class="ticket-action-btn delete-btn" data-ticket-id="${index}">Delete</button>
      </div>
    `;
    
    ticketList.appendChild(ticketElement);
  });

  // Add event listeners to action buttons
  addTicketActionListeners();
}

function generateStarRating(rating) {
  // Convert number rating to visual star representation
  const fullStar = '<span class="star filled">★</span>';
  const emptyStar = '<span class="star">☆</span>';
  
  return fullStar.repeat(rating) + emptyStar.repeat(5 - rating);
}

function sortTickets(tickets, sortBy) {
  switch(sortBy) {
    case 'newest':
      // Sort by timestamp in descending order (newest first)
      return tickets.sort((a, b) => {
        const dateA = a.timestamp ? new Date(a.timestamp) : new Date(0);
        const dateB = b.timestamp ? new Date(b.timestamp) : new Date(0);
        return dateB - dateA;
      });
      
    case 'oldest':
      // Sort by timestamp in ascending order (oldest first)
      return tickets.sort((a, b) => {
        const dateA = a.timestamp ? new Date(a.timestamp) : new Date(0);
        const dateB = b.timestamp ? new Date(b.timestamp) : new Date(0);
        return dateA - dateB;
      });
      
    case 'priority-high':
      // Sort by priority (high to low)
      const priorityOrder = {'Urgent': 3, 'High': 2, 'Normal': 1, 'Low': 0};
      return tickets.sort((a, b) => {
        const priorityA = priorityOrder[a.priority] || 1; // Default to Normal
        const priorityB = priorityOrder[b.priority] || 1;
        return priorityB - priorityA;
      });
      
    case 'priority-low':
      // Sort by priority (low to high)
      const priorityOrderReverse = {'Urgent': 3, 'High': 2, 'Normal': 1, 'Low': 0};
      return tickets.sort((a, b) => {
        const priorityA = priorityOrderReverse[a.priority] || 1; // Default to Normal
        const priorityB = priorityOrderReverse[b.priority] || 1;
        return priorityA - priorityB;
      });
      
    case 'severity-high':
      // Sort by severity rating (high to low)
      return tickets.sort((a, b) => b.rating - a.rating);
      
    case 'severity-low':
      // Sort by severity rating (low to high)
      return tickets.sort((a, b) => a.rating - b.rating);
      
    default:
      return tickets;
  }
}

function setupSorting() {
  // Add event listener to sort dropdown
  document.addEventListener('change', function(e) {
    if (e.target && e.target.id === 'sort-select') {
      loadTickets(e.target.value);
    }
  });
}

function addTicketActionListeners() {
  // Respond buttons
  document.querySelectorAll('.respond-btn').forEach(button => {
    button.addEventListener('click', function() {
      const ticketId = parseInt(this.getAttribute('data-ticket-id'));
      alert(`You would now respond to ticket #${ticketId + 1}. In a real application, this would open a response form or email client.`);
    });
  });
  
  // Resolve buttons
  document.querySelectorAll('.resolve-btn').forEach(button => {
    button.addEventListener('click', function() {
      const ticketId = parseInt(this.getAttribute('data-ticket-id'));
      if (confirm(`Are you sure you want to mark ticket #${ticketId + 1} as resolved?`)) {
        // In a real app, we'd update the ticket status
        // For this demo, we'll just provide feedback
        this.textContent = 'Resolved';
        this.disabled = true;
        this.classList.add('resolved');
        
        // Find and highlight the parent ticket
        const ticketElement = this.closest('.ticket');
        ticketElement.classList.add('resolved-ticket');
        
        // Add a resolved notification
        const resolvedNotice = document.createElement('div');
        resolvedNotice.className = 'resolved-notice';
        resolvedNotice.textContent = 'Resolved';
        ticketElement.querySelector('.ticket-header').appendChild(resolvedNotice);
      }
    });
  });
  
  // Delete buttons
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', function() {
      const ticketId = parseInt(this.getAttribute('data-ticket-id'));
      if (confirm(`Are you sure you want to delete ticket #${ticketId + 1}? This cannot be undone.`)) {
        // Get current tickets
        let tickets = JSON.parse(localStorage.getItem('tickets')) || [];
        
        // Remove the selected ticket
        tickets.splice(ticketId, 1);
        
        // Update localStorage
        localStorage.setItem('tickets', JSON.stringify(tickets));
        
        // Reload the ticket list
        loadTickets(document.getElementById('sort-select')?.value || 'newest');
      }
    });
  });
  
  // Add hover effects for ticket cards
  document.querySelectorAll('.ticket').forEach(ticket => {
    ticket.addEventListener('mouseenter', function() {
      this.classList.add('ticket-hover');
    });
    
    ticket.addEventListener('mouseleave', function() {
      this.classList.remove('ticket-hover');
    });
  });
}