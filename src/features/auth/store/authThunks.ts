

import { Dispatch } from 'redux';
import { LoginResponse } from '../interfaces/login.interface';
import { login } from './authSlice';

export const fetchUserData  = () => {
    return async(dispatch: Dispatch, getState: any) => {
        try {
            const response = await fetch('http://localhost:4000/api/v1/auth/refresh', {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('refresh_token')}`,
                  'Content-Type': 'application/json'
                },
              });
          
                
              const responseData: LoginResponse = await response.json();
            if (!response?.ok || responseData.statusCode) {
          
              throw new Error('Error en la solicitud: ' + response.status);
            }
            localStorage.setItem('access_token', responseData.access_token || '');
            localStorage.setItem('refresh_token', responseData.refresh_token || '');
            dispatch(login(responseData.user));
          } catch (error) {
            // console.error('Error:', error);
          }
    }
}

export const getPokemons = ( page = 0 ) => {
    return async(dispatch: Dispatch, getState: any) => {
       
    }
}



