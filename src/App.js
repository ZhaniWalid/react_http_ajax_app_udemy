import React, { Component } from 'react';
// Use this cmd: 'npm install --save react-router react-router-dom' in the 'Integrated Terminal of VS CODE' or 'Terminal of Windows' to install it
import { BrowserRouter } from 'react-router-dom';
import Blog from './containers/Blog/Blog';

class App extends Component {
  render() {
    return (
      // <BrowserRouter basename="react_http_app" >
      <BrowserRouter>
        <div className="App">
          <Blog />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
