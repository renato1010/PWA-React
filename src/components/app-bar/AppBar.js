import React from 'react';
import AppBar from 'material-ui/AppBar';
import ActionAccount from 'material-ui/svg-icons/action/account-circle';
import { white } from 'material-ui/styles/colors';
const iconStyles = {
  color: white,
  marginTop: 10
};

const TopBar = () => (
  <AppBar 
    title="PWA-REACT"
    iconElementRight={<ActionAccount style={iconStyles}>account_circle</ActionAccount>}
  />
);
export default TopBar;
