import { useContext, useState, useEffect, createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
      loggedIn: false,
      role: "",
    });
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      // Check if the user has a token and role in cookies (user is logged in)
      const token = getCookie("accessToken");
      const role = getCookie("userRole");
      if (token && role) {
        // You might want to validate the token here before setting the user state
        setUser({
          loggedIn: true,
          role: role,
        });
      }
      setLoading(false);
    }, []); // Empty dependency array ensures this effect runs only once on component mount
  
    const loginUser = (role, token) => {
      // Set the token and role in cookies instead of state
      setCookie("accessToken", token, { path: "/" });
      setCookie("userRole", role, { path: "/" });
  
      setUser({
        loggedIn: true,
        role: role,
      });
      setLoading(false);
    };
  
    const logoutUser = () => {
      // Clear the token and role from the cookies
      deleteCookie("accessToken");
      deleteCookie("userRole");
  
      // Update the user state to indicate that the user is logged out
      setUser({
        loggedIn: false,
        role: "",
      });
    };
  
    const contextData = {
      user,
      loginUser,
      logoutUser,
    };
  
    return (
      <AuthContext.Provider value={contextData}>
        {loading ? <p>loading...</p> : children}
      </AuthContext.Provider>
    );
  };
  
  // Helper function to set a cookie
  function setCookie(name, value, options) {
    options = {
      path: "/",
      ...options,
    };
  
    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }
  
    let updatedCookie =
      encodeURIComponent(name) + "=" + encodeURIComponent(value);
  
    for (const optionKey in options) {
      updatedCookie += "; " + optionKey;
      const optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }
  
    document.cookie = updatedCookie;
  }

  // Helper function to delete a cookie
  function deleteCookie(name) {
    document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }
  
  
  // Helper function to get a cookie
  function getCookie(name) {
    const matches = document.cookie.match(
      new RegExp(
        "(?:^|; )" +
          name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") +
          "=([^;]*)"
      )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }  

export const useAuth = ()=> {return useContext(AuthContext)}

export default AuthContext;