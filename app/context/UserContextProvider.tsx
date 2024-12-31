import React, { useState } from "react";
import UserContext from "./UserContext";

interface User {
  id: number;
  name: string;
}

export const UserContextProvider = ({ children }: {children: React.ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
