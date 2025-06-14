
import React, { createContext, useContext, useEffect, useState } from "react";

interface AccessKeyContextType {
  hasAccess: boolean;
  logout: () => void;
}

const ACCESS_KEY_STORAGE = "access-key-entered";
const SECRET = "aiisfuture";

const AccessKeyContext = createContext<AccessKeyContextType>({
  hasAccess: false,
  logout: () => {},
});

export function AccessKeyProvider({ children }: { children: React.ReactNode }) {
  const [hasAccess, setHasAccess] = useState(
    typeof window !== "undefined" && localStorage.getItem(ACCESS_KEY_STORAGE) === SECRET
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedKey = localStorage.getItem(ACCESS_KEY_STORAGE);
      setHasAccess(storedKey === SECRET);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem(ACCESS_KEY_STORAGE);
    setHasAccess(false);
    window.location.reload();
  };

  return (
    <AccessKeyContext.Provider value={{ hasAccess, logout }}>
      {children}
    </AccessKeyContext.Provider>
  );
}

export function useAccessKey() {
  return useContext(AccessKeyContext);
}

export function storeAccessKey() {
  if (typeof window !== "undefined") {
    localStorage.setItem(ACCESS_KEY_STORAGE, SECRET);
  }
}
