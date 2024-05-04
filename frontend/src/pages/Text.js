import React, { useState, useEffect } from 'react';
import './Text.css';
import linkd from '../images/link.png'

const Text = () => {
  const [charIndex, setCharIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [dynamicText, setDynamicText] = useState('');
  const words = ['your LINKHUB'];

  useEffect(() => {
    const typeEffect = () => {
      const currentWord = words[wordIndex];
      const currentChar = currentWord.substring(0, charIndex + 1);

      setDynamicText(currentChar);

      if (charIndex === currentWord.length - 1) {
        // Word typing completed
        return;
      }

      // Move to the next character
      setCharIndex((prev) => prev + 1);
    };

    // Start typing effect
    const typingInterval = setInterval(typeEffect, 200);

    // Stop typing if all characters of the current word have been typed
    if (charIndex === words[wordIndex].length) {
      clearInterval(typingInterval);
      setTimeout(() => {
        // Move to the next word after a delay
        setWordIndex((prev) => (prev + 1) % words.length);
        setCharIndex(0); // Reset character index
      }, 1000); // Delay before moving to the next word
    }

    // Cleanup function
    return () => clearInterval(typingInterval);
  }, [charIndex, wordIndex, words]);

  return (
   <></>
  );
};

export default Text;