import { createContext } from 'react';
import { IUser } from '../../interfaces';


interface ContextProps {
    isLoggedIn: boolean;
    user?: IUser;

    loginUser: (identity: string, password: string) => Promise<boolean>;
    registerUser: (identity: string, name: string, password: string) => Promise<{
      hasError: boolean;
      message?: string;
    }>
    logout: () => void
}


export const AuthContext = createContext({} as ContextProps );