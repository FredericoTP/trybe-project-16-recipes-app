import '../style/Loading.css';

function Loading() {
  return (
    <div className="coffee-loading">
      <div className="coffee-mug">
        <div className="coffee-container">
          <div className="coffee" />
        </div>
      </div>
      <h3 className="coffee-loading-title">Loading...</h3>
    </div>

  );
}

export default Loading;
