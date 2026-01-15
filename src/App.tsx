import { BrowserRouter as Router, Routes, Route, Navigate,useLocation  } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './components/layout/Navbar';
import CourseDetail from './pages/CourseDetail';
import Watch from './pages/Watch';
// import Watch from './pages/Watch';
// import CourseDetail from './pages/CourseDetail';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();
  const location = useLocation();

if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
function App() {
  return (
    <AuthProvider>
      
      <Router>
         <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/course/:id" element={<CourseDetail />} />

          <Route 
            path="/watch/:lectureId" 
            element={
              <PrivateRoute>
                <Watch />
              </PrivateRoute>
            } 
          />

           <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;