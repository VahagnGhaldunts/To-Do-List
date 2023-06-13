const express = require('express');
const app = express();
app.use(express.json());
let tasks = [];

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const { title, deadline } = req.body;
  const newTask = {
    id: tasks.length + 1, 
    title,
    deadline,
    completed: false
  };
  tasks.push(newTask);
  console.log(newTask);
  res.json(newTask);
});

app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  const taskToUpdate = tasks.find((t) => t.id === parseInt(id));
  if (!taskToUpdate) return res.status(404).send('Առաջադրանքը չի գտնվել։');
  taskToUpdate.task = task;
  res.json(taskToUpdate);
});

app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex((t) => t.id === parseInt(id));
  if (taskIndex === -1) return res.status(404).send('Առաջադրանքը չի գտնվել։');
  const deletedTask = tasks.splice(taskIndex, 1);
  res.json(deletedTask[0]);
});

app.patch('/api/tasks/:id/deadline', (req, res) => {
  const { id } = req.params;
  const { deadline } = req.body;
  const taskToUpdate = tasks.find((t) => t.id === parseInt(id));
  if (!taskToUpdate) return res.status(404).send('Առաջադրանքը չի գտնվել։');
  taskToUpdate.deadline = deadline;
  res.json(taskToUpdate);
});

app.patch('/api/tasks/:id/completed', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const taskToUpdate = tasks.find((t) => t.id === parseInt(id));
  if (!taskToUpdate) return res.status(404).send('Առաջադրանքը չի գտնվել։');
  taskToUpdate.completed = completed;
  res.json(taskToUpdate);
});

app.get('/api/tasks/completed', (req, res) => {
  const completedTasks = tasks.filter((t) => t.completed);
  res.json({ count: completedTasks.length });
});

app.get('/api/tasks/incomplete', (req, res) => {
  const incompleteTasks = tasks.filter((t) => !t.completed);
  res.json({ count: incompleteTasks.length });
});

app.get('/api/tasks/deadline', (req, res) => {
  const tasksWithDeadline = tasks.filter((t) => t.deadline);
  res.json(tasksWithDeadline);
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});