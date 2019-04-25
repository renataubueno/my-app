import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Draggable from 'react-draggable';
import Pubsub from 'pubsub-js';
import TextField from '@material-ui/core/TextField';

export default class ObjetoEditor extends Component{
  constructor(props){
    super(props);
    this.state = {
        open: false
    }

    this._handleDoubleClickOpen = this._handleDoubleClickOpen.bind(this);
    this._handleDoubleClickClose = this._handleDoubleClickClose.bind(this);
  }

  _handleDoubleClickOpen(event): void {
    this.setState({open: true});
  };

  _handleDoubleClickClose(event): void {
    this.setState({open: false});
  };

  handleChange = parametro => event => {
    this.setState({ [parametro]: parseInt(event.target.value) });
  };

  handleChangeFloat = parametro => event => {
    this.setState({ [parametro]: parseFloat(event.target.value) });
  };

  render(){

    return(
      <div>
      </div>
    );
  }
}
