import { Routes, Route } from 'react-router-dom'
import { routes } from './routers'
import { cloneElement } from 'react'

export default function App({ serverData }: { serverData?: any }) {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={cloneElement(route.element, { serverData })}
        />
      ))}
    </Routes>
  )
}