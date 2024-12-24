document.addEventListener("DOMContentLoaded", () => {
  const toggler = document.querySelector(".navbar-toggler");
  const navCollapse = document.querySelector("#navbarNav");

  if (toggler && navCollapse) {
    toggler.addEventListener("click", () => {
      navCollapse.classList.toggle("collapse");
    });
  }
});

// Function to handle scroll behavior
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");

  // Check if the page has been scrolled
  if (window.scrollY > 50) {
    navbar.classList.add("shrink"); // Add the "shrink" class when scrolling
  } else {
    navbar.classList.remove("shrink"); // Remove the "shrink" class when at the top
  }
});

// Ensure that when the toggle button is clicked, the navbar expands smoothly
document
  .querySelector(".navbar-toggler")
  .addEventListener("click", function () {
    var navbarCollapse = document.querySelector(".navbar-collapse");
    navbarCollapse.classList.toggle("show");
  });

window.onscroll = function () {
  var navbar = document.getElementById("navbar");
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    navbar.classList.add("shrink");
  } else {
    navbar.classList.remove("shrink");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const deleteButtons = document.querySelectorAll(".delete-btn");
  const confirmDialog = document.getElementById("confirm-dialog");
  const cancelBtn = document.getElementById("cancel-btn");
  const confirmBtn = document.getElementById("confirm-btn");

  let formToSubmit = null; // To store the form reference temporarily

  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent immediate form submission
      formToSubmit = button.closest("form"); // Get the form to submit later
      confirmDialog.style.display = "flex"; // Show the confirmation dialog
    });
  });

  // Cancel button hides the dialog
  cancelBtn.addEventListener("click", () => {
    confirmDialog.style.display = "none";
    formToSubmit = null; // Reset the form reference
  });

  // Confirm button submits the form
  confirmBtn.addEventListener("click", () => {
    if (formToSubmit) {
      formToSubmit.submit(); // Submit the stored form
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const toggleItems = (category) => {
    const itemsGrid = document.getElementById(`items-${category}`);
    const icon = document.getElementById(`icon-${category}`);

    if (itemsGrid.classList.contains('hidden')) {
      itemsGrid.classList.remove('hidden');
      icon.classList.add('up'); // Rotate icon up
    } else {
      itemsGrid.classList.add('hidden');
      icon.classList.remove('up'); // Reset icon rotation
    }
  };

  // Make `toggleItems` function available globally
  window.toggleItems = toggleItems;
});


document.addEventListener("DOMContentLoaded", () => {
  const dialog = document.getElementById("confirm-dialog");
  const confirmBtn = document.getElementById("confirm-btn");
  const cancelBtn = document.getElementById("cancel-btn");
  let currentForm = null;

  // Attach event listeners to all delete buttons
  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent form submission
      currentForm = button.closest("form"); // Store the form to submit later
      dialog.classList.add("visible");
    });
  });

  // Cancel button hides the dialog
  cancelBtn.addEventListener("click", () => {
    dialog.classList.remove("visible");
  });

  // Confirm button submits the form
  confirmBtn.addEventListener("click", () => {
    if (currentForm) {
      currentForm.submit();
    }
  });
});

setTimeout(() => {
  const flashMessage = document.querySelector('.flash-message');
  if (flashMessage) {
    flashMessage.style.transition = 'opacity 0.5s ease';
    flashMessage.style.opacity = '0';

    // Remove the element from the DOM after the fade-out effect
    setTimeout(() => {
      flashMessage.remove();
    }, 500); // Matches the transition duration
  }
}, 3000);
