import React, { createContext } from "react";

interface User {
  id: number;
  name: string;
}

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export default UserContext;
