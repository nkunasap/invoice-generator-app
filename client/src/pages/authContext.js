import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

const [user, setUser] = useState(null);

const [isAuthenticated, setIsAuthenticated] = useState(false);

const [loading, setLoading] = useState(true);

useEffect(() => {

const checkAuth = async () => {

try {
    const token = localStorage.getItem('token');

if (token) {

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

const res = await axios.get('/api/auth/verify'); // We need to create this endpoint in the server

setUser(res.data.user);

setIsAuthenticated(true);

}

} catch (err) {

console.error(err);

} finally {

setLoading(false);

}

};

checkAuth();

}, [])

const login = async (token) => {

localStorage.setItem('token', token);

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

const res = await axios.get('/api/auth/verify');

setUser(res.data.user);

setIsAuthenticated(true);

};

const logout = () => {

localStorage.removeItem('token');

delete axios.defaults.headers.common['Authorization'];

setUser(null);

setIsAuthenticated(false);

};

return (

<AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout }}>

{children}

</AuthContext.Provider>
);

};

export { AuthContext, AuthProvider };