import * as React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router'

// Components
import DefaultLayout from './layout/DefaulLayout'
import PopularMovie from './pages/PopularMovie'
import PopularTv from './pages/PopularTv'
import Show from './pages/Show'

// Context
import { WindowProvider } from './context/WindowContext'


function App() {


  return (
    <BrowserRouter>
      <WindowProvider>
        <Routes>
          <Route path='/' element={<DefaultLayout />}>
            <Route path='/popular-movie' element={<PopularMovie />} />
            <Route path='/movie/:id' element={<Show type='movie' />} />
            <Route path='/popular-tv' element={<PopularTv />} />
            <Route path='/tv/:id' element={<Show type='tv' />} />
          </Route>
        </Routes>
      </WindowProvider>
    </BrowserRouter>
  )
}

export default App
