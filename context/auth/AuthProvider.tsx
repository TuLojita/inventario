import { useReducer, useEffect } from 'react';
import { AuthContext, authReducer } from './';
import Cookies from 'js-cookie';
import axios from 'axios';

import inventarioApi from '@/api/inventarioApi';
import { IUser } from '../../interfaces';
import { useRouter } from 'next/router';

export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser;
}


const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
}

interface Props {
    children: JSX.Element | JSX.Element[];
}

export const AuthProvider = ({ children }: Props) => {

    const [state, dispatch] = useReducer( authReducer, AUTH_INITIAL_STATE );
    const router = useRouter();

    useEffect(() => {
        checkToken();
    }, [])

    const checkToken = async() => {

        if ( !Cookies.get('token') ) {
            return;
        }

        try {
            const { data } = await inventarioApi.get('/user/validate-token');
            const { token, user } = data;
            Cookies.set('token', token );
            dispatch({ type: '[Auth] - Login', payload: user });
        } catch (error) {
            Cookies.remove('token');
        }
    }
    


    const loginUser = async( identity: string, password: string ): Promise<boolean> => {

        try {
            const { data } = await inventarioApi.post('/user/login', { identity, password });
            const { token, user } = data;
            console.log(user)
            Cookies.set('token', token );
            dispatch({ type: '[Auth] - Login', payload: user });
            return true;
        } catch (error) {
            return false;
        }

    }


    const registerUser = async( identity: string, name: string, password: string ): Promise<{hasError: boolean; message?: string}> => {
        try {
            const { data } = await inventarioApi.post('/user/register', { identity, name, password });
            const { token, user } = data;
            Cookies.set('token', token );
            dispatch({ type: '[Auth] - Login', payload: user });
            return {
                hasError: false
            }

        } catch (error) {
            if ( axios.isAxiosError(error) ) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }

            return {
                hasError: true,
                message: 'No se pudo crear el usuario, intente de nuevo'
            }
        }
    }

    const logout = () => {
        Cookies.remove('token');
        router.reload();
    }

    return (
        <AuthContext.Provider value={{
            ...state,

            // Methods
            loginUser,
            registerUser,
            logout
        }}>
            { children }
        </AuthContext.Provider>
    )
};