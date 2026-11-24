// SingleView.jsx

const SingleView = (props) => {
  const {item, setItem} = props;

  if (!item) {
    return null;
  }

  return (
    <dialog open={!!item}>
      <h2>{item.title}</h2>

      {item.media_type.startsWith('image/') ? (
        <img src={item.filename} alt={item.title} />
      ) : (
        <video controls>
          <source src={item.filename} type={item.media_type} />
        </video>
      )}

      <p>{item.description}</p>

      <button onClick={() => setItem(null)}>Close</button>
    </dialog>
  );
};

export default SingleView;
