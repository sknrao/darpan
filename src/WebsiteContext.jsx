import React, { createContext, useContext, useState } from 'react';

const WebsiteContext = createContext();

export const useWebsite = () => useContext(WebsiteContext);

export const WebsiteProvider = ({ children }) => {
  const [activeWebsite, setActiveWebsite] = useState('home');

  return (
    <WebsiteContext.Provider value={{ activeWebsite, setActiveWebsite }}>
      {children}
    </WebsiteContext.Provider>
  );
};
