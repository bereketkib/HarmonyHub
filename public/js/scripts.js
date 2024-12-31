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
  const confirmDialog = document.getElementById("delete-confirm-dialog");
  const cancelBtn = document.getElementById("delete-cancel-btn");
  const confirmBtn = document.getElementById("delete-confirm-btn");
  const passcodeInput = document.getElementById("delete-passcode-input");

  let formToSubmit = null;

  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent the form from submitting immediately
      formToSubmit = button.closest("form"); // Find the form closest to the delete button
      confirmDialog.style.display = "flex"; // Show the confirmation dialog
    });
  });

  cancelBtn.addEventListener("click", () => {
    confirmDialog.style.display = "none"; // Hide the dialog if the user clicks Cancel
    formToSubmit = null; // Reset the form to submit
    passcodeInput.value = ""; // Clear the passcode input
  });

  confirmBtn.addEventListener("click", () => {
    const passcode = passcodeInput.value.trim();
    if (formToSubmit && passcode) {
      // Append the passcode as a hidden input field to the form
      const passcodeField = document.createElement("input");
      passcodeField.type = "hidden";
      passcodeField.name = "passcode";
      passcodeField.value = passcode;
      formToSubmit.appendChild(passcodeField);

      formToSubmit.submit(); // Submit the form after the passcode is entered
    } else {
      alert("Please enter the passcode.");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // --- EDIT BUTTON HANDLER ---
  const editButtons = document.querySelectorAll(".edit-btn");
  const editConfirmDialog = document.getElementById("edit-confirm-dialog");
  const editCancelBtn = document.getElementById("edit-cancel-btn");
  const editConfirmBtn = document.getElementById("edit-confirm-btn");
  const editPasscodeInput = document.getElementById("edit-passcode-input");

  let editUrl = null;

  editButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      editUrl = button.href; // Store the edit URL from the button
      editConfirmDialog.style.display = "flex"; // Show the edit confirmation dialog
    });
  });

  editCancelBtn.addEventListener("click", () => {
    editConfirmDialog.style.display = "none"; // Hide the dialog
    editUrl = null; // Reset the URL
    editPasscodeInput.value = ""; // Clear the passcode input
  });

  editConfirmBtn.addEventListener("click", () => {
    const passcode = editPasscodeInput.value.trim();
    if (editUrl && passcode) {
      // Replace with your passcode validation logic (e.g., compare passcode here)
      if (passcode === "KI890pol") { // Example validation, replace with your actual logic
        editConfirmDialog.style.display = "none";
        window.location.href = editUrl; // Redirect to the edit page
      } else {
        alert("Invalid passcode. Please try again.");
      }
    } else {
      alert("Please enter the passcode.");
    }
  });
})

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
