import React, { Component } from 'react';
import { Route /* , Link */ , NavLink, Switch /* , Redirect */ } from 'react-router-dom'; // Package for routing
import './Blog.css';
// Use this cmd: 'npm install axios --save' in the 'Integrated Terminal of VS CODE' or 'Terminal of Windows' to install it
// Promise based HTTP client for the browser and node.js => Automatic transforms for JSON data 
/* import axios from 'axios'; */

// Will use the 'axios instance' [my_axios.js] instead of the 'axios' => Same result
/* import axiosInstance from '../../my_axios'; */

import asyncComponent from '../../hoc_higher-order-components/asyncComponent';
import Posts from './Posts/Posts';
/* import Post from '../../components/Post/Post';
import NewPost from './NewPost/NewPost';
import FullPost from './FullPost/FullPost'; */

// Loading 'Routes Lazily' =>::
// ==> I am only importing this path './NewPost/NewPost' when this const 'AsyncNewPost' is used somewhere
// =====> ALL This 'to not using Data when we are don't want it'
const AsyncNewPost = asyncComponent(() => { 
    // 'import()' :: 'Special Syntax (Dynamic import Syntax)' => What ever it comes between the '() [ of import() ]' 
    // => Is 'only imported' when the 'func [ asyncComponent(() => { ... } ] is executed' and it's executed when we render 'AsyncNewPost' to the screen
    return import('./NewPost/NewPost');
});

class Blog extends Component {
    state = {
        auth: true // false
    };

    // The Parts: 1. ==> 5. :: Was moved to [Posts.js]

    // 1.
    /* state = {
        posts: [],
        selectedPostId: null,
        errorX: false
    } */

    // 2.
    /* componentDidMount () {
        // We removed this one below & replace it with a 'short URL' 
        // => because we will be using the "baseURL = 'https://jsonplaceholder.typicode.com';"
        // => defined in 'index.js' => As the 'default GLOBAL start' of 'baseURL'
        /////// axios.get('https://jsonplaceholder.typicode.com/posts')

        // We will replace this one by the other one 'instanceAxios' from 'my_axios.js' file
        // => they do the same work
        ///// axios.get('/posts')
        
        axiosInstance.get('/posts') 
              // then() => A method takes a func as output => Will get executed once the promise resolves 
              //                                           => Once Data from Back-End are there
             .then(response => {
                 const posts = response.data.slice(0, 4); // slice(0, 4) => To only 'fetch' the 'first 4 Posts'
                 const updatedPosts = posts.map(post => {
                     return {
                        // Distribute the properties of 'post' and Copy it in immutable way
                        ...post,
                        // Here we transformed our Data returned from the server
                        // BY adding the 'author' field for exmple
                        author: 'Walid'
                     }
                 });              
                 // this.setState({posts: response.data});
                 this.setState({posts: updatedPosts});
                 console.log(updatedPosts);
             })
             .catch(error => {
                 this.setState({errorX: true});
                 // We can 'Delete' this one 'below' because we have a general 'interceptor' for all over the project
                 // who handle the 'errors' in 'resquest' & 'response'
                 console.log('[componentDidMount] => [catch] => [Error] => ',error);
             });
    } */

    // 3.
    /* postSelectedHanlder = (id) => {
        this.setState({selectedPostId: id});
    } */

    render () {
        // 4.
        /* let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        if (!this.state.errorX) {
            posts = this.state.posts.map(post => {
                return <Post key={post.id} 
                             title={post.title} 
                             author={post.author} 
                             clicked={() => this.postSelectedHanlder(post.id)} />;
            });
        } */
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            {/* 'Link' => Allow to us to just 're-rendering' part of 'page' that 'we want'
                                   => 'without' 'sending a request and RELOADING the whole PAGE and TAB' in browser
                                   => So Quick and Fast waaaw <3 */} 
                            {/* <li><Link to="/">Home</Link></li>
                            <li><Link to={{
                                // Relative Path
                                ////// pathname: this.props.match.url + '/new-post',
                                // Absolute Path
                                pathname: '/new-post',
                                // Some advanced options below
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }} >New Post</Link></li> */}

                           {/*  'NavLink' => 'Same' as 'Link' but it's has 'other features (props)' 
                                          => Will add 'class=active' when ispecting an 'active NavBar (Home, New Post)' 
                                'activeClassName' => To Setup a specific 'class name' for the 'NavLink'
                                'activeStyle' => To Setup a specific 'style' for the 'NavLink' */} 
                            <li><NavLink // to="/"
                                         to="/posts/" // 'Nested Route'
                                         exact 
                                         activeClassName="my-active" 
                                         activeStyle={{
                                             color: '#fa923f',
                                             textDecoration: 'underline'
                                         }}>Posts</NavLink></li>
                            <li><NavLink to={{
                                // Relative Path
                                ////// pathname: this.props.match.url + '/new-post',
                                // Absolute Path
                                pathname: '/new-post',
                                // Some advanced options below
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* We are using the 'Routing Object' 
                => 'exact' :: when 'React' found this 'exact route "/" (== <li><a href="/">Home</a></li>)'
                => He will 'render' '<h1>Home</h1>' 
                => it can be 1 or more content to render if the exact route found 
                => for example we can render also '<h1>Home #2</h1>' */}
                {/* <Route path="/" exact render={() => <h1>Home</h1>} />
                <Route path="/" exact render={() => <h1>Home #2</h1>} /> */}

                {/* In case we dont have 'exact' (== false) => if a route start with "/" it will render that content */}
                {/* <Route path="/" render={() => <h1>Home #3</h1>} /> */}

                {/* Same as i explained in the other examples but here instead of 'hard coding' in the 'render method'
                    ==> We use the 'component' attribute and affect to it an 'Object' */}
                {/* Switch tells React: 'Please load 1 of the routes, the 1st one actually'
                => The 1st that match the given path will be loaded
                => AND then after 'React' stop analysing the routes and don't render them
                => NB: the order of 'Routes' if very important for 'Switch' => 'Specific Routes' (exmpl: '/A/B') should be 'before General Route' (exmpl: '/A') */}
                {/* <Route path="/" exact component={Posts} /> */}
                <Switch>
                    {/* "/new-post" => 1st in order, to not let "/" consume it ("/new-post"), if it ("/") was the 1st */}                                 
                    {/* Working with 'Guards':: if user is 'authenticated' => Redirect to "/new-post" else NO */}
                    {/* {this.state.auth ? <Route path="/new-post" component={NewPost} /> : null} */}

                    {/* Loading Routes Lazily => ALL This to not using Data when we are don't want it */}
                    {this.state.auth ? <Route path="/new-post" component={AsyncNewPost} /> : null}
                    
                    {/* <Route path="/" component={Posts} /> */} {/* 'exact' => removed to give Access to the Nested Route on [Posts.js] file  */}
                    <Route path="/posts" component={Posts} />
                    
                    {/* Resolving Unknown Routes with this simple way */}
                    <Route render={() => <h1>Not Found!</h1>} />

                    {/* When React found this path "/" it will auto redirect to this path "/posts" */}
                    {/* <Redirect from="/" to="/posts" /> */}

                    {/* This Route is moved to [Posts.js] file AS 'Nested Route' */}
                    {/* <Route path="/:id" exact component={FullPost} /> */}  {/* ':id' => Param to get after the '/' is an 'id' */}
                </Switch>
                
                {/* <Posts /> */}

                {/* 5. */}
                {/* <section className="Posts">
                    {posts}
                </section> */}

                {/* <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section> */}
            </div>
        );
    }
}

export default Blog;