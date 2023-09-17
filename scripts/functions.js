import { target, url } from "../scripts/variables.js";

export async function renderCard(link) {
  const response = await fetch(link);
  const data = await response.json();
  render(data);
  goDown();
  goUp();
}

let newValue;

function render(data) {
  target.innerHTML = `<div class='content-wrapper'>
                            <p class='message'></p>
                            <div class='name'>
                                <h3>${data.name}</h3>
                                <img src="./edit.png" name='name' class='edit-btn'>
                            </div>
                            <div class='email'>
                                <p>mail: ${data.email}</p>
                                <img src="./edit.png" name='email' class='edit-btn'>
                            </div>
                            <div class='website'>
                                <p>web: ${data.website}</p>
                                <img src="./edit.png" name='website' class='edit-btn'>
                            </div>
                            <div class='btn-container'>
                                <button class='down' id=${data.id}><</button>
                                <button class='up' id=${data.id}>></button>
                            </div>
                        </div>`;

  const message = document.querySelector(".message");
  const editBtns = document.querySelectorAll(".edit-btn");
  editBtns.forEach((editBtn) =>
    editBtn.addEventListener("click", (e) => {
      const div = e.target.getAttribute("name");
      const division = document.querySelector(`.${div}`);
      division.innerHTML = `<input class='input-${div}' placeholder="new data">
                                <button name=${div} class='ok-btn'>OK</button>`;
      const input = document.querySelector(`.input-${div}`);
      const okBtns = document.querySelectorAll(".ok-btn");
      okBtns.forEach((okBtn) =>
        okBtn.addEventListener("click", (e) => {
          newValue = input.value;
          if (newValue === "") {
            message.innerText = "поле не может быть пустым";
            message.style.color = "brown";
          } else if (div === "name") {
            console.log(div, newValue);
            editName(url + data.id);
            message.innerText = "Данные отредактированны";
            message.style.color = "green";
          } else if (div === "email") {
            console.log(div, newValue);
            editEmail(url + data.id);
            message.innerText = "Данные отредактированны";
            message.style.color = "green";
          } else if (div === "website") {
            console.log(div, newValue);
            editWebsite(url + data.id);
            message.innerText = "Данные отредактированны";
            message.style.color = "green";
          }
        })
      )
    })
  )
}

function goUp() {
  const upBtns = document.querySelectorAll(".up");
  upBtns.forEach((upBtn) =>
    upBtn.addEventListener("click", (e) => {
      const id = e.target.getAttribute("id");
      const endPoint = parseInt(id) + 1;
      if (endPoint <= 10) renderCard(url + endPoint);
    })
  );
}

function goDown() {
  const downBtns = document.querySelectorAll(".down");
  downBtns.forEach((dnBtn) =>
    dnBtn.addEventListener("click", (e) => {
      const userID = e.target.getAttribute("id");
      const endPoint = parseInt(userID) - 1;
      if (endPoint > 0) renderCard(url + endPoint);
    })
  );
}

async function editName(link) {
  const response = await fetch(link, {
    method: "PATCH",
    body: JSON.stringify({
      name: `${newValue}`,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await response.json();
  console.log(data);
  renderCard(url + data.id);
}

async function editEmail(link) {
  const response = await fetch(link, {
    method: "PATCH",
    body: JSON.stringify({
      email: `${newValue}`,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await response.json();
  console.log(data);
  renderCard(url + data.id);
}

async function editWebsite(link) {
  const response = await fetch(link, {
    method: "PATCH",
    body: JSON.stringify({
      website: `${newValue}`,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await response.json();
  console.log(data);
  renderCard(url + data.id);
}
