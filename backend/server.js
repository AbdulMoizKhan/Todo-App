const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001
const mongoose = require('mongoose')


mongoose.connect("mongodb://127.0.0.1:27017/todo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const userSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
});

const taskSchema = new mongoose.Schema({
  userId: mongoose.Schema.ObjectId,
  tasks: [
    {
      checked: Boolean,
      text: String,
      id: String,
    },
  ],
});

const Task = mongoose.model("tasks", taskSchema)

const User = mongoose.model("User", userSchema)

app.use(cors());
app.use(express.json())

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).exec();

  if (user) {
    res.status(409).json({
      message: "Username already exists",
    });
    return;
  }
  await User.create({ username, password });
  res.json({
    message: "success",
  });

});


app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).exec();
  console.log("login req.body",username,password)
  if (!user || user.password !== password) {
    res.status(401).json({
      message: "Invalid Login Credentials",
    });
    return;
  }

  res.json({
    message: "success",
  });
});

app.post('/tasks', async (req, res) => {
  const newTasks = req.body;
  const { authorization } = req.headers;

  console.log(newTasks)

  const base64Credentials = authorization.slice('Basic '.length);

  const [username, password] = base64Credentials.split(':');

  const user = await User.findOne({ username }).exec();

  if (!user || user.password != password) {
    res.status(401).json({
      message: "Invalid Access"
    });
    return;
  }

  const tasks = await Task.findOne({ userId: user._id }).exec();
  if (!tasks) {
    await Task.create({
      userId: user._id,
      tasks: newTasks,
    });
  } else {
    tasks.tasks = newTasks;
    await tasks.save();
  }
  res.json(tasks.tasks);
});


app.delete('/tasks/:id', async (req, res) => {
  const taskId_frontend = req.params.id;
  const { authorization } = req.headers;
  const slicing = authorization.slice('Basic '.length);
  const [username, password] = slicing.split(':');

  const user = await User.findOne({ username }).exec();

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const task = await Task.findOne({ userId: user._id, "tasks.id": taskId_frontend }).exec();

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  task.tasks = task.tasks.filter((taskItem) => taskItem.id !== taskId_frontend);

  await task.save();

  res.json({ message: 'Task deleted successfully' });
});
app.get('/tasks', async (req, res) => {

  const { authorization } = req.headers;
  console.log(authorization)
  const base64Credentials = authorization.slice('Basic '.length);
  const [username, password] = base64Credentials.split(':');
 
  const user = await User.findOne({ username }).exec();

  const tasks  = await Task.findOne({ userId: user._id }).exec();

  if (!user || user.password != password) {
    res.status(401).json({
      message: "Invalid Access"
    });
    return;
  }

  if (tasks == null ){
    await Task.create({
      userId: user._id,
      tasks: [],
    });
  }
    else{
      res.json(tasks);
    }
});


app.get('/', (req, res) => {
  res.send('Hello, this is the root route.');
});

const db = mongoose.connection;
db.on('error', console.error);
db.once("open", function () {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  console.log("Connected to MongoDB")
})