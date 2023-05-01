import Loader from '../Loader';
import ResultItem from './ResultItem';
import './style.scss';

const Results = ({ results, isLoading }) => {
  return (
    <div className="resultsBox">
      <h2>Results:</h2>
      {isLoading && <Loader />}
      <div className="container">
        {!results.length && <span>No records found</span>}
        {results.map((result) => (
          <ResultItem key={result.id} result={result} />
        ))}
      </div>
    </div>
  );
};

export default Results;
