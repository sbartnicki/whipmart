import { useEffect, useState } from 'react';
import './style.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Search = ({ setMessage, make, from, to, model, modelsPrev }) => {
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [carQuery, setCarQuery] = useState({
    from: from || '',
    to: to || '',
    make: make || '',
    model: model || '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('https://www.carqueryapi.com/api/0.3/?cmd=getMakes')
      .then((res) => {
        let data = res.data['Makes'].filter((make) => {
          return make.make_is_common !== 0;
        });

        data = data.map((item) => ({
          make_display: item.make_display,
          make_id: item.make_id,
        }));
        setMakes(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (!models.length && modelsPrev) {
      setModels(modelsPrev);
    }
  }, [modelsPrev, models.length]);

  const handleMakeSelect = (e) => {
    if (e.target.value !== 'default') {
      setCarQuery({ ...carQuery, make: e.target.value, model: '' });
      const make_id = makes.filter(
        (make) => make.make_display === e.target.value
      )[0].make_id;
      axios
        .get(
          `https://www.carqueryapi.com/api/0.3/?cmd=getModels&make=${make_id}`
        )
        .then((res) => {
          setModels(res.data['Models']);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleModelSelect = (e) => {
    if (e.target.value !== 'default') {
      setCarQuery({ ...carQuery, model: e.target.value });
    } else {
      setCarQuery({ ...carQuery, model: '' });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!carQuery.make || !carQuery.from || !carQuery.to) {
      setMessage('Fill the form, only Model is not required');
      return;
    }
    navigate('/results', { state: { ...carQuery, modelsPrev: models } });
  };

  const generateModels = () => {
    if (modelsPrev && models.length === 0) {
      return modelsPrev.map((model, index) => {
        return <option key={index}>{model.model_name}</option>;
      });
    } else {
      return models.map((model, index) => {
        return <option key={index}>{model.model_name}</option>;
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
