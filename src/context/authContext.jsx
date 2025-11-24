import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user_id,setUser] = useState();

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      console.log("Toke missing in response");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const valid = decoded.exp * 1000 > Date.now();
      setIsAuthenticated(valid);
      console.log("user loggin"+decoded.user_id);
      setUser(decoded.user_id);
    } catch (e){
      setIsAuthenticated(false);
      console.log(e)
    }
  };

  useEffect(() => {
    checkAuth(); // run on first load
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    checkAuth();
	console.log("Login and updated context");
	console.log(isAuthenticated);
  };

  const logout = () => {
    localStorage.removeItem("token");
    checkAuth();
  };

  return (
    <AuthContext.Provider 
      value={{ isAuthenticated,user_id, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
