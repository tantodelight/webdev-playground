const btn = document.querySelector(".btn");
const body = document.body;
const div = document.createElement("div");

div.textContent = "button😎"
div.classList.add("active2");

btn.addEventListener("click", () => {
    btn.classList.toggle("active");
    body.classList.toggle("active-body");

    if (btn.classList.contains("active")) {
        btn.textContent = "Now I'm a super";
        btn.append(div)
    } else {
        btn.textContent = "Now I'm not😪";
        div.remove()
    }
})

