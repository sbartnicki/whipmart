import { useState } from 'react';
import Featured from '../../components/Featured';
import Notification from '../../components/Notification';
import Search from '../../components/Search';
import SellForm from '../../components/SellForm';
import './style.scss';
import Loader from '../../components/Loader';

const HomePage = () => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {message && <Notification message={message} />}
      {isLoading && <Loader />}
      <div className="homePage">
        <Search setMessage={setMessage} />
        <SellForm setMessage={setMessage} setIsLoading={setIsLoading} />
        <Featured />
      </div>
    </>
  );
};

export default HomePage;
