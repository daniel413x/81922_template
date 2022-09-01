import { useState, useEffect } from 'react';

interface KeyPressProps {
  keyPressed: boolean;
}

const useKeyPress = (targetKey: string): KeyPressProps => {
  const [keyPressed, setKeyPressed] = useState<boolean>(false);
  function downHandler({ key }: KeyboardEvent) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }
  const upHandler = ({ key }: KeyboardEvent) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  });
  return { keyPressed };
};

export default useKeyPress;
