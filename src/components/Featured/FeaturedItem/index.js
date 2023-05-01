import { useNavigate } from 'react-router-dom';
import './style.scss';

const FeaturedItem = ({ listing }) => {
  const navigate = useNavigate();

  return (
    <div
      className="featuredItem"
      onClick={() => navigate('/details', { state: { ...listing } })}
    >
      <img src={listing.image} alt="Car" />
      <div className="description">
        <div className="name">{`${listing.make} ${listing.model}`}</div>{' '}
        <div className="price">${listing.price}</div>
      </div>
    </div>
  );
};

export default FeaturedItem;
