function loadTickets() {
  const ticketList = document.getElementById('ticket-list');
  const tickets = JSON.parse(localStorage.getItem('tickets')) || [];

  if (tickets.length === 0) {
    ticketList.innerHTML = '<p>No tickets submitted yet.</p>';
    return;
  }

  ticketList.innerHTML = '';
  tickets.forEach(ticket => {
    const ticketElement = document.createElement('div');
    ticketElement.classList.add('ticket');

    ticketElement.innerHTML = `
      <h3>Ticket from ${ticket.name} - ${ticket.category}</h3>
      <p><strong>Email:</strong> ${ticket.email}</p>
      <p><strong>Priority:</strong> ${ticket.priority}</p>
      <p><strong>Message:</strong> ${ticket.message}</p>
      <p><strong>Rating:</strong> ${'★'.repeat(ticket.rating)}</p>
    `;

    ticketList.appendChild(ticketElement);
  });
}

document.addEventListener('DOMContentLoaded', loadTickets);
