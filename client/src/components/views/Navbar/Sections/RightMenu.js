import React from 'react';
import { Menu } from 'antd';


function RightMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="signin">
        <a href>Sign In</a>
      </Menu.Item>
      <Menu.Item key="signup">
        <a href>Sign Up</a>
      </Menu.Item>
    </Menu>
  )
}

export default RightMenu;