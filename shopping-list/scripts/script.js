const input = document.querySelector("input");
const addbtn = document.querySelector(".add-btn");
const list = document.querySelector("ul");

addbtn.addEventListener("click", (e) => {
  e.preventDefault();
  const itemText = input.value.trim();
  if (!itemText) return;

  // Create li and delete button
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delbtn = document.createElement("button");

  span.textContent = itemText;
  delbtn.textContent = "❌";

  li.append(span, delbtn);
  list.appendChild(li);

  // Delete button
  delbtn.addEventListener("click", () => {
    li.remove();
    // Re-numbering happens automatically because of CSS counter
  });

  input.value = "";
  input.focus();
});
