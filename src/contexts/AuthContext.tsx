import { createContext, ReactNode, useEffect, useState } from 'react';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { api } from '../services/api';
import { useAsyncStorage } from '../hooks/useAsyncStorage';

WebBrowser.maybeCompleteAuthSession();

export interface User {
  name: string;
  initials: string;
  avatarURL: string;
  sub: string;
  iat: number;
  exp: number;
}

export interface AuthContextDataProps {
  user: User;
  signIn: () => Promise<void>;
  isUserLoading: boolean;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [user, setUser] = useState({} as User);
  const [accessToken, setAccessToken] = useAsyncStorage('refreshToken', '');

  const [req, res, promptAsync] = Google.useAuthRequest({
    clientId: process.env.GOOGLE_CLIENT_ID,
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email'],
  });

  useEffect(() => {
    if (res?.type === 'success' && res.authentication?.accessToken) {
      signInWithGoogle(res.authentication.accessToken);
    }
  }, [res]);

  useEffect(() => {
    if (accessToken) {
      signInWithGoogle(accessToken);
    }
  }, [accessToken]);

  async function signInWithGoogle(access_token: string) {
    try {
      setIsUserLoading(true);

      const response = await api.post('/users', { access_token });
      api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${response.data.token}`;

      const userInfoResponse = await api.get('/me');

      await setAccessToken(access_token);

      setUser(userInfoResponse.data);
    } catch (error) {
      console.error(error);

      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }

  async function signIn() {
    try {
      setIsUserLoading(true);
      await promptAsync();
    } catch (error) {
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        isUserLoading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
