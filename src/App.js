import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { publicRoutes } from "./Routes"

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          {publicRoutes.map((route, i) => (
            // console.log('route', route)
            <Route
              path={route.path}
              element={<route.components />}
              exact={route.exact}
              key={i} />
          ))}
        </Routes>
      </Router>
    </div>
  )
}
