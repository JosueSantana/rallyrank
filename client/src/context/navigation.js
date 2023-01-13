import { createContext, useState, useEffect } from 'react';

const NavigationContext = createContext();

function NavigationProvider({ children }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => {
      setCurrentPath(window.location.pathname);
    };

    // Trigger for updating pathname
    window.addEventListener('popstate', onPop);

    return () => {
      // Clean up so event listener isn't attached infinitely
      window.removeEventListener('popstate', onPop);
    }
  }, []);

  const navigate = (to) => {
    window.history.pushState({}, '', to);
    setCurrentPath(to);
  };

  return <NavigationContext.Provider value={{ currentPath, navigate }}>
    {children}
  </NavigationContext.Provider>
}

export { NavigationProvider }
export default NavigationContext;