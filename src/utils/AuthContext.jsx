import { useContext, useState, useEffect, createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState({
        loggedIn: false,
        role: ''
    });
    const [loading, setLoading] = useState(false);

    const loginUser = (role) => {
        setUser({
            loggedIn: true,
            role: role
        })
        setLoading(false)
    }

    const contextData = {
        user,
        loginUser
    }
    return (
        <AuthContext.Provider value={contextData}>
            {loading ? <p>loading...</p> : children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=> {return useContext(AuthContext)}

export default AuthContext;