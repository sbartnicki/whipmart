import { useEffect, useState } from 'react';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import * as restAPI from '../../restapi';

/**
 * Component that allows to find a car by given parameters
 * and will navigate user to results page after search btn is pressed
 */
const Search = ({ setMessage, make, from, to, model, modelsPrev }) => {
  const navigate = useNavigate();
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [carQuery, setCarQuery] = useState({
    from: from || '',
    to: to || '',
    make: make || '',
    model: model || '',
  });

  // Fetching car makes upon mounting
  useEffect(() => {
    restAPI
      .getMakes()
      .then((data) => {
        data = data.map((item) => ({
          make_display: item.name,
          make_id: item.id,
        }));
        setMakes(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Setting the models to previously selected, so user doesn't have to select
  // again after moving to results component. TODO: to be improved by state library
  useEffect(() => {
    if (!models.length && modelsPrev) {
      setModels(modelsPrev);
    }
  }, [modelsPrev, models.length]);

  /**
   * Fetches the models based on selected Make
   */
  const handleMakeSelect = (e) => {
    if (e.target.value !== 'default') {
      setCarQuery({ ...carQuery, make: e.target.value, model: '' });
      const make_id = makes.filter(
        (make) => make.make_display === e.target.value
      )[0].make_id;

      restAPI
        .getModels(make_id)
        .then((res) => {
          let data = res.map((item) => item.name);
          setModels(data);
        })
        .catch((err) => console.log(err));
    }
  };

  /**
   * Adds a selected model to search query object
   */
  const handleModelSelect = (e) => {
    if (e.target.value !== 'default') {
      setCarQuery({ ...carQuery, model: e.target.value });
    } else {
      setCarQuery({ ...carQuery, model: '' });
    }
  };

  /**
   * Redirects user to search results page and passes the search query along to that page
   */
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!carQuery.make || !carQuery.from || !carQuery.to) {
      setMessage('Fill the form, only Model is not required');
      return;
    }
    navigate('/results', { state: { ...carQuery, modelsPrev: models } });
  };

  /**
   * Generates JSX to display dropdown options for all models
   */
  const generateModels = () => {
    if (modelsPrev && models.length === 0) {
      return modelsPrev.map((model, index) => {
        return <option key={index}>{model}</option>;
      });
    } else {
      return models.map((model, index) => {
        return <option key={index}>{model}</option>;
      });
    }
  };

  return (
    <div className="search">
      <h2>Find new car:</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="inputContainer">
          Make
          <label>
            Select manufacturer
            <select onChange={handleMakeSelect} value={carQuery.make}>
              <option value="default">Choose from list</option>
              {makes.map((make) => {
                return <option key={make.make_id}>{make.make_display}</option>;
              })}
            </select>
          </label>
        </div>
        <div className="inputContainer">
          Model
          <label>
            Select car model
            <select onChange={handleModelSelect} value={carQuery.model}>
              <option value="default">Choose from list</option>
              {generateModels()}
            </select>
          </label>
        </div>

        <div className="inputContainer">
          Year
          <div className="double">
            <label>
              From
              <input
                type="number"
                value={carQuery.from}
                onChange={(e) =>
                  setCarQuery({ ...carQuery, from: Number(e.target.value) })
                }
              />
            </label>
            <label>
              To
              <input
                type="number"
                value={carQuery.to}
                onChange={(e) =>
                  setCarQuery({ ...carQuery, to: Number(e.target.value) })
                }
              />
            </label>
          </div>
        </div>
        {/* Searching by distance will be developed later for portfolio, unfortunately it won't fit final project deadline */}
        {/* <div className="inputContainer">
          Location
          <div className="double">
            <label>
              Postal Code
              <input
                type="text"
                value={carQuery.postalCode}
                onChange={(e) =>
                  setCarQuery({ ...carQuery, postalCode: e.target.value })
                }
              />
            </label>
            <label>
              Distance
              <input
                type="number"
                value={carQuery.distance}
                onChange={(e) =>
                  setCarQuery({ ...carQuery, distance: e.target.value })
                }
              />
            </label>
          </div>
        </div> */}
        <input type="submit" value="Search" />
      </form>
    </div>
  );
};

export default Search;
