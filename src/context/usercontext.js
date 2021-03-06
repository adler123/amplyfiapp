import React from 'react';

export default React.createContext({
    token: null,
    error: null,
    loading: false,
    username: null,
    isAuthenticated: false,
    isAdmin: false,
    login: () => {},
    logout: () => {},
    register: () => {},
});
