import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const footerElement = document.getElementById('mmFooter');
    const footerPosition = footerElement.getBoundingClientRect().top;

    if (window.pageYOffset > 300 && footerPosition > window.innerHeight) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    isVisible && (
      <div className="scroll-to-top" onClick={scrollToTop}>
        <FaArrowUp />
      </div>
    )
  );
};

export default ScrollToTopButton;
