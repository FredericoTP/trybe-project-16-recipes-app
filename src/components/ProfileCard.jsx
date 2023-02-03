import { useHistory } from 'react-router-dom';
import doneIcon from '../images/done.png';
import favoriteIcon from '../images/favorite.png';
import logoutIcon from '../images/logout.png';
import '../style/ProfileCard.css';

function ProfileCard() {
  const history = useHistory();
  const handleLogoutButton = () => {
    localStorage.clear();
    history.push('/');
  };
  return (
    <div className="profilecard-container">
      {
        localStorage.getItem('user') && (
          <h3
            className="profile-user"
            data-testid="profile-email"
          >
            { JSON.parse(localStorage.getItem('user')).email }
          </h3>
        )
      }
      <button
        className="profile-btn"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        <img className="profile-icon-image" src={ doneIcon } alt="done" />
        Done Recipes
      </button>
      <button
        className="profile-btn"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        <img className="profile-icon-image" src={ favoriteIcon } alt="favorite" />
        Favorite Recipes
      </button>
      <button
        className="profile-btn"
        data-testid="profile-logout-btn"
        onClick={ handleLogoutButton }
      >
        <img className="profile-icon-image" src={ logoutIcon } alt="logout" />
        Logout
      </button>
    </div>
  );
}

export default ProfileCard;
