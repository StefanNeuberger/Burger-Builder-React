import axios from 'axios';

const instance = axios.create( {
   baseURL: 'https://react-burgerbuilder-365bf.firebaseio.com/'
});

export default instance;