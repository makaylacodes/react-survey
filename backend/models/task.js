const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;
 
mongoose.connect(url)
.then(result => {
    console.log("Connected to MongoDB")
})
.catch(error => console.log("error connecting to mongodb: ", error.message));

const taskSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
});

taskSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
});

module.exports = mongoose.model('Task', taskSchema);
