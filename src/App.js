import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { publicRoutes } from "./Routes"
import NotFound from './Pages/NotFound'

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          {publicRoutes.map((route, i) => (
            <Route
              path={route.path}
              element={<route.components />}
              exact={route.exact}
              key={i} />
          ))}
          <Route path="/404" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  )
}
