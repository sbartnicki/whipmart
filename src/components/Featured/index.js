import { useEffect, useState } from 'react';
import FeaturedItem from './FeaturedItem';
import Loader from '../Loader';
import './style.scss';
import { loadAllListings } from '../../database';

/**
 * Displays only listings that have featured equal true
 */
const Featured = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await loadAllListings();
      setListings(data);
      setIsLoading(false);
    })();
  }, []);

  return (
    <div className="featured">
      <h2>Featured:</h2>
      {isLoading && <Loader />}
      <div className="itemsContainer">
        {listings.map(
          (listing) =>
            listing.featured && (
              <FeaturedItem key={listing.id} listing={listing} />
            )
        )}
      </div>
    </div>
  );
};

export default Featured;
