import { useState, useEffect } from 'react';

// Debounce Function
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
export const debounce = (func, wait, immediate = false) => {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

export const generateRandomColors = (length = 7) => {

  let arr = [];

  for (let i = 0; i < length; i++) {
    let item = `#${Math.floor(Math.random() * 16777215).toString(16)}`
    if (item.length == 7) {
      arr.push(item)
    } else {
      i--
    }

  }

  if (length == 1) return arr[0]

  return arr
}

export const toCript = (str) => {
  if (str != null) {
    const buff = Buffer.from(str, 'utf-8');
    return buff.toString('base64');
  }
  return null;
};

export const fromCript = (str) => {
  if (str != null) {
    const buff = Buffer.from(str, 'base64');
    return buff.toString('utf-8');
  }
  return null;
};

export const useWindowSize = () => {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

export const getRandomImage = () => {
  // Get external random image from picsum.photos
  // let url = `https://picsum.photos/${width}/${height}`;
  let url = `/static/images/placeholders/covers/${Math.floor(Math.random() * 10)}.jpg`

  return url;
};