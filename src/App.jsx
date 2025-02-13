import * as React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router'

// Components
import DefaultLayout from './layout/DefaulLayout'
import PopularMovie from './pages/PopularMovie'
import PopularTv from './pages/PopularTv'
import Show from './pages/Show'

// Context
import { WindowProvider } from './context/WindowContext'
import { GlobalProvider } from './context/GlobalContext'


function App() {


  return (
    <WindowProvider>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<DefaultLayout />}>
              <Route path='/popular-movie' element={<PopularMovie />} />
              <Route path='/movie/:id' element={<Show type='movie' />} />
              <Route path='/popular-tv' element={<PopularTv />} />
              <Route path='/tv/:id' element={<Show type='tv' />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </WindowProvider>
  )
}

export default App
