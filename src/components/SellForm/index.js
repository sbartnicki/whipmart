import { useState, useEffect, useRef } from 'react';
import './style.scss';
import { saveListingToDB, uploadImage } from '../../database';
import axios from 'axios';

const SellForm = ({ setMessage, setIsLoading }) => {
  const [newListing, setNewListing] = useState({
    featured: false,
    price: '',
    year: '',
    postalCode: '',
  });
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);

  const inputFile = useRef();

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
      .catch(() => {});
  }, []);

  const handleListingSubmit = async (e) => {
    e.preventDefault();
    if (!newListing.make) {
      setMessage('You need to select Make');
      return;
    } else if (!newListing.model) {
      setMessage('You need to select Model');
      return;
    } else if (!newListing.price) {
      setMessage('You need to provide Price');
      return;
    } else if (!newListing.year) {
      setMessage('You need to provide Year');
      return;
    } else if (!newListing.postalCode) {
      setMessage('You need to provide Postal Code');
      return;
    } else if (!inputFile.current.value) {
      setMessage('You need to select an Image');
      return;
    } else {
      setMessage('');
    }

    setIsLoading(true);
    if (inputFile.current.value) {
      const imageUrl = await uploadImage(inputFile.current.files[0]);
      const result = await saveListingToDB({ ...newListing, image: imageUrl });
      if (result) {
        setMessage('Car listing posted!');
        setIsLoading(false);
      }
    }
  };
  const handleMakeSelect = (e) => {
    if (e.target.value !== 'default') {
      setNewListing({ ...newListing, make: e.target.value });
      const make_id = makes.filter(
        (make) => make.make_display === e.target.value
      )[0].make_id;
      axios
        .get(
          `https://www.carqueryapi.com/api/0.3/?cmd=getModels&make=${make_id}`
        )
        .then((res) => {
          setModels(res.data['Models']);
        });
    }
  };

  const handleModelSelect = (e) => {
    setNewListing({ ...newListing, model: e.target.value });
  };

  const handleImageChange = () => {
    setMessage('Image selected');
  };

  return (
    <div className="sell-form">
      <h2>Sell your car:</h2>
      <form onSubmit={handleListingSubmit}>
        <div className="inputContainer">
          Make
          <label>
            Select manufacturer
            <select onChange={handleMakeSelect} defaultValue={'default'}>
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
            <select onChange={handleModelSelect}>
              {models.map((model, index) => {
                return <option key={index}>{model.model_name}</option>;
              })}
            </select>
          </label>
        </div>
        <div className="inputContainer feature">
          <label>
            <span>Feature? ($10/7days)</span>
            <input
              type="checkbox"
              value={newListing.featured}
              onChange={(e) =>
                setNewListing({ ...newListing, featured: e.target.checked })
              }
            />
          </label>
        </div>

        <div className="inputContainer">
          Price
          <div className="double">
            <label>
              CAD
              <input
                type="number"
                min={0}
                value={newListing.price}
                onChange={(e) =>
                  setNewListing({
                    ...newListing,
                    price: Number(e.target.value),
                  })
                }
              />
            </label>
            <label className="fileInput">
              Image
              <input
                type="file"
                accept="image/*"
                className="file"
                onChange={handleImageChange}
                ref={inputFile}
              />
            </label>
          </div>
        </div>
        <div className="inputContainer">
          Details
          <div className="double">
            <label>
              Year
              <input
                type="number"
                value={newListing.year}
                onChange={(e) =>
                  setNewListing({ ...newListing, year: Number(e.target.value) })
                }
              />
            </label>
            <label>
              Postal Code
              <input
                type="text"
                value={newListing.postalCode}
                onChange={(e) =>
                  setNewListing({ ...newListing, postalCode: e.target.value })
                }
              />
            </label>
          </div>
        </div>
        <input type="submit" value={'Sell'} />
      </form>
    </div>
  );
};

export default SellForm;
