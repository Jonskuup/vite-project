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

export {useMedia};
