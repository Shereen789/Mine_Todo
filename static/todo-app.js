let taskList = [];

class Task {
  constructor(name, dueDate, isDone) {
    this.taskId = Date.now();
    this.name = name;
    this.dueDate = dueDate;
    this.isDone = isDone;
  }

  toString() {
    let htmlText = '<li class="task" ><div>';
    htmlText += this.name;
    htmlText += ", " + this.dueDate;
    htmlText += '<input type="checkbox" name="isDone" id="isDone">';
    htmlText += '<button onclick="deleteTask(';
    htmlText += this.taskId;
    htmlText += ')">Delete</button>';
    htmlText += "</div></li>";
    return htmlText;
  }
}

function render() {
  const listUI = document.getElementById("todolist");
  listUI.innerHTML = "";
  if (taskList.length === 0) listUI.innerHTML = "No tasks todo :-)";
  taskList.forEach((task) => {
    listUI.innerHTML += task.toString();
  });
}

function deleteTask(taskId) {
  taskList = taskList.filter((t) => {
    if (t.taskId != taskId) return t;
  });
  const res = updateDatabase("del", taskId);
  render();
  console.log(taskList);
}

function createTask() {
  const taskName = document.getElementById("taskName").value;
  const dueDate = document.getElementById("dueDate").value;

  addTask(new Task(taskName, dueDate, false));
}

function addTask(t) {
  taskList.push(t);
  const res = updateDatabase("ad", t);
  // call a web api to update the database on the server
  render();
  console.log(taskList);
}

function init() {
  console.log("init called")
  task = new Task("welcome task", "2020-05-22", false);
  addTask(task);
  console.log(task);
}

function updateDatabase(operation, tObj) {
  var xhttp = new XMLHttpRequest();
  if (operation == "del") {
    const data = tObj;
    var url = "http://127.0.0.1:5000/delete/" + data;
    xhttp.open("GET", url, true);
  }
  if (operation == "ad") {
    const data =
      tObj.taskId + "-" + tObj.name + "-" + tObj.dueDate + "-" + tObj.isDone;
    var url = "http://127.0.0.1:5000/ad/" + data;
    xhttp.open("GET", url, true);
  }
  if (operation == "display") {
    var url = "http://127.0.0.1:5000/display/";
    xhttp.open("GET", url, true);
  }
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      var result = JSON.parse(xhttp.responseText);
      console.log(result);
    }
    return result;
  };
}

init();