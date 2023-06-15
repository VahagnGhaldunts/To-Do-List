const tasksContainer = document.getElementById("tasks");
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskDeadline = document.getElementById("task-deadline");
const completedCount = document.getElementById("completed-count");
const pendingCount = document.getElementById("pending-count");

const createTaskElement = (task) => {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");

  const taskContent = document.createElement("div");
  taskContent.classList.add("content");
  taskContent.innerHTML = `
    <h3>${task.title}</h3>
    <p>Deadline: ${new Date(task.deadline).toLocaleString()}</p>
    <button class="complete-btn">Complete</button>
    <button class="delete-btn">Delete</button>
  `;

  taskDiv.appendChild(taskContent);
  tasksContainer.appendChild(taskDiv);
};

const fetchTasks = async () => {
  const response = await fetch("/api/tasks");
  const tasks = await response.json();

  tasksContainer.innerHTML = "";
  tasks.forEach((task) => createTaskElement(task));
};

const updateTaskCount = async () => {
  const completedResponse = await fetch("/api/tasks/completed");
  const completedData = await completedResponse.json();

  const incompleteResponse = await fetch("/api/tasks/incomplete");
  const incompleteData = await incompleteResponse.json();

  completedCount.textContent = `Completed: ${completedData.count}`;
  pendingCount.textContent = `Pending: ${incompleteData.count}`;
};

const addTask = async (e) => {
  e.preventDefault();

  const title = taskInput.value;
  const deadline = taskDeadline.value;

  if (!title || !deadline) {
    alert("Please enter a title and deadline for the task.");
    return;
  }

  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, deadline }),
  });

  const newTask = await response.json();
  createTaskElement(newTask);
  taskInput.value = "";
  taskDeadline.value = "";

  updateTaskCount();
};

const completeTask = async (taskId) => {
  const response = await fetch(`/api/tasks/${taskId}/completed`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed: true }),
  });

  const updatedTask = await response.json();
  const taskDiv = document.querySelector(`[data-task-id="${taskId}"]`);
  const completeBtn = taskDiv.querySelector(".complete-btn");
  completeBtn.disabled = true;
  taskDiv.classList.add("completed");

  updateTaskCount();
};

const deleteTask1 = async (taskId) => {
  const response = await fetch(`/api/tasks/${taskId}`, {
    method: "DELETE",
  });

  const deletedTask = await response.json();
  const taskDiv = document.querySelector(`[data-task-id="${taskId}"]`);
  taskDiv.remove();

  updateTaskCount();
};

// Event listener for submitting the task form
taskForm.addEventListener("submit", addTask);

// Event delegation for completing or deleting a task
tasksContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("complete-btn")) {
    const taskDiv = e.target.closest(".task");
    const taskId = taskDiv.getAttribute("data-task-id");
    completeTask(taskId);
  } else if (e.target.classList.contains("delete-btn")) {
    const taskDiv = e.target.closest(".task");
    const taskId = taskDiv.getAttribute("data-task-id");
    deleteTask(taskId);
  }
});

fetchTasks();
updateTaskCount();

const fetchTasks1 = async () => {
  try {
    const response = await fetch("/api/tasks");
    const tasks = await response.json();
    return tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

const createTask = async (title, deadline) => {
  try {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, deadline }),
    });
    const newTask = await response.json();
    return newTask;
  } catch (error) {
    console.error("Error creating task:", error);
  }
};

const updateTask = async (id, title, deadline, completed) => {
  try {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, deadline, completed }),
    });
    const updatedTask = await response.json();
    return updatedTask;
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

const deleteTask = async (id) => {
  try {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });
    const deletedTask = await response.json();
    return deletedTask;
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};

const updateTaskDeadline = async (id, deadline) => {
  try {
    const response = await fetch(`/api/tasks/${id}/deadline`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ deadline }),
    });
    const updatedTask = await response.json();
    return updatedTask;
  } catch (error) {
    console.error("Error updating task deadline:", error);
  }
};

const updateTaskStatus = async (id, completed) => {
  try {
    const response = await fetch(`/api/tasks/${id}/completed`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed }),
    });
    const updatedTask = await response.json();
    return updatedTask;
  } catch (error) {
    console.error("Error updating task status:", error);
  }
};

const fetchCompletedTaskCount = async () => {
  try {
    const response = await fetch("/api/tasks/completed");
    const count = await response.json();
    return count;
  } catch (error) {
    console.error("Error fetching completed task count:", error);
  }
};

const fetchIncompleteTaskCount = async () => {
  try {
    const response = await fetch("/api/tasks/incomplete");
    const count = await response.json();
    return count;
  } catch (error) {
    console.error("Error fetching incomplete task count:", error);
  }
};

const fetchTasksWithDeadlin = async () => {
  try {
    const response = await fetch("/api/tasks/deadline");
    const tasks = await response.json();
    return tasks;
  } catch (error) {
    console.error("Error fetching tasks with deadline:", error);
  }
};
