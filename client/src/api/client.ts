import axios from 'axios';

const client = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }

})
client.interceptors.request.use((config) => {
const token = localStorage.getItem("clientToken");
if (token) {
config.headers.Authorization = `Bearer ${token}`;
}
return config;
});

export default client