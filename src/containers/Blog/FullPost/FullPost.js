import React, { Component } from 'react';
import axios from 'axios';
import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    }

    // componentDidUpdate () {}
    componentDidMount () {
        console.log('[FullPost.js] => { this.props: ', this.props, ' }');
        this.loadData();

        ///// Movoed to 'loadData()' method
        // if (this.props.id) {
        /* 'this.props.match.params.id' => Related to '<Route path="/:id" exact component={FullPost} />' in [Blog.js]
                                        => To match the 'id' passed in 'params' and see if it's 'true'  */
        if (this.props.match.params.id) {    
            // To get only the 'Data' for a new 'post'
            if ( !this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.match.params.id) ) {
            // We removed this one below & replace it with a 'short URL' 
            // => because we will be using the "baseURL = 'https://jsonplaceholder.typicode.com';" 
            // => defined in 'index.js' => As the 'default GLOBAL start' of 'baseURL'
            /* axios.get('https://jsonplaceholder.typicode.com/posts/'+ this.props.id) */
            ////// axios.get('/posts/'+ this.props.id)
            axios.get('/posts/'+ this.props.match.params.id)
                 .then(response => {
                    this.setState({loadedPost: response.data});
                    console.log(response);
                 });
            }           
        }

    }

    componentDidUpdate () {
        this.loadData();
    }

    loadData () {
        // if (this.props.id) {
        /* 'this.props.match.params.id' => Related to '<Route path="/:id" exact component={FullPost} />' in [Blog.js]
                                        => To match the 'id' passed in 'params' and see if it's 'true'  */
        if (this.props.match.params.id) {    
            // To get only the 'Data' for a new 'post'
            // '+this.props.match.params.id' ==> '+' :: to convert the 'id' from 'string TO number'
            if ( !this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== +this.props.match.params.id) ) {
                // We removed this one below & replace it with a 'short URL' 
                // => because we will be using the "baseURL = 'https://jsonplaceholder.typicode.com';" 
                // => defined in 'index.js' => As the 'default GLOBAL start' of 'baseURL'
                /* axios.get('https://jsonplaceholder.typicode.com/posts/'+ this.props.id) */
                ////// axios.get('/posts/'+ this.props.id)
                axios.get('/posts/'+ this.props.match.params.id)
                     .then(response => {
                        this.setState({loadedPost: response.data});
                        console.log(response);
                      });
            }           
        }
    }

    deletePostHandler = () => {
        // We removed this one below & replace it with a 'short URL' 
        // => because we will be using the "baseURL = 'https://jsonplaceholder.typicode.com';" 
        // => defined in 'index.js' => As the 'default GLOBAL start' of 'baseURL'
        /* axios.delete('https://jsonplaceholder.typicode.com/posts/'+ this.props.id) */
        // axios.delete('/posts/'+ this.props.id)
        axios.delete('/posts/'+ this.props.match.params.id)
             .then(response => {
                 console.log(response);
             });
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        // if the 'id'(s) that we are getting from the server are >= 1 (id >= 1) => Output the 'post'
        // if (this.props.id) {
        if (this.props.match.params.id) {    
            post = <p style={{textAlign: 'center'}}>Loading...!</p>;
        }     
        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>   
            );
        }       
        return post;
    }
}

export default FullPost;