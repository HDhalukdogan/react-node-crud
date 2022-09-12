import axios from "axios";

axios.defaults.baseURL = 'http://localhost:5090/api/';
const responseBody = (response) => response.data


const request = {
    get: (url) => axios.get(url).then(responseBody),
    post: (url, body) => axios.post(url, body).then(responseBody),
    put: (url, body) => axios.put(url, body).then(responseBody),
    delete: (url) => axios.delete(url).then(responseBody),
    postForm: (url, data) => axios.post(url, data, {
        headers: { 'Content-type': 'multipart/form-data' }
    }).then(responseBody),
    putForm: (url, data) => axios.put(url, data, {
        headers: { 'Content-type': 'multipart/form-data' }
    }).then(responseBody)
}

const SampleCrud = {
    create: (sampleCreate) => request.post('save', sampleCreate),
    list: () => request.get('getAll'),
    details: (id) => request.get(`getById/${id}`),
    delete: (id) => request.delete(`delete/${id}`),
    update: (sampleUpdate) => request.put('update', sampleUpdate)
}

const agent = {
    SampleCrud
}
export default agent;