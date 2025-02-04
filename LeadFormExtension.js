const LeadFormExtension = {
  name: "LeadForm",
  type: "response",
  match: ({ trace }) =>
    trace.type === "Lead_Form" || trace.payload.name === "Lead_Form",
  render: ({ trace, element }) => {
    const formContainer = document.createElement("form");

    formContainer.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap');

        .lead-form {
          font-family: 'Inter', sans-serif;
        }
        .lead-form label {
          font-size: 0.8em;
          color: #666;
          display: block;
          margin-bottom: 4px;
          font-weight: 500;
        }
        .lead-form input {
          width: 100%;
          padding: 8px;
          margin-bottom: 15px;
          border: none;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          background: transparent;
          outline: none;
          font-family: 'Inter', sans-serif;
          font-size: 0.95em;
        }
        .lead-form input::placeholder {
          color: #999;
          font-size: 0.9em;
        }
        .lead-form input:focus {
          border-bottom-color: #2e6ee1;
        }
        .lead-form input.invalid {
          border-bottom-color: #ff4444;
        }
        .lead-form .submit-btn {
          background: linear-gradient(to right, #2e6ee1, #2e7ff1);
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          width: 100%;
          cursor: pointer;
          font-size: 1em;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
        }
        .lead-form .submit-btn:hover {
          opacity: 0.9;
        }
      </style>
      <div class="lead-form">
        <label for="leadName">Name</label>
        <input 
          type="text" 
          id="leadName" 
          name="leadName" 
          required
          placeholder="Enter your name"
        >

        <label for="leadEmail">Email</label>
        <input 
          type="email" 
          id="leadEmail" 
          name="leadEmail" 
          required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$"
          placeholder="Enter your email"
        >

        <label for="leadPhone">Phone Number</label>
        <input 
          type="tel" 
          id="leadPhone" 
          name="leadPhone" 
          required
          pattern="\\d+"
          placeholder="Enter your phone number"
        >

        <button type="submit" class="submit-btn">Submit</button>
      </div>
    `;

    // Handle form validation
    const inputs = formContainer.querySelectorAll("input");
    inputs.forEach((input) => {
      input.addEventListener("input", function () {
        if (this.checkValidity()) {
          this.classList.remove("invalid");
        }
      });
    });

    formContainer.addEventListener("submit", function (event) {
      event.preventDefault();

      const nameInput = formContainer.querySelector("#leadName");
      const emailInput = formContainer.querySelector("#leadEmail");
      const phoneInput = formContainer.querySelector("#leadPhone");

      // Validate all fields
      let isValid = true;
      [nameInput, emailInput, phoneInput].forEach((input) => {
        if (!input.checkValidity()) {
          input.classList.add("invalid");
          isValid = false;
        }
      });

      if (!isValid) return;

      // Remove submit button after successful submission
      formContainer.querySelector(".submit-btn").remove();

      // Send data back to Voiceflow
      window.voiceflow.chat.interact({
        type: "complete",
        payload: {
          leadName: nameInput.value,
          leadEmail: emailInput.value,
          leadPhone: phoneInput.value,
        },
      });
    });

    element.appendChild(formContainer);
  },
};