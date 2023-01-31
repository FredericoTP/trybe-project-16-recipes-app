import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import LocalStorageContext from '../context/LocalStorageContext';
import MainContext from '../context/MainContext';
import shareIcon from '../images/shareIcon.svg';

function RecipesDone() {
  const { values } = useContext(LocalStorageContext);
  const { doneFilter } = useContext(MainContext);
  const { doneRecipes } = values;
  const [isShared, setIsShared] = useState(new Array(doneRecipes.length).fill(false));

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
    <div>
      {
        doneRecipes.length > 0 && (
          doneRecipes
            .filter((item) => item.type.includes(doneFilter)).map((item, index) => (
              <div key={ `${item.name}${index}` }>
                <Link
                  to={
                    item.type === 'meal' ? `/meals/${item.id}` : `/drinks/${item.id}`
                  }
                >
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ item.image }
                    alt={ item.name }
                    width="200px"
                  />
                  <h3 data-testid={ `${index}-horizontal-name` }>{item.name}</h3>
                </Link>
                {
                  item.type === 'meal' ? (
                    <h3
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      {`${item.nationality} - ${item.category}`}

                    </h3>)
                    : (
                      <h3
                        data-testid={ `${index}-horizontal-top-text` }
                      >
                        {item.alcoholicOrNot}
                      </h3>)
                }
                <h4 data-testid={ `${index}-horizontal-done-date` }>{item.doneDate}</h4>
                {
                  (item.type === 'meal') && item.tags.splice(0, 2).map((tag) => (
                    <h4
                      key={ tag }
                      data-testid={ `${index}-${tag}-horizontal-tag` }
                    >
                      {tag}

                    </h4>
                  ))
                }
                <button
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
                  isShared[index] && <small>Link copied!</small>
                }
              </div>
            ))
        )
      }
    </div>
  );
}

export default RecipesDone;
