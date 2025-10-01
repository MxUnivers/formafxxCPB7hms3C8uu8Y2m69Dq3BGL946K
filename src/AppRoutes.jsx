// AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import appRoutes from './routes/appRoutes';

const AppRoutes = () => {
  return (
    <Routes>
      {appRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default AppRoutes;