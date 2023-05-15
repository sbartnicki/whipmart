import { useLocation, useNavigate } from 'react-router-dom';
import './style.scss';

/**
 * Displays details page of single car
 */
const CarPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // If someone tried to access the page via saved url there
  // will be no selected car in the state, hence different return below
  // TODO: implement protected routes
  if (!state) {
    return (
      <div className="empty">
        This page isn't meant to be accessed this way.
        <button onClick={() => navigate('/')}>Return home</button>
      </div>
    );
  }

  // Displaying view of the selected car
  return (
    <div className="carPage">
      <div className="poster">
        <img src={state.image} alt="Car" />
        <div>{state.make + ' ' + state.model}</div>
      </div>
      <div className="details">Year of production: {state.year}</div>
      <div className="price">${state.price}</div>
    </div>
  );
};

export default CarPage;
