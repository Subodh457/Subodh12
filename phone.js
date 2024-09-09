// Get the container element
const container = document.getElementById('container');

// Get the paper form element
const paperForm = document.getElementById('paper-form');

// Set the initial position of the paper form
let x = 0;
let y = 0;
let offsetX = 0;
let offsetY = 0;

// Add event listeners to the container element
container.addEventListener('touchstart', handleTouchStart, { passive: false });
container.addEventListener('touchmove', handleTouchMove, { passive: false });
container.addEventListener('touchend', handleTouchEnd);

// Handle touch start event
function handleTouchStart(event) {
  // Prevent default behavior (e.g., scrolling)
  event.preventDefault();

  // Get the touch object
  const touch = event.touches[0];

  // Get the current position of the paper form
  const rect = paperForm.getBoundingClientRect();
  offsetX = touch.clientX - rect.left;
  offsetY = touch.clientY - rect.top;

  // Add a class to the paper form to indicate that it is being dragged
  paperForm.classList.add('dragging');
}

// Handle touch move event
function handleTouchMove(event) {
  // Prevent default behavior (e.g., scrolling)
  event.preventDefault();

  // Get the touch object
  const touch = event.touches[0];

  // Calculate the new position of the paper form
  const dx = touch.clientX - offsetX;
  const dy = touch.clientY - offsetY;

  // Get the container's dimensions to constrain the movement
  const containerRect = container.getBoundingClientRect();
  const formRect = paperForm.getBoundingClientRect();

  // Constrain the paper form within the container
  const newX = Math.min(Math.max(dx, 0), containerRect.width - formRect.width);
  const newY = Math.min(Math.max(dy, 0), containerRect.height - formRect.height);

  // Update the position of the paper form
  paperForm.style.transform = `translate(${newX}px, ${newY}px)`;
}

// Handle touch end event
function handleTouchEnd(event) {
  // Remove the class from the paper form to indicate that it is no longer being dragged
  paperForm.classList.remove('dragging');
}