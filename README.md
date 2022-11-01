# To-Do List
A fullstack web app that allows users to add tasks to a to-do list. Live demo [_here_](https://json-to-do-list.netlify.app/). 

NOTE: Server may take up to 90 seconds to load. If no data has been loaded in 90 seconds, please refresh the webpage.

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Frontend Features](#frontend-features)   
* [Backend Features](#backend-features)
  * [GET](#get)
  * [POST](#post)
  * [PUT](#put)
  * [DELETE](#delete)
* [Screenshots](#screenshots)
* [Setup](#setup)
* [Project Status](#project-status)
* [To Do](#to-do)
* [Contact](#contact)
<!-- * [License](#license) -->


## General Information
This project was a part of my Fullstack Open coursework. The objectives were to learn how to:
  - render collections
  - handle forms in React
  - use Node and Express to develop a server
  - retrieve/alter data in the server
  - save data to MongoDB.


## Technologies Used
- Axios - version 1.1.3
- CORS - version 2.8.5
- Dotenv - version 16.0.3
- Express - version 4.18.2
- JSON-Server - version 0.17.0
- Mongoose - version 6.7.0
- Nodemon - version 2.0.20
- React - version 18.2.0

## Frontend Features
- Add task to the to-do
- Change the importance status of a specific task

## Backend Features
- Server hosted on [Render](https://to-do-backend.onrender.com/api/tasks). The following is the documentation for the REST API to GET, POST, or PUT tasks.

### GET
  Returns json data for all stored tasks.

* **URL**
https://to-do-backend.onrender.com/api/tasks

* **Method:**
  `GET`
  
*  **URL Params**
   **Required:**
  None

* **Data Params:**
  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    `[{ content: "Bake brownies", date: "2022-10-28T17:20:49.920Z", important: false, id: "635c0f71d308baf3f71be294"}, {content: "Sweep the floor", date: "2022-10-28T17:38:02.789Z", important: true, id: "635c137ad308baf3f71be299" }]`

* **Sample Call:**

 ```javascript
  app.get('/api/tasks', (request, response) => {
    Task.find({})
    .then( task => {
        response.json(task);
    })
  });
  ```

Returns json data for a single task.

* **URL**
 https://to-do-backend.onrender.com/api/tasks/:id

* **Method:**
  `GET`
  
*  **URL Params**
   **Required:**
   `id=[string]`

* **Data Params:**
  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{ content: "Bake brownies", date: "2022-10-28T17:20:49.920Z", important: false, id: "635c0f71d308baf3f71be294"}]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />

* **Sample Call:**

  ```javascript
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

  ```
----
### POST
  Returns json data for all tasks, including the newly added task.

* **URL**
  https://to-do-backend.onrender.com/api/tasks

* **Method:**
  `POST`
  
*  **URL Params**
   **Required:** None

* **Data Params:**
  `name=[string] number=[string]`

* **Success Response:**

    **Content:** `[{ content: "Bake brownies", date: "2022-10-28T17:20:49.920Z", important: false, id: "635c0f71d308baf3f71be294"}, {content: "Sweep the floor", date: "2022-10-28T17:38:02.789Z", important: true, id: "635c137ad308baf3f71be299" }, {content: "Walk the dog", date: "2022-10-28T17:38:27.599Z", important: true, id: "635c1393d308baf3f71be29b" }]`
 
* **Error Response:**

  * **Code:** 400: Content is missing <br />

* **Sample Call:**

  ```javascript
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

  ```
----
### PUT
  Changes a task's importance status and returns the json data of the updated task.

* **URL**
 https://to-do-backend.onrender.com/api/tasks/:id

* **Method:**
  `PUT`
  
*  **URL Params**
   **Required:**
   `id=[string]`

* **Data Params:**
None

* **Success Response:**

  * **Code:** `{ content: "Bake brownies", date: "2022-10-28T17:20:49.920Z", important: true, id: "635c0f71d308baf3f71be294"}` <br />
 
* **Error Response:**

  * **Code:** ERROR <br />

* **Sample Call:**
  ```javascript
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
  ```
  ----
### DELETE
  Deletes a task.

* **URL**
 https://to-do-backend.onrender.com/api/tasks/:id

* **Method:**
  `DELETE`
  
*  **URL Params**
   **Required:**
   `id=[string]`

* **Data Params:**
None

* **Success Response:**

  * **Code:** `204: Deleted` <br />
 
* **Error Response:**

  * **Code:** ERROR <br />

* **Sample Call:**
  ```javascript
  app.delete('/api/tasks/:id', (request, response) => {
    Task.findByIdAndRemove(request.params.id)
    .then( task => {
        console.log("Deleted");
        response.status(204).end();
    })
    .catch(error => next(error));
  });
  ```
  
## Screenshots
<img src="https://user-images.githubusercontent.com/63388515/199151990-5d7e43f6-1fd4-43ff-b4c5-f72776294874.png" width="800">



## Setup
Front End: 
To run the react app, open a terminal and run the following commands: 
```
$ cd ./to-do-list
$ npm install
$ npm start
```
Server: 
The server fetches data from a MongoDB database. In order for the server to fetch the data, a MongoDB connection string is needed. Use this [_link_](https://www.mongodb.com/docs/atlas/getting-started/?_ga=2.104022022.76030571.1667256481-1277371948.1666533578) to create a database. After a connection string has been generated, store it in the environment variable MONGODB_URI. Once the environment variable has been added, open a new terminal and run the following commands: 
```
$ cd ./backend
$ npm install
$ npm run dev
```

## Project Status
Project is: _in progress_ 

## To Do
- A delete button that allows users to delete a task.

## Contact
Contact me [here](https://makaylaandersontucker.netlify.app/contact.html)!

<!-- ## License -->
<!-- This project is open source and available under the [MIT License](). -->
