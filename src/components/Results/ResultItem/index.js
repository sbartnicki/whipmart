import { useNavigate } from 'react-router-dom';
import './style.scss';

const ResultItem = ({ result }) => {
  const navigate = useNavigate();

  return (
    <div
      className="resultItem"
      onClick={() => navigate('/details', { state: { ...result } })}
    >
      <img src={result.image} alt="Car" />
      <div className="details">
        <div className="title">{result.make + ' ' + result.model}</div>
        <p>Year of production: {result.year}</p>
        <div className="price">${result.price}</div>
      </div>
    </div>
  );
};

export default ResultItem;
