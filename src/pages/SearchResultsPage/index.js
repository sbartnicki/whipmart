import { useLocation } from 'react-router-dom';
import Results from '../../components/Results';
import Search from '../../components/Search';
import Notification from '../../components/Notification';
import './style.scss';
import { useEffect, useState } from 'react';
import { loadQueriedListings } from '../../database';

/**
 * Page for displaying results of the car search
 */
const SearchResultsPage = () => {
  const { state } = useLocation();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');

  // State contains a query that is run through Firebase
  useEffect(() => {
    (async () => {
      const data = await loadQueriedListings(state);
      setResults(data);
      setIsLoading(false);
    })();
  }, [state]);

  return (
    <>
      {message && <Notification message={message} />}
      <div className="searchResultsPage">
        <Search setMessage={setMessage} {...state} />
        <Results results={results} isLoading={isLoading} />
      </div>
    </>
  );
};

export default SearchResultsPage;
