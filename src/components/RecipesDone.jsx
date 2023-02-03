import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import LocalStorageContext from '../context/LocalStorageContext';
import MainContext from '../context/MainContext';
import shareIcon from '../images/shareIcon.svg';
import '../style/RecipesDone.css';

function RecipesDone() {
  const { values } = useContext(LocalStorageContext);
  const { doneFilter } = useContext(MainContext);
  const { doneRecipes } = values;
  const [isShared, setIsShared] = useState(new Array(doneRecipes.length).fill(false));
  const NUMBER10 = 10;

  function handleClickShare(type, id, position) {
    if (type === 'meal') {
      navigator.clipboard.writeText(`http://localhost:3000/meals/${id}`);
    } else {
      navigator.clipboard.writeText(`http://localhost:3000/drinks/${id}`);
    }

    const updatedCheckedState = isShared
      .map((item, index) => (index === position ? !item : item));

    setIsShared(updatedCheckedState);
  }

  return (
    <div className="recipesdone-container">
      {
        doneRecipes.length > 0 && (
          doneRecipes
            .filter((item) => item.type.includes(doneFilter)).map((item, index) => (
              <div className="recipesdone-recipe" key={ `${item.name}${index}` }>
                <Link
                  to={
                    item.type === 'meal' ? `/meals/${item.id}` : `/drinks/${item.id}`
                  }
                >
                  <img
                    className="recipesdone-image"
                    data-testid={ `${index}-horizontal-image` }
                    src={ item.image }
                    alt={ item.name }
                    width="200px"
                  />
                  <h3
                    className="recipesdone-title"
                    data-testid={ `${index}-horizontal-name` }
                  >
                    {item.name}
                  </h3>
                </Link>
                {
                  item.type === 'meal' ? (
                    <h3
                      className="recipesdone-category"
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      {`${item.nationality} - ${item.category}`}

                    </h3>)
                    : (
                      <h3
                        className="recipesdone-category"
                        data-testid={ `${index}-horizontal-top-text` }
                      >
                        {item.alcoholicOrNot}
                      </h3>)
                }
                <h4
                  className="recipesdone-date"
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  { `Done in: ${item.doneDate.substring(0, NUMBER10)}` }
                </h4>
                <div className="recipesdone-tag-container">
                  {
                    (item.type === 'meal') && item.tags.map((tag) => (
                      <h4
                        className="recipesdone-tag"
                        key={ tag }
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                      >
                        {tag}
                      </h4>
                    ))
                  }
                </div>
                <div className="recipesdone-btn-container">
                  <button
                    className="recipesdone-share-btn"
                    data-testid="btn-share-done"
                    type="button"
                    onClick={ () => handleClickShare(item.type, item.id, index) }
                  >
                    <img
                      data-testid={ `${index}-horizontal-share-btn` }
                      src={ shareIcon }
                      alt="share"
                    />
                  </button>
                  {
                    isShared[index] && (
                      <small
                        className="recipesdone-shered"
                      >
                        Link copied!
                      </small>)
                  }
                </div>
              </div>
            ))
        )
      }
    </div>
  );
}

export default RecipesDone;
