// Make sure we wait to attach our handlers until the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', (event) => {
  if (event) {
    console.info('DOM loaded');
  }

  // UPDATE
  const devouredBtns = document.querySelectorAll('.eat');

  // Set up the event listener for the create button
  if (devouredBtns) {
    devouredBtns.forEach((button) => {
      button.addEventListener('click', (e) => {
        console.log('test');
        // Grabs the id of the element that goes by the name, "id"
        const id = e.target.getAttribute('data-id');
        const done = true;
        console.log(id);
        const newBurgerState = {
          devoured: done,
        };

        fetch(`/api/burgers/${id}`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },

          // make sure to serialize the JSON body
          body: JSON.stringify(newBurgerState),
        }).then((response) => {
          // Check that the response is all good
          // Reload the page so the user can see the new quote
          if (response.ok) {
            console.log(`changed status to: ${done}`);
            location.reload('/');
          } else {
            alert('something went wrong!');
          }
        });
      });
    });
  }

  // CREATE
  const createBurger = document.getElementById('create-form');

  if (createBurger) {
    createBurger.addEventListener('submit', (e) => {
      e.preventDefault();

      // Grabs the value of the textarea that goes by the name, "quote"
      const newBurger = {
        name: document.getElementById('ca').value.trim(),
        devoured: 0,
      };

      // Send POST request to create a new quote
      fetch('/api/burgers', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },

        // Make sure to serialize the JSON body
        body: JSON.stringify(newBurger),
      }).then(() => {
        // Empty the form
        document.getElementById('ca').value = '';

        // Reload the page so the user can see the new quote
        console.log('Created a new burger!');
        location.reload();
      });
    });
  }

  const deleteBurgerBtn = document.querySelectorAll(".delete-burger");
  if (deleteBurgerBtn) {
    deleteBurgerBtn.forEach((button) => {
      button.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");

        // Send the DELETE request.
        fetch("/api/burgers/" + id, {
          method: "DELETE",
        }).then(function () {
          console.log("deleted burger", id);
          // Reload the page to get the updated list
          location.reload();
        });
      });
    });
  }
});
