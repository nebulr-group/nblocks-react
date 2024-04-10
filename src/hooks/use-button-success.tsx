import { useState } from 'react';

const useButtonSuccess = () => {
  const [buttonSuccess, setButtonSuccess] = useState(false);

  const triggerButtonSuccess = () => {
    setButtonSuccess(true);
    setTimeout(() => {
      setButtonSuccess(false);
    }, 3000);
  };

  return {
    buttonSuccess,
    triggerButtonSuccess,
  };
};

export { useButtonSuccess };
