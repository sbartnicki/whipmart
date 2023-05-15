import './style.scss';

/**
 * Simple component for displaying notifications
 */
const Notification = ({ message }) => {
  return (
    <div className="notif">
      <div>{message}</div>
    </div>
  );
};

export default Notification;
