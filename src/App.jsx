import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { onAuthStateChanged } from 'firebase/auth';

//hooks
import { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';

//pages
import Profile from './pages/Profile/Profile';
import Home from './pages/Home/Home';
import NavBar from './components/NavBar/NavBar';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuth();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Loading...</p>;
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <NavBar />
          <div className="container">
            <Routes>
              <Route path="/" element={user ? <Home /> : <Login />} />
              <Route path="/profile" element={user ? <Profile /> : <Login />} />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to={'/'} />}
              />
              <Route
                path="/signup"
                element={!user ? <SignUp /> : <Navigate to={'/'} />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
