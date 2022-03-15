import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import { Menu } from 'antd';

import { SERVER_USER } from '../../../Config';


function RightMenu(props) {
  const navigate = useNavigate();

  const user = useSelector(state => state.user);

  const onSubmitSignOut = (e) => {
    // e.preventDefault();

    Axios.get(`${SERVER_USER}/signout`)
    .then(response => {
      if(response.data.signoutSuccess) {
        window.localStorage.removeItem('userId');
        navigate('/signin');
      }
      else {
        alert('로그아웃에 실패하였습니다.');
      }
    });
  }

  if(user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="signin">
          <a href="/signin">Sign In</a>
        </Menu.Item>
        <Menu.Item key="signup">
          <a href="/signup">Sign Up</a>
        </Menu.Item>
      </Menu>
    )
  }
  else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="signout">
          <a onClick={onSubmitSignOut}>Sign Out</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default RightMenu;