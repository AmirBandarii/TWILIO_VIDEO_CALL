import React from 'react'
import './App.css'
import StartPage from './components/StartPage'
import { HashRouter, Route, Routes } from 'react-router-dom'
import VideoContextProvider from './ assets/context/VideoContext'
import RoomPage from './components/room/RoomPage'

function App() {
  return (
    <VideoContextProvider>
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={<StartPage />}
          >
            <Route
              path="/room/:roomId"
              element={<RoomPage />}
            />
          </Route>
        </Routes>
      </HashRouter>
    </VideoContextProvider>
  )
}

export default App
