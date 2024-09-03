import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL;

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Disable any automatic scroll restoration by the browser
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Ensure the page opens at the top immediately
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); // 'instant' scroll to top
    
  }, [pathname]);

  return null;
}

export default ScrollToTop;