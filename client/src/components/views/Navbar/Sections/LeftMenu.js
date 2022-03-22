import React from 'react';
import { useSelector } from 'react-redux';
import { Menu } from 'antd';


function LeftMenu(props) {
  const user = useSelector(state => state.user);

  if(user.userData) {
    if(user.userData.isAuth) {
      return (
        <Menu mode={props.mode}>
          <Menu.Item key="subscribe">
            <a href="/subscribe">Subscribe</a>
          </Menu.Item>
          <Menu.Item key="upload">
            <a href="/video/upload">Upload</a>
          </Menu.Item>
        </Menu>
      )
    }
    else {
      return (
        <Menu mode={props.mode}>

        </Menu>
      )
    }
  }
  else {
    return (
      <Menu mode={props.mode}>

      </Menu>
    )
  }
}

export default LeftMenu;