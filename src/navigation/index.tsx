import {
  Routes,
  Route,
} from "react-router-dom";
import { routes } from './Routes';

const index = () => {

  return (
    <Routes>
      {routes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
    </Routes>
  )
}

export default index