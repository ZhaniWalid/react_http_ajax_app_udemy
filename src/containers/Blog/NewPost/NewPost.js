import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max',
        submitted: false
    }

    componentDidMount () {
        // if 'user' NOT authenticated on the page of 'New Post' => this.props.history.replace('/posts'); => Redirect to '/posts'
        console.log('[NewPost.js] => { this.props:', this.props,' }');
    }

    postDataHandler = () => {
        const postData = {
            title: this.state.title,
            body: this.state.content,
            author: this.state.author
        };
        // We removed this one below & replace it with a 'short URL' 
        // => because we will be using the "baseURL = 'https://jsonplaceholder.typicode.com';" 
        // => defined in 'index.js' => As the 'default GLOBAL start' of 'baseURL'
        /* axios.post('https://jsonplaceholder.typicode.com/posts', postData) */
        axios.post('/posts', postData)
             .then(response => {
                 console.log(response);
                 // This way of 'Redirect' will 'replace' the 'current Page'
                 // Let You back to the Prev Page => When you click on the back arrow of the 'Browser'
                 this.props.history.push('/posts'); // 'replace' => Does the same as 'Redirecting' => Will NOT Let You back to the Prev Page  
                 // this.setState({submitted: true});
             });
    }

    render () {
        let redirect = null;
        // Conditionnal Redirect
        if (this.state.submitted) {
            redirect = <Redirect to="/posts" />;
        }

        return (
            <div className="NewPost">
                {redirect}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;