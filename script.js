window.addEventListener("load", () => {
  const form = document.querySelector("#task-form");
  const input = document.querySelector("#task-input");
  const deadlineInput = document.querySelector("#task-deadline");
  const list = document.querySelector("#tasks");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = input.value;
    const taskDeadline = deadlineInput.value;
    if (!task) {
      return;
    }
    const task_div = document.createElement("div");
    task_div.classList.add("task");
    list.appendChild(task_div);
    const task_content_div = document.createElement("div");
    task_content_div.classList.add("content");
    task_div.appendChild(task_content_div);
    const task_input = document.createElement("input");
    task_input.classList.add("text");
    task_input.type = "text";
    task_input.value = task;
    task_input.setAttribute("readonly", "readonly");
    task_content_div.appendChild(task_input);
    const task_deadline_input = document.createElement("input");
    task_deadline_input.classList.add("deadline");
    task_deadline_input.type = "text";
    task_deadline_input.value = formatDate(taskDeadline);
    task_deadline_input.setAttribute("readonly", "readonly");
    task_content_div.appendChild(task_deadline_input);
    const task_actions_div = document.createElement("div");
    task_actions_div.classList.add("actions");
    task_div.appendChild(task_actions_div);
    const task_edit_botton = document.createElement("button");
    task_edit_botton.classList.add("Edit");
    task_edit_botton.innerHTML = "Edit";
    const task_delete_button = document.createElement("button");
    task_delete_button.classList.add("Delete");
    task_delete_button.innerHTML = "Delete";
    const task_pending_button = document.createElement("button");
    
    task_pending_button.classList.add("done");
    task_pending_button.innerHTML = "done";
    task_actions_div.appendChild(task_edit_botton);
    task_actions_div.appendChild(task_pending_button);
    task_actions_div.appendChild(task_delete_button);
    task_edit_botton.addEventListener("click", () => {
      if (task_edit_botton.innerText.toLowerCase() == "edit") {
        task_input.removeAttribute("readonly");
        task_input.focus();
        task_edit_botton.innerText = "Save";
        task_input.style.textDecoration = "none";
      } else {
        task_input.setAttribute("readonly", "readonly");
        task_edit_botton.innerText = "Edit";
      }
    });
    task_delete_button.addEventListener("click", () => {
      list.removeChild(task_div);
      updateTaskCount();
    });
    task_pending_button.addEventListener("click", () => {
      task_input.style.textDecoration = "line-through";
      task_input.setAttribute("readonly", "readonly");
      updateTaskCount();
    });
    input.value = "";
    deadlineInput.value = "";
    updateTaskCount();
  });
  function formatDate(dateString) {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  }

  function setReminder(taskDiv, deadline) {
    const now = new Date();
    const taskDeadline = new Date(deadline);
    const timeDiff = taskDeadline - now;

    if (timeDiff > 0) {
      setTimeout(() => {
        alert(
          `Reminder: Task deadline approaching for "${
            taskDiv.querySelector(".text").value
          }"!`
        );
      }, timeDiff);
    }
  }

  function updateTaskCount() {
    const completedTasks = document.querySelectorAll('.task input[readonly][style="text-decoration: line-through;"]').length;
    const pendingTasks = document.querySelectorAll('.task input[readonly]:not([style="text-decoration: line-through;"])').length;
    const completedCountElement = document.getElementById('completed-count');
    const notCompletedCountElement = document.getElementById('pending-count');
    completedCountElement.textContent = `Completed: ${completedTasks}`;
    notCompletedCountElement.textContent = `Pending: ${pendingTasks}`;

    const tasks = document.querySelectorAll(".task");
    tasks.forEach((task) => {
      const deadlineInput = task.querySelector(".deadline");
      const deadline = deadlineInput.value;
      if (deadline) {
        const taskDiv = task;
        setReminder(taskDiv, deadline);
      }
    });
  }
});
