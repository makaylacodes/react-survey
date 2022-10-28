require('dotenv').config();

const express = require('express'); 
const app = express();
const cors = require('cors');
const Task = require('./models/task');

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
};

app.use(express.json());
app.use(requestLogger);
app.use(cors());

app.get('/', (request, response) => {
    response.sendStatus(202);
});

app.get('/api/tasks', (request, response) => {
    Task.find({})
    .then( task => {
        response.json(task);
    })
});


app.get('/api/tasks/:id', (request, response) => {
    Task.findById(request.params.id)
    .then(task => {
        if (task){
             response.json(task)
        } else {
            response.status(404).end();
        }
    })
}); 
app.put('/api/tasks/:id', (request, response, next) => {
    const body = request.body
  
    const task = {
      content: body.content,
      important: body.important,
    }
  
    Task.findByIdAndUpdate(request.params.id, task, { new: true })
      .then(updatedNote => {
        response.json(updatedNote)
      })
      .catch(error => next(error))
  });

app.delete('/api/tasks/:id', (request, response) => {
    Task.findByIdAndRemove(request.params.id)
    .then( task => {
        console.log("Deleted");
        response.status(204).end();
    })
    .catch(error => next(error));
});

app.post('/api/tasks', (request, response) => {
    const body = request.body
  
    if (body.content === undefined) {
      return response.status(400).json({ error: 'content missing' })
    }
  
    const task = new Task({
      content: body.content,
      important: body.important || false,
      date: new Date(),
    })
  
    task.save().then(savedTask => {
      response.json(savedTask)
    })
  });

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
