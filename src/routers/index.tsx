
import React from 'react'
import { BrowserRouter as Router, createBrowserRouter, Route, Routes, RouterProvider } from 'react-router-dom'
// 实现配置路由1
import { routeConfig } from './config'
export default () => {
  return (
    <Routes>
      {routeConfig.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={route.element} />
      ))}
    </Routes>
  )
}