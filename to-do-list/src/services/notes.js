import axios from 'axios';

const baseUrl = "https://to-do-backend.onrender.com/api/tasks";

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
    
};

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data);
};

const updateOne = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then(response => response.data);
};

export default { getAll, create, updateOne };