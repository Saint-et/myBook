import { RemoveScroll } from 'react-remove-scroll';
import { useAppContext } from '../../contexts/UseAppContext';
import { useEffect, useState } from 'react';
import Notification_err from './Notification_err';

const Notification = (props) => {

  const { errorMessages, handleCloseErrorMessage } = useAppContext();

  if (errorMessages.length === 0) return null

  return (
    <>
      <div
        style={{
          width: '90%',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: 500,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'fixed',
          zIndex: 30000,
          top: '98%',
          left: '98%',
          transform: 'translate(-98%, -98%)'
        }}>
        {errorMessages.map((message) => (
          <Notification_err key={message.id} id={message.id} message={message.message} duration={message.duration} color={message.color} link={message.link} img={message.img} onClose={handleCloseErrorMessage} />
        ))}
      </div>
    </>
  )
}

export default Notification