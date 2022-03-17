import React from 'react';
import { Menu } from 'antd';


function LeftMenu(props) {
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

export default LeftMenu;