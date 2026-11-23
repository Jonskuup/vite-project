import {useEffect, useState} from 'react';
import {fetchData} from '../utils/fetchData';

const MEDIA_API = import.meta.env.VITE_MEDIA_API + '/media';
const AUTH_API = import.meta.env.VITE_AUTH_API + '/users';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  useEffect(() => {
    const getMedia = async () => {
      try {
        const json = await fetchData(MEDIA_API);
        const mediaWithUsers = await Promise.all(
          json.map(async (item) => {
            const result = await fetchData(AUTH_API + '/' + item.user_id);

            return {
              ...item,
              username: result.username,
            };
          }),
        );

        setMediaArray(mediaWithUsers);
      } catch (error) {
        console.error(error);
      }
    };
    getMedia();
  }, []);

  return {mediaArray};
};
const useUser = () => {
  const getUserInformation = async (userId) => {
    const user = await fetchData(`${AUTH_API}/${userId}`);
    return user;
  };

  const getUserByToken = async (token) => {
    const result = await fetchData(`${AUTH_API}/token`, {
      headers: {Authorization: 'Bearer ' + token},
    });
    return result.user;
  };

  const postUser = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    const registrationResult = await fetchData(AUTH_API, fetchOptions);
    return registrationResult;
  };

  return {getUserInformation, getUserByToken, postUser};
};

/**
 * Auth api /auth resource
 * @returns
 */

const useAuthentication = () => {
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    const loginResult = await fetchData(
      import.meta.env.VITE_AUTH_API + '/auth/login',
      fetchOptions,
    );
    return loginResult;
  };

  return postLogin;
};

export {useMedia, useUser, useAuthentication};
