import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // or use your user object
  const isLoggedIn = !!user; // true if user is logged in

  return (
    <UserContext.Provider value={{ user, isLoggedIn, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
