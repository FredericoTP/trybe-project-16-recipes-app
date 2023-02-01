import { Link } from 'react-router-dom';
import imgDrink from '../images/drinkIcon.svg';
import imgMeal from '../images/mealIcon.svg';
import '../style/Footer.css';

function Footer() {
  return (
    <footer
      className="footer-container"
      data-testid="footer"
    >
      <Link to="/drinks">
        <img
          className="footer-drinks"
          data-testid="drinks-bottom-btn"
          src={ imgDrink }
          alt="ToDrink"
        />
      </Link>
      <Link to="/meals">
        <img
          className="footer-meals"
          data-testid="meals-bottom-btn"
          src={ imgMeal }
          alt="ToMeal"
        />
      </Link>
    </footer>
  );
}

export default Footer;
