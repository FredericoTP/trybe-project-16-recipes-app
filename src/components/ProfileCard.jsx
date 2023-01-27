import { useHistory } from 'react-router-dom';

function ProfileCard() {
  const history = useHistory();
  const handleLogoutButton = () => {
    localStorage.clear();
    history.push('/');
  };
  return (
    <>
      {
        localStorage.getItem('user') && (
          <h3
            data-testid="profile-email"
          >
            { JSON.parse(localStorage.getItem('user')).email }
          </h3>
        )
      }
      <button
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        onClick={ handleLogoutButton }
      >
        Logout
      </button>
    </>
  );
}

export default ProfileCard;
