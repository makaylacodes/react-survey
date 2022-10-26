
const express = require('express'); 
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
let tasks = [
    {
      "id": 1,
      "content": "HTML is easy",
      "date": "2022-1-17T17:30:31.098Z",
      "important": true
    },
    {
      "id": 2,
      "content": "Browser can execute only JavaScript",
      "date": "2022-1-17T18:39:34.091Z",
      "important": true
    },
    {
      "id": 3,
      "content": "GET and POST are the most important methods of HTTP protocol",
      "date": "2022-1-17T19:20:14.298Z",
      "important": false
    }
];

app.get('/', (request, response) => {
    response.sendStatus(202);
});

app.get('/api/tasks', (request, response) => {
    response.json(tasks);
});

app.get('/api/tasks/:id', (request, response) => {
    const id = Number(request.params.id);
    const task = tasks.find(task => task.id === id);
    if (task) {
        response.json(task);
    } else {
        response.status(404).end();
    }
});
app.delete('/api/tasks/:id', (request, response) => {
    const id = Number(request.params.id);
    tasks = tasks.filter(task => task.id !== id);
    response.status(404).end();
});

const generateId = () => {
    const maxId = tasks.length > 0
    ?  Math.max(...tasks.map(t => t.id))
    : 0;
    return maxId + 1;
};

app.post('/api/tasks', (request, response) => {
    const body = request.body;
    if(!body.content){
        return response.status(400).json({ error: "Content is missing"});
    }

    const task = {
        id: generateId(),
        content: body.content,
        date: new Date(),
        important: body.important || false
    };
    tasks = tasks.concat(task);
    response.json(task);

});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});