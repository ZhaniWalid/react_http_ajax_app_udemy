import React, { Component } from 'react';
// Will use the 'axios instance' [my_axios.js] instead of the 'axios' => Same result
import axiosInstance from '../../../my_axios';
import Post from '../../../components/Post/Post';
import { /* Link, */ Route } from 'react-router-dom';
import FullPost from '../FullPost/FullPost';
import './Posts.css';

class Posts extends Component {
    state = {
        posts: [],
        /* selectedPostId: null,
        errorX: false */
    }

    componentDidMount () {
        // We removed this one below & replace it with a 'short URL' 
        // => because we will be using the "baseURL = 'https://jsonplaceholder.typicode.com';"
        // => defined in 'index.js' => As the 'default GLOBAL start' of 'baseURL'
        /* axios.get('https://jsonplaceholder.typicode.com/posts') */

        // We will replace this one by the other one 'instanceAxios' from 'my_axios.js' file
        // => they do the same work
        /* axios.get('/posts') */
        
        console.log('[Posts.js] => { this.props:', this.props,' }');
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
                 //// this.setState({errorX: true});
                 // We can 'Delete' this one 'below' because we have a general 'interceptor' for all over the project
                 // who handle the 'errors' in 'resquest' & 'response'
                 console.log('[componentDidMount] => [catch] => [Error] => ',error);
             });
    }

    postSelectedHanlder = (id) => {
        // this.setState({selectedPostId: id});

        // These is a way that help to navigate 'programmatically' =~= <Link to={'/' + post.id}> </Link'>
        // this.props.history.push({pathname: '/' + id});
        // ==== this.props.history.push( '/' + id);

        // 'programmatically' =~= <Link to={'/posts/' + post.id}> </Link'> & Also As 'Nested Route'
        this.props.history.push({pathname: '/posts/' + id});
        // ==== this.props.history.push( '/posts/' + id);
    }

    render () {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        if (!this.state.errorX) {
            posts = this.state.posts.map(post => {
                return (
                    // <Link to={'/' + post.id} key={post.id}>
                    // <Link to={'/posts/' + post.id} key={post.id}> // 'Nested Route'
                        <Post   title={post.title}
                                key={post.id}                         
                                author={post.author}
                                clicked={() => this.postSelectedHanlder(post.id)} />
                    // </Link>
                );
            });
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                {/* This is a 'Nested Route' */}
                {/* <Route path="/:id" exact component={FullPost} /> */}
                <Route path={this.props.match.url + '/:id'} exact component={FullPost} /> {/* 'Nested Route' == "/posts/:id" => Dynamic Way */}
            </div>
            
        );
    }
}

export default Posts;