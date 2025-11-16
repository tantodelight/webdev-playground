const input = document.querySelector("input");
const addbtn = document.querySelector("button");
const list = document.querySelector("ul");

addbtn.addEventListener("click", (e) => {
    e.preventDefault();
    const item = input.value;
    input.value = "";
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delbtn = document.createElement("button");
    const row = document.createElement("div");
    row.classList.add("row");
    row.append(span, delbtn);
    li.append(row);
    span.textContent = item;
    delbtn.textContent = "❌";
    list.append(li);
    
    delbtn.addEventListener("click", () => {
        li.remove();
    })
    input.focus();
})
