import {useLocation, useNavigate} from 'react-router';

const Single = () => {
  const {state} = useLocation();
  const item = state;
  const navigate = useNavigate();

  if (!item) {
    return <p>No media selected.</p>;
  }

  return (
    <>
      <h2>{item.title}</h2>

      {item.media_type.startsWith('image/') ? (
        <img src={item.filename} alt={item.title} />
      ) : (
        <video controls>
          <source src={item.filename} type={item.media_type} />
        </video>
      )}

      <p>{item.description}</p>
      <p>Uploaded by: {item.username}</p>
      <button onClick={() => navigate(-1)}>Back</button>
    </>
  );
};

export default Single;
