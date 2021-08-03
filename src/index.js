window.addEventListener("DOMContentLoaded", (event) => {
  getTodos();
  itemsLeftTodo();
  console.log("DOM fully loaded and parsed");
});

let list = document.querySelector(".list");
let input = document.querySelector("input");
let form = document.querySelector("form");
let itemsLeft = document.querySelector(".items-left");

form.addEventListener("submit", getData);

function getData(e) {
  e.preventDefault();
  let data = input.value.trim();
  let id = getId();
  if (data !== "") {
    let details = {
      id,
      data,
      checked: false,
    };
    let todos = [];
    if (localStorage.getItem("todos")) {
      let arrayTodo = JSON.parse(localStorage.getItem("todos"));
      arrayTodo.push(details);
      localStorage.setItem("todos", JSON.stringify(arrayTodo));
    } else {
      todos[0] = details;
      localStorage.setItem("todos", JSON.stringify(todos));
    }
    input.value = "";
    itemsLeftTodo();
    getTodos();
  }
}

function getId() {
  let date = new Date();
  let rand = Math.floor(Math.random() * (1000 - 10)) + 10;
  rand = rand.toString();
  date = date.getTime().toString();
  let id = rand + date;
  return id;
}

function getTodos() {
  let arrayTodo = JSON.parse(localStorage.getItem("todos"));
  if (arrayTodo) {
    let todoStr = "";
    let listTodo = arrayTodo.forEach((item) => {
      todoStr += `
        <li class="list-item" id=${item.id}>
          <div class="points" id=${item.id}>
            <span>
              <label id=${item.data} class="container2">${item.data}
                <input type="checkbox" class="checkbox" id=${item.data}><span class="checkmark"></span>
              </label>
            </span>
            <img class="cross hide" id=${item.id} src="../utils/images/icon-cross.svg" alt="Cross SVG" />
          </div>
        </li>`;
    });
    list.innerHTML = todoStr;
    let listItem = document.querySelectorAll(".cross");
    let label = document.querySelectorAll(".checkbox");
    label.forEach((item) => {
      item.addEventListener("click", setTextDec);
    });
    listItem.forEach((item) => {
      item.addEventListener("click", deleteItem);
    });
  }
}

function setTextDec(e) {
  let checkedItem = e.target;
  if (!checkedItem.parentNode.classList.contains("through")) {
    checkedItem.parentNode.classList.add("through");
    let value = itemsLeft.textContent.split(' ');
    let minus = Number(value[0]) - 1;
    value[0] = minus;
    itemsLeft.textContent = value.join(' ');
  } else {
    checkedItem.parentNode.classList.remove("through");
     let value = itemsLeft.textContent.split(" ");
     let minus = Number(value[0]) + 1;
     value[0] = minus;
     itemsLeft.textContent = value.join(" ");
  }
}

function deleteItem(e) {
  let result = confirm("Are you sure you want to delete this?");
  if (result) {
    let itemClicked = e.target;
    let itemId = itemClicked.getAttribute("id");
    let arrayTodo = JSON.parse(localStorage.getItem("todos"));
    arrayTodo = arrayTodo.filter((item) => item.id !== itemId);
    localStorage.setItem("todos", JSON.stringify(arrayTodo));
    itemsLeftTodo();
    location.reload();
  }
}

function itemsLeftTodo() {
  if (localStorage.getItem("todos")) {
    let arrayTodo = JSON.parse(localStorage.getItem("todos"));
    if (arrayTodo.length > 1) {
      itemsLeft.textContent = arrayTodo.length + " items left";
    } else {
      itemsLeft.textContent = arrayTodo.length + " item left";
    }
  } else {
    itemsLeft.textContent = "0 item left";
  }
}

// console.log(list);
