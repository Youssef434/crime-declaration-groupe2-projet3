const { createContext, useContext, useState } = require("react");

const AuthContext = createContext({
  token: "",
  isAuthentificated: false,
  authentificate: (token) => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState();
  const authentificate = (token) => {
    setToken(token);
  };
  const logout = () => {
    setToken(null);
  };
  const value = {
    token: token,
    isAuthentificated: !!token,
    authentificate: authentificate,
    logout: logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export default AuthContextProvider;

export const useGlobalContext = () => {
  return useContext(AuthContext);
};
