import MediaRow from '../components/MediaRow';
import {useEffect, useState} from 'react';
import {fetchData} from '../utils/fetchData';

const MEDIA_API = import.meta.env.VITE_MEDIA_API + '/media';

const AUTH_API = import.meta.env.VITE_AUTH_API + '/users';

const Home = () => {
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

  return (
    <>
      <h2>My Media</h2>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
            <th>Info</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => (
            <MediaRow key={item.media_id} item={item} />
          ))}
        </tbody>
      </table>
    </>
  );
};
export default Home;
