import axios from 'axios';

// This 'baseURL' can be used instead of the one defined on 'index.js'
// => if 'instanceAxios' of [my_axios.js] file is used in the other files [Blog.js], [FullPost.js], [NewPost.js]
const instanceAxios = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

// Will override it for all request using this instance => when he found it => in all over
instanceAxios.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE AXIOS [my_axios.js] HAVE OVERRIDEN THE ONE IN [index.js]';

export default instanceAxios;