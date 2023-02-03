import { Link } from 'react-router-dom';
import image from '../images/notfound.jpeg';
import '../style/NotFound.css';

function NotFound() {
  return (
    <div className="notfound-container">
      <Link className="notfound-link" to="/">
        <img className="notfound-image" src={ image } alt="404 Not Found!" />
        <h2 className="notfound-title">Home Page</h2>
      </Link>
    </div>
  );
}

export default NotFound;
