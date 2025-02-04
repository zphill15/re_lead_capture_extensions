const PropertySearchFormExtension = {
  name: "PropertySearchForm",
  type: "response",
  match: ({ trace }) =>
    trace.type === "Property_Search_Form" ||
    trace.payload.name === "Property_Search_Form",
  render: ({ trace, element }) => {
    const formContainer = document.createElement("form");

    // Define the updatePriceRanges function
    function updatePriceRanges(status) {
      const priceRangeSelect = formContainer.querySelector("#priceRange");
      priceRangeSelect.innerHTML = ""; // Clear existing options

      const ranges =
        status === "Sale"
          ? [
              { value: "50000-200000", label: "$50,000 - $200,000" },
              { value: "200000-500000", label: "$200,000 - $500,000" },
              { value: "500000-1000000", label: "$500,000 - $1,000,000" },
              { value: "1000000-5000000", label: "$1,000,000 - $5,000,000" },
              { value: "5000000+", label: "$5,000,000 and above" },
            ]
          : [
              { value: "500-1500", label: "$500 - $1,500" },
              { value: "1500-3000", label: "$1,500 - $3,000" },
              { value: "3000-6000", label: "$3,000 - $6,000" },
              { value: "6000-12000", label: "$6,000 - $12,000" },
              { value: "12000+", label: "$12,000 and above" },
            ];

      // Add default option
      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.textContent = "Select price range";
      priceRangeSelect.appendChild(defaultOption);

      // Add price range options
      ranges.forEach((range) => {
        const option = document.createElement("option");
        option.value = range.value;
        option.textContent = range.label;
        priceRangeSelect.appendChild(option);
      });
    }

    formContainer.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap');

        .property-form {
          font-family: 'Inter', sans-serif;
          max-width: 100%;
        }
        .property-form label {
          font-size: 0.8em;
          color: #666;
          display: block;
          margin-bottom: 4px;
          font-weight: 500;
        }
        .property-form input,
        .property-form select,
        .property-form textarea {
          width: 100%;
          padding: 8px;
          margin-bottom: 15px;
          border: none;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          background: transparent;
          outline: none;
          font-family: 'Inter', sans-serif;
          font-size: 0.95em;
          color: #333;
        }
        .property-form textarea {
          min-height: 100px;
          resize: vertical;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 4px;
          margin-top: 5px;
        }
        .property-form select {
          cursor: pointer;
        }
        .property-form input::placeholder,
        .property-form textarea::placeholder {
          color: #999;
          font-size: 0.9em;
        }
        .property-form input:focus,
        .property-form select:focus,
        .property-form textarea:focus {
          border-bottom-color: #2e6ee1;
        }
        .property-form textarea:focus {
          border-color: #2e6ee1;
        }
        .property-form input.invalid,
        .property-form select.invalid,
        .property-form textarea.invalid {
          border-bottom-color: #ff4444;
        }
        .property-form .submit-btn {
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
          margin-top: 10px;
        }
        .property-form .submit-btn:hover {
          opacity: 0.9;
        }
        .property-form input[type="number"] {
          width: 100%;
          padding: 8px;
          margin-bottom: 15px;
          border: none;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          background: transparent;
          outline: none;
          font-family: 'Inter', sans-serif;
          font-size: 0.95em;
          -moz-appearance: textfield;
        }
        .property-form input[type="number"]::-webkit-outer-spin-button,
        .property-form input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      </style>
      <div class="property-form">
        <label for="city">City</label>
        <input 
          type="text" 
          id="city" 
          name="city" 
          required
          placeholder="Enter city"
        >

        <label for="neighborhood">Neighborhood</label>
        <input 
          type="text" 
          id="neighborhood" 
          name="neighborhood" 
          required
          placeholder="Enter neighborhood"
        >

        <label for="propertyStatus">Property Status</label>
        <select id="propertyStatus" name="propertyStatus" required>
          <option value="">Select status</option>
          <option value="Rent">For Rent</option>
          <option value="Sale">For Sale</option>
        </select>

        <label for="homeType">Home Type</label>
        <select id="homeType" name="homeType" required>
          <option value="">Select home type</option>
          <option value="Single Property">House</option>
          <option value="Apartment">Apartment</option>
        </select>

        <label for="bedrooms">Bedrooms</label>
        <select id="bedrooms" name="bedrooms" required>
          <option value="">Select bedrooms</option>
          ${Array.from({ length: 9 }, (_, i) => i + 1)
            .map(
              (num) =>
                `<option value="${num}">${num} ${
                  num === 1 ? "bedroom" : "bedrooms"
                }</option>`
            )
            .join("")}
          <option value="10+">10+</option>
        </select>

        <label for="bathrooms">Bathrooms</label>
        <select id="bathrooms" name="bathrooms" required>
          <option value="">Select bathrooms</option>
          ${Array.from({ length: 9 }, (_, i) => i + 1)
            .map(
              (num) =>
                `<option value="${num}">${num} ${
                  num === 1 ? "bathroom" : "bathrooms"
                }</option>`
            )
            .join("")}
          <option value="10+">10+</option>
        </select>

        <label for="squareFeet">Square Feet</label>
        <select id="squareFeet" name="squareFeet" required>
          <option value="">Select square footage</option>
          <option value="0-500">Under 500 sq ft</option>
          <option value="500-1000">500 - 1,000 sq ft</option>
          <option value="1000-1500">1,000 - 1,500 sq ft</option>
          <option value="1500-2000">1,500 - 2,000 sq ft</option>
          <option value="2000-2500">2,000 - 2,500 sq ft</option>
          <option value="2500-3000">2,500 - 3,000 sq ft</option>
          <option value="3000-4000">3,000 - 4,000 sq ft</option>
          <option value="4000-5000">4,000 - 5,000 sq ft</option>
          <option value="5000+">5,000+ sq ft</option>
        </select>

        <label for="priceRange">Price Range</label>
        <select id="priceRange" name="priceRange" required>
          <option value="">Select price range</option>
        </select>

        <label for="moveInDate">Move-in Date</label>
        <input 
          type="date" 
          id="moveInDate" 
          name="moveInDate" 
          required
          min="${new Date().toISOString().split("T")[0]}"
        >

        <button type="submit" class="submit-btn">Find Properties</button>
      </div>
    `;

    // Initialize price ranges based on default property status
    updatePriceRanges("Rent");

    // Update price ranges when property status changes
    const propertyStatusSelect = formContainer.querySelector("#propertyStatus");
    propertyStatusSelect.addEventListener("change", function () {
      updatePriceRanges(this.value);
    });

    // Handle form validation
    const inputs = formContainer.querySelectorAll(
      "input:not([type='checkbox']), select, textarea"
    );
    inputs.forEach((input) => {
      input.addEventListener("input", function () {
        if (this.checkValidity()) {
          this.classList.remove("invalid");
        }
      });
    });

    formContainer.addEventListener("submit", function (event) {
      event.preventDefault();

      // Get all form values
      const formData = {
        city: formContainer.querySelector("#city").value,
        neighborhood: formContainer.querySelector("#neighborhood").value,
        propertyStatus: formContainer.querySelector("#propertyStatus").value,
        homeType: formContainer.querySelector("#homeType").value,
        bedrooms: formContainer.querySelector("#bedrooms").value,
        bathrooms: formContainer.querySelector("#bathrooms").value,
        squareFeet: formContainer.querySelector("#squareFeet").value,
        priceRange: formContainer.querySelector("#priceRange").value,
        moveInDate: formContainer.querySelector("#moveInDate").value,
      };

      // Log the form data for debugging
      console.log("Form Data:", formData);

      // Validate all required fields
      let isValid = true;
      inputs.forEach((input) => {
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
        payload: formData,
      });
    });

    element.appendChild(formContainer);
  },
};
