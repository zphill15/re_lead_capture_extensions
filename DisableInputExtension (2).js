const DisableInputExtension = {
  name: "DisableInput",
  type: "effect",
  match: ({ trace }) =>
    trace.type === "ext_disableInput" ||
    trace.payload.name === "ext_disableInput",
  effect: ({ trace }) => {
    // Convert the payload to a boolean
    const isDisabled = trace.payload === "true" || trace.payload === true;

    console.log("Payload received:", trace.payload);
    console.log("isDisabled (converted):", isDisabled);

    function disableInput() {
      const chatDiv = document.getElementById("chat-container");

      if (chatDiv) {
        const shadowRoot = chatDiv.shadowRoot;
        if (shadowRoot) {
          const chatInput = shadowRoot.querySelector(".vfrc-chat-input");
          const textarea = shadowRoot.querySelector(
            'textarea[id^="vf-chat-input--"]'
          );
          const button = shadowRoot.querySelector(".vfrc-chat-input--button");

          if (chatInput && textarea && button) {
            // Add a style tag if it doesn't exist
            let styleTag = shadowRoot.querySelector("#vf-disable-input-style");
            if (!styleTag) {
              styleTag = document.createElement("style");
              styleTag.id = "vf-disable-input-style";
              styleTag.textContent = `
                .vf-no-border, .vf-no-border * {
                  border: none !important;
                }
                .vf-hide-button {
                  display: none !important;
                }
              `;
              shadowRoot.appendChild(styleTag);
            }

            function updateInputState() {
              console.log("updateInputState called. isDisabled:", isDisabled);

              textarea.disabled = isDisabled;
              if (!isDisabled) {
                console.log("Enabling input");
                textarea.placeholder = "Message...";
                chatInput.classList.remove("vf-no-border");
                button.classList.remove("vf-hide-button");
                // Restore original value getter/setter
                Object.defineProperty(
                  textarea,
                  "value",
                  originalValueDescriptor
                );
              } else {
                console.log("Disabling input");
                textarea.placeholder = "";
                chatInput.classList.add("vf-no-border");
                button.classList.add("vf-hide-button");
                Object.defineProperty(textarea, "value", {
                  get: function () {
                    return "";
                  },
                  configurable: true,
                });
              }

              // Trigger events to update component state
              textarea.dispatchEvent(
                new Event("input", { bubbles: true, cancelable: true })
              );
              textarea.dispatchEvent(
                new Event("change", { bubbles: true, cancelable: true })
              );
              console.log("Input and change events dispatched");
            }

            // Store original value descriptor
            const originalValueDescriptor = Object.getOwnPropertyDescriptor(
              HTMLTextAreaElement.prototype,
              "value"
            );

            // Initial update
            updateInputState();
          } else {
            console.error("Chat input, textarea, or button not found");
          }
        } else {
          console.error("Shadow root not found");
        }
      } else {
        console.error("Chat div not found");
      }
    }

    disableInput();
  },
};
