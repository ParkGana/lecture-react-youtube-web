import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';

import { SERVER_USER } from '../components/Config';
import { auth } from '../_actions/user';


export default function (SpecificComponent, option, adminRoute = null) {
    /*
     * option
     * 1. null: 아무나 출입 가능
     * 2. true: 로그인한 사용자만 접속 가능
     * 3. false: 로그인한 사용자는 접속 불가능
     */

    function AuthenticationCheck() {
        const dispatch = useDispatch();
        const navigate = useNavigate();

        useEffect(() => {
            dispatch(auth())
            .then(response => {
                console.log(response.data);
                // 로그인 되어있을 경우
                if(response.payload.isAuth) {
                    // 관리자 페이지일 경우
                    if(adminRoute === true) {
                        // 관리자 권한이 없을 경우
                        if(!response.payload.isAdmin) {
                            navigate('/');
                        }
                    }
                    // 로그인하지 않은 사용자만 접속 가능한 페이지일 경우
                    else if(option === false) {
                        navigate('/');
                    }
                }
                // 로그인 되어있지 않을 경우
                else {
                    // 관리자 페이지일 경우
                    if(adminRoute === true) {
                        navigate('/signin');
                    }
                    // 로그인한 사용자만 접속 가능한 페이지일 경우
                    else if(option === true) {
                        navigate('/signin');
                    }
                }
            })
        }, []);

        return (
            <SpecificComponent />
        );
    }
    
    return AuthenticationCheck;
}