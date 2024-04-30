const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// mongoose.connect('mongodb+srv://veeger:AlilebmX1332@cluster0.gyyoism.mongodb.net/hupomone?retryWrites=true&w=majority&appName=Cluster0', {
mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true, 
  useUnifiedTopology: true 
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
}, { collection: 'users' });

const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
  const { email, password, username } = req.body;

  // Vérifiez si l'email est déjà utilisé
  const emailExists = await User.findOne({ email });
  if (emailExists) {
      return res.status(400).json({ message: 'Email already in use' });
  }

  // Vérifiez si le nom d'utilisateur est déjà pris
  const usernameExists = await User.findOne({ username });
  if (usernameExists) {
      return res.status(400).json({ message: 'Username already taken' });
  }

  // Validation de l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email) || email.length > 64) {
      return res.status(400).json({ message: 'Invalid email' });
  }

  // Validation du nom d'utilisateur
  if (username.length > 20) {
      return res.status(400).json({ message: 'Username must be under 20 characters' });
  }

  // Validation du mot de passe
  if (password.length < 6 || password.length > 32) {
      return res.status(400).json({ message: 'Password must be between 6 and 32 characters' });
  }

  try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
          username,
          email,
          password: hashedPassword,
      });

      await newUser.save();

      const token = jwt.sign({ email, username }, 'secretKey'); // Assurez-vous d'utiliser une clé secrète plus sécurisée en production
      res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});



app.post('/login', async (req, res) => {
  try {
    const { login, password } = req.body; 
    let user = await User.findOne({
      $or: [{ email: login }, { username: login }]
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid login or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid login or password' });
    }

    const token = jwt.sign({ email: user.email, username: user.username }, 'secretKey'); // Use environment variables for the secret in production
    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/user', (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'No token provided' });
  }
  const token = req.headers.authorization.split(' ')[1];

  try {
    const decodedToken = jwt.verify(token, 'secretKey');
    const { email, username } = decodedToken;

    res.json({ username, email });
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ message: 'Invalid token' }); 
  }
});

//TODO
const todoSchema = new mongoose.Schema({
  text: String,
  isCompleted: Boolean,
  description: { type: String, default: '' }, // Ajout d'un champ pour la description
});


const Todo = mongoose.model('Todo', todoSchema);

app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.send(todos);
});

app.post('/todos', async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    isCompleted: false,
  });
  await todo.save();
  res.send(todo);
});

app.put('/todos/:id', async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, {
    isCompleted: req.body.isCompleted,
  }, { new: true });
  res.send(todo);
});

app.delete('/todos/:id', async (req, res) => {
  try {
    const deletedTodo = await Todo.findOneAndDelete({ _id: req.params.id });
    if (!deletedTodo) {
      return res.status(404).send({ message: 'Todo not found' });
    }
    res.send({ message: 'Todo deleted successfully', deletedTodo });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.put('/todos/:id/description', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, {
      description: req.body.description,
    }, { new: true });

    if (!todo) {
      return res.status(404).send({ message: 'Todo not found' });
    }
    res.send(todo);
  } catch (error) {
    console.error('Error updating todo description:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
