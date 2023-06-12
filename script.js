window.addEventListener("load", () => {
    const form = document.querySelector("#task-form");
    const input = document.querySelector("#task-input");
    const list = document.querySelector("#tasks");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const task = input.value;
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
      const task_actions_div = document.createElement("div");
      task_actions_div.classList.add("actions");
      task_div.appendChild(task_actions_div);
      const task_edit_botton = document.createElement("button");
      task_edit_botton.classList.add("Edit");
      task_edit_botton.innerHTML = "Edit";
      const task_delete_button = document.createElement("button");
      task_delete_button.classList.add("Delete");
      task_delete_button.innerHTML = "Delete";
      const task_done_button = document.createElement("button");
      task_done_button.classList.add("done");
      task_done_button.innerHTML = "done";
      task_actions_div.appendChild(task_edit_botton);
      task_actions_div.appendChild(task_done_button);
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
      task_done_button.addEventListener("click", () => {
        task_input.style.textDecoration = "line-through";
        task_input.setAttribute("readonly", "readonly");
        updateTaskCount();
      });
      input.value = "";
      updateTaskCount();hgfyhgkjykl
    });
    function updateTaskCount() {
      const completedTasks = document.querySelectorAll('.task input[readonly][style="text-decoration: line-through;"]').length;
      const pendingTasks = document.querySelectorAll('.task input[readonly]:not([style="text-decoration: line-through;"])').length;
      const completedCountElement = document.getElementById('completed-count');
      const notCompletedCountElement = document.getElementById('pending-count');
      completedCountElement.textContent = `Completed: ${completedTasks}`;
      notCompletedCountElement.textContent = `Pending: ${pendingTasks}`;
    }
  });

  function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    let todoCount = 0;
    let completedCount = 0;

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');

        if (task.completed) {
            listItem.classList.add('completed');
            completedCount++;
        } else {
            todoCount++;
        }

        if (task.deadline) {
            const deadline = new Date(task.deadline);
            const timeRemaining = deadline - Date.now();

            if (timeRemaining < 0 && !task.completed) {
                listItem.classList.add('approaching-deadline');
            } else if (timeRemaining < 3600000 && !task.completed) {
                alert('The deadline for the task is approaching!');
            }
        }
        const text = document.createElement('span');
        text.textContent = task.text;
        listItem.appendChild(text);
    });
}