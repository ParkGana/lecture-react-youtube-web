import axios from 'axios';

import { USER_AUTH } from './types';
import { SERVER_USER } from '../components/Config';


/****************************************************************************************************
 * 권한 확인
 ****************************************************************************************************/
export function auth() {
    const request = axios.get(`${SERVER_USER}/auth`)
    .then(response => response.data);

    return {
        type: USER_AUTH,
        payload: request
    }
}