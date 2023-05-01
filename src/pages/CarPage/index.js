import { useLocation, useNavigate } from 'react-router-dom';
import './style.scss';

const CarPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="empty">
        This page isn't meant to be accessed this way.
        <button onClick={() => navigate('/')}>Return home</button>
      </div>
    );
  }

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
