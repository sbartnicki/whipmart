import { useNavigate } from 'react-router-dom';
import './style.scss';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="notFound">
      <h2>404</h2>
      <p>Page Not Found</p>
      <button onClick={() => navigate('/')}>Take me home</button>
    </div>
  );
};

export default NotFoundPage;
