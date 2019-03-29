import React from 'react';
import PersistentDrawerLeft from './LeftSidebar.js';
import Editor from './Editor.js';

export default class App extends React.Component {
  render(){
    return(
      <div>
        <PersistentDrawerLeft />
        <Editor />
      </div>
    );
  }
}
