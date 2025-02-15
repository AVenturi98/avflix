import * as React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router'

// Components
import BlankLayout from './layout/BlankLayout'
import DefaultLayout from './layout/DefaulLayout'
import DefaultDettails from './layout/DefaultDettails'
import PopularMovie from './pages/PopularMovie'
import PopularTv from './pages/PopularTv'
import Show from './pages/Show'
import DettailsPage from './pages/DettailsPage'
import MediasPage from './pages/MediasPage'
import VideoPage from './pages/VideoPage'
import CrewPage from './pages/CrewPage'
import NotFound from './erros_pages/NotFound'

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
              <Route path='/movie' >
                <Route path=':id' element={<Show type='movie' />} />
                <Route path=':id/dettails' element={<DefaultDettails type='movie' />}>
                  <Route path='media' element={<MediasPage type='movie' />} />
                  <Route path='video' element={<VideoPage type='movie' />} />
                  <Route path='crew' element={<CrewPage type='movie' />} />
                </Route>
              </Route>

              <Route path='/popular-tv' element={<PopularTv />} />
              <Route path='/tv' >
                <Route path=':id' element={<Show type='tv' />} />
                <Route path=':id/dettails' element={<DefaultDettails type='tv' />}>
                  <Route path='media' element={<MediasPage type='tv' />} />
                  <Route path='video' element={<VideoPage type='tv' />} />
                  <Route path='crew' element={<CrewPage type='tv' />} />
                </Route>
              </Route>
            </Route>
            <Route path='/' element={<BlankLayout />}>
              <Route path='not-found' element={<NotFound />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </WindowProvider>
  )
}

export default App
