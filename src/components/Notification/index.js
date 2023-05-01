import './style.scss';

const Notification = ({ message }) => {
  return (
    <div className="notif">
      <div>{message}</div>
    </div>
  );
};

export default Notification;
