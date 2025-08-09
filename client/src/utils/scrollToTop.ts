// Utility function to scroll to top of page when navigating between pages
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
};

// Helper function to handle link clicks with scroll to top
export const handleLinkClickWithScroll = (callback?: () => void) => {
  return () => {
    scrollToTop();
    if (callback) {
      callback();
    }
  };
};