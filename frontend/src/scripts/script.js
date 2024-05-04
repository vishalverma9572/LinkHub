export function addRemoveFields() {
    const maxFields = 10;
    const addButton = document.querySelector(".add_field_button");
    const wrapper = document.querySelector(".input_fields_wrap");
    
    let x = 1;
  
    const addField = (e) => {
      e.preventDefault();
      if (x < maxFields) {
        const inputBox = document.createElement("div");
        inputBox.className = "input-box";
        inputBox.innerHTML = `
          <input type="text" name="mytext[]"/>
          <a href="#" class="remove_field">Remove</a>
        `;
        wrapper.appendChild(inputBox);
        x++;
      }
    };
  
    const removeField = (e) => {
      e.preventDefault();
      if (x > 1) {
        const fieldToRemove = e.target.parentElement;
        wrapper.removeChild(fieldToRemove);
        x--;
      }
    };
  
    addButton.addEventListener("click", addField);
    wrapper.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove_field")) {
        removeField(e);
      }
    });
  }
  
  // Run the addRemoveFields function when the DOM is ready
document.addEventListener("DOMContentLoaded", function() {
    addRemoveFields();
});