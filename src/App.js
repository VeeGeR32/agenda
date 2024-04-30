import React from 'react';
import addNotification from 'react-push-notification';
import { Notifications } from 'react-push-notification';

function App() {
  function buttonOnClick() {
    addNotification({
      title: 'Warning',
      subtitle: 'This is a subtitle',
      message: 'This is a message',
      theme: 'darkblue',
      native: true
    });
  }

  return (
    <div className="App flex justify-center items-center h-screen bg-gray-100">
      <div>
        <Notifications />
        <button
          onClick={buttonOnClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Push Notification
        </button>
      </div>
    </div>
  );
}

export default App;
