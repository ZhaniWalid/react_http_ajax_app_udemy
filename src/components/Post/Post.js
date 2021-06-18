import React from 'react';
// 'withRouter' => Is a 'hoc_higher-order-components'
// import { withRouter } from 'react-router-dom';
import './Post.css';

const post = (props) =>  (  // {
    // console.log(props);
    // return (
        <article className="Post" onClick={props.clicked}>
            <h1>{props.title}</h1>
            <div className="Info">
                <div className="Author">{props.author}</div>
            </div>
        </article>
    // ); 
// };
);

// export default withRouter(post);
export default post;