const taskInput = document.getElementById("input-task");
const inputBtn = document.getElementById("input-button");
const listAddSection = document.getElementById("footer");

inputBtn.addEventListener("click", addTask);

function addTask() {
  if (taskInput.value === "") {
    return;
  }

  let list = document.createElement("li");

  let checkboxInput = document.createElement("input");
  checkboxInput.type = "checkbox";
  checkboxInput.className = "input-checkbox";
  checkboxInput.setAttribute("onclick", "strikeText(event)");
  list.append(checkboxInput);

  let inputText = document.createTextNode(taskInput.value);
  let spanTag = document.createElement("span");
  spanTag.append(inputText);
  list.append(spanTag);

  let createInputRename = document.createElement("input");
  createInputRename.type = "text";
  createInputRename.style.visibility = "hidden";
  createInputRename.className = "edit-inputs";
  list.append(createInputRename);

  let editIcon = document.createElement("i");
  editIcon.className = "fa-solid fa-pen-to-square";
  editIcon.setAttribute("onclick", "editTask(event)");
  editIcon.style.visibility = "visible";
  list.append(editIcon);

  let removeTaskIcon = document.createElement("i");
  removeTaskIcon.className = "fa-solid fa-xmark delete";
  removeTaskIcon.setAttribute("onclick", "removeTask(event)");
  removeTaskIcon.style.visibility = "visible";
  list.append(removeTaskIcon);

  let renameCheckButton = document.createElement("i");
  renameCheckButton.className = "fa-regular fa-square-check edit visibleRename";
  renameCheckButton.setAttribute("onclick", "reEnterTaskText(event)");
  renameCheckButton.style.visibility = "hidden";
  list.append(renameCheckButton);

  let cancelRename = document.createElement("i");
  cancelRename.className = "fa-solid fa-xmark edit cancel visibleCancel";
  cancelRename.setAttribute("onclick", "cancelRename(event)");
  cancelRename.style.visibility = "hidden";
  list.append(cancelRename);

  listAddSection.appendChild(list);
  list.className = "task-lists";
  taskInput.value = "";
}

function removeTask(event) {
  let target = event.target.parentElement;
  target.remove();
}

function strikeText(event) {
  const inputTaskText = event.target.nextSibling;

  if (event.target.checked) {
    inputTaskText.style.textDecoration = "line-through";
    inputTaskText.style.opacity = "0.5";
  } else {
    inputTaskText.style.textDecoration = "none";
    inputTaskText.style.opacity = "1";
  }
}

taskInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

function editTask(event) {
  let editIcon = event.target;
  let removeTask = event.target.nextSibling;
  let renameTaskTextIcon = removeTask.nextSibling;
  let cancelRenameIcon = renameTaskTextIcon.nextSibling;
  let renameTaskTextInput = event.target.previousSibling;
  let spanTaskInput = renameTaskTextInput.previousSibling;

  editIcon.style.visibility = "hidden";
  removeTask.style.visibility = "hidden";
  renameTaskTextIcon.style.visibility = "visible";
  cancelRenameIcon.style.visibility = "visible";
  renameTaskTextInput.style.visibility = "visible";
  spanTaskInput.style.visibility = "hidden";

  renameTaskTextInput.value = spanTaskInput.innerHTML;
  renameTaskTextInput.select();
}

function cancelRename(event) {
  let cancelRenameIcon = event.target;
  let renameTaskTextIcon = cancelRenameIcon.previousSibling;
  let removeTask = renameTaskTextIcon.previousSibling;
  let editIcon = removeTask.previousSibling;
  let renameTaskTextInput = editIcon.previousSibling;
  let spanTaskInput = renameTaskTextInput.previousSibling;

  spanTaskInput.style.visibility = "visible";
  renameTaskTextInput.style.visibility = "hidden";
  cancelRenameIcon.style.visibility = "hidden";
  renameTaskTextIcon.style.visibility = "hidden";
  removeTask.style.visibility = "visible";
  editIcon.style.visibility = "visible";
}

function reEnterTaskText(event) {
  let renameTaskTextIcon = event.target;
  let cancelRenameIcon = event.target.nextSibling;
  let removeTask = event.target.previousSibling;
  let editIcon = removeTask.previousSibling;
  let renameTaskTextInput = editIcon.previousSibling;
  let spanTaskInput = renameTaskTextInput.previousSibling;

  renameTaskTextInput.style.visibility = "hidden";
  spanTaskInput.style.visibility = "visible";

  spanTaskInput.innerHTML = renameTaskTextInput.value;

  removeTask.style.visibility = "visible";
  editIcon.style.visibility = "visible";
  cancelRenameIcon.style.visibility = "hidden";
  renameTaskTextIcon.style.visibility = "hidden";
}
