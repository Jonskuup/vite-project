import {useLocation, useNavigate} from 'react-router';
import {useUser} from '../hooks/apiHooks';
import {useState} from 'react';

const Single = () => {
  const {getUserInformation} = useUser();
  const [owner, setOwner] = useState(null);

  const location = useLocation();
  const item = location.state;
  const navigate = useNavigate();

  if (!item) {
    return <p>No media selected.</p>;
  }

  const getUser = async () => {
    try {
      const user = await getUserInformation(item.user_id);
      setOwner(user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2>Single media file</h2>
      <h3>{item.title}</h3>

      {item.media_type.startsWith('image/') ? (
        <img src={item.filename} alt={item.description} />
      ) : (
        <video controls>
          <source src={item.filename} type={item.media_type} />
        </video>
      )}

      <p>{item.description}</p>

      <h4 onClick={getUser}>Owner: {item.username}</h4>

      {owner && (
        <p>
          Email: {owner.email}, User level: {owner.level_name}
        </p>
      )}

      <button onClick={() => navigate(-1)}>Go back</button>
    </>
  );
};

export default Single;
