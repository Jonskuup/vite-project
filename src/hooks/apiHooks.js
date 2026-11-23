import {useEffect, useState} from 'react';
import {fetchData} from '../utils/fetchData';

const MEDIA_API = import.meta.env.VITE_MEDIA_API + '/media';
const AUTH_API = import.meta.env.VITE_AUTH_API + '/users';
const UPLOAD_API = import.meta.env.VITE_UPLOAD_SERVER;

const useMedia = () => {
  const postMedia = async (file, inputs, token) => {
    const mediaData = {
      title: inputs.title,
      description: inputs.description,
      filename: file.filename,
      media_type: file.media_type,
      filesize: file.filesize,
    };

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(mediaData),
    };

    const mediaResponse = await fetchData(MEDIA_API, fetchOptions);
    return mediaResponse;
  };

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

  return {mediaArray, postMedia};
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

const useFile = () => {
  const postFile = async (file, token) => {
    const formData = new FormData();

    formData.append('file', file);

    const fetchOptions = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    };

    const fileData = await fetchData(`${UPLOAD_API}/upload`, fetchOptions);

    return {fileData};
  };

  return {postFile};
};

export {useMedia, useUser, useAuthentication, useFile};
