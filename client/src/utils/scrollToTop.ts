export const scrollToTop = (behavior: ScrollBehavior = 'smooth') => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior
  });
};

export const handleLinkClick = (callback?: () => void) => {
  return () => {
    scrollToTop();
    if (callback) {
      callback();
    }
  };
};