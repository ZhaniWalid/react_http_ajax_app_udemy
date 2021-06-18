import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

// We will use a default GLOBAL 'base URL' for 'all requests' in 'all the project'
// We can use this 'base URL' below OR removed it and use the 'base URL' defined in 'my_axios.js'
// => by importing it like this => 'import axiosInstance from '../../my_axios';'
// => And replacing 'axios' by 'axiosInstance'
// => but we will keep it 
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

// Some other GLOBAL configuration that we can use them
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Make 'Interceptor' to 'handle errors' all over the 'project' 
// => will be shared not only on this 'index.js' file but in all the project files
// => because 'index.js' is the 'main file' for 'all the project' => Globally
// 1. Here we handle the "interceptor's" 'request'
axios.interceptors.request.use(requestConfig => {
    console.log(requestConfig);
    return requestConfig;
}, errorRequest => {
    console.log(errorRequest);
    return Promise.reject(errorRequest);
});

// 2. Here we handle the "interceptor's" 'response'
axios.interceptors.response.use(responseConfig => {
    console.log(responseConfig);
    return responseConfig;
}, errorResponse => {
    console.log('[interceptors] => [response] => [Error] => ',errorResponse);
    return Promise.reject(errorResponse);
});

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
