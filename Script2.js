// Get DOM elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const pendingTasksList = document.getElementById('pending-tasks-list');
const completedTasksList = document.getElementById('completed-tasks-list');

// Create a task object with timestamp
function createTaskObject(task) {
  const timestamp = new Date().toLocaleString();
  return {
    task,
    timestamp,
    completed: false
  };
}

// Add a new task
function addTask(event) {
  event.preventDefault();
  const task = taskInput.value.trim();
  if (task !== '') {
    const newTask = createTaskObject(task);
    appendTaskElement(newTask);
    taskInput.value = '';
  }
}

// Append task element to the pending tasks list
function appendTaskElement(taskObj) {
  const li = document.createElement('li');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('change', completeTask);
  const taskSpan = document.createElement('span');
  taskSpan.innerText = taskObj.task;
  const timestampSpan = document.createElement('span');
  timestampSpan.className = 'timestamp';
  timestampSpan.innerText = taskObj.timestamp;
  li.appendChild(checkbox);
  li.appendChild(taskSpan);
  li.appendChild(timestampSpan);
  appendDeleteButton(li);
  pendingTasksList.appendChild(li);
}

// Mark a task as complete
function completeTask() {
  const li = this.parentNode;
  const taskText = li.querySelector('span:not(.timestamp)').innerText;
  const timestamp = li.querySelector('.timestamp').innerText;
  const completedTask = createTaskObject(taskText);
  completedTask.timestamp = timestamp;
  completedTask.completed = true;
  appendCompletedTaskElement(completedTask);
  li.remove();
}

// Append task element to the completed tasks list
function appendCompletedTaskElement(taskObj) {
  const li = document.createElement('li');
  li.className = 'completed-task';
  const taskSpan = document.createElement('span');
  taskSpan.innerText = taskObj.task;
  const timestampSpan = document.createElement('span');
  timestampSpan.className = 'timestamp';
  timestampSpan.innerText = taskObj.timestamp;
  li.appendChild(taskSpan);
  li.appendChild(timestampSpan);
  appendDeleteButton(li);
  completedTasksList.appendChild(li);
}

// Delete a task
function deleteTask() {
  const li = this.parentNode;
  li.remove();
}

// Append delete button to task element
function appendDeleteButton(li) {
  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-button';
  deleteButton.innerHTML = '&times;';
  deleteButton.addEventListener('click', deleteTask);
  li.appendChild(deleteButton);
}

// Event listeners
taskForm.addEventListener('submit', addTask);
