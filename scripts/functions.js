import { target, url } from "../scripts/variables.js";

export async function renderCard(link) {
  const response = await fetch(link);
  const data = await response.json();
  render(data);
  goDown();
  goUp();
}
let key
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
      key = e.target.getAttribute("name");
      const division = document.querySelector(`.${key}`);
      division.innerHTML = `<input class='input-${key}' placeholder="new data">
                                <button name=${key} class='ok-btn'>OK</button>`;
      const input = document.querySelector(`.input-${key}`);
      const okBtns = document.querySelectorAll(".ok-btn");
      okBtns.forEach((okBtn) =>
        okBtn.addEventListener("click", (e) => {
          newValue = input.value;
          if (newValue === "") {
            message.innerText = "поле не может быть пустым";
            message.style.color = "brown";
          } else 
            console.log(key, newValue);
            editData(url + data.id);
            message.innerText = "Данные отредактированны";
            message.style.color = "green";
        })
      )
      return key
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

async function editData(link) {
  const response = await fetch(link, {
    method: "PATCH",
    body: JSON.stringify({
      [key]: `${newValue}`,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await response.json();
  console.log(data);
  renderCard(url + data.id);
}
