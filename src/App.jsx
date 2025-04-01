import * as React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router'
import { SpeedInsights } from '@vercel/speed-insights/react';

// Components
import BlankLayout from './layout/BlankLayout'
import DefaultLayout from './layout/DefaulLayout'
import DefaultDettails from './layout/DefaultDettails'
import PopularMovie from './pages/PopularMovie'
import PopularTv from './pages/PopularTv'
import Show from './pages/Show'
import MediasPage from './pages/movies-tvPages/MediasPage'
import VideoPage from './pages/movies-tvPages/VideoPage'
import CrewPage from './pages/movies-tvPages/CrewPage'
import Home from './pages/Home'
// Person
import PersonPage from './pages/PersonPage'
import MediaPerson from './pages/personPages/MediaPerson'
import MediaTaggedPerson from './pages/personPages/MediaTaggedPerson'
import AllMovieTv from './pages/personPages/AllMovieTv'
// Search 
import SearchPage from './pages/SearchPage'
// Errors
import NotFound from './erros_pages/NotFound'

// Context
import { WindowProvider } from './context/WindowContext'
import { GlobalProvider } from './context/GlobalContext'

//Analytics
import { Analytics } from "@vercel/analytics/react"

function App() {


  return (
    <div>
      <WindowProvider>
        <GlobalProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<DefaultLayout />}>

                <Route index element={<Home />} />

                {/* POPULAR MOVIES */}
                <Route path='/popular-movie' element={<PopularMovie />} />
                <Route path='/movie' >
                  <Route path=':id' element={<Show type='movie' />} />
                  <Route path=':id/dettails' element={<DefaultDettails type='movie' />}>
                    <Route path='media' element={<MediasPage type='movie' />} />
                    <Route path='video' element={<VideoPage type='movie' />} />
                    <Route path='crew' element={<CrewPage type='movie' />} />
                  </Route>
                </Route>

                {/* POPULAR TVs */}
                <Route path='/popular-tv' element={<PopularTv />} />
                <Route path='/tv' >
                  <Route path=':id' element={<Show type='tv' />} />
                  <Route path=':id/dettails' element={<DefaultDettails type='tv' />}>
                    <Route path='media' element={<MediasPage type='tv' />} />
                    <Route path='video' element={<VideoPage type='tv' />} />
                    <Route path='crew' element={<CrewPage type='tv' />} />
                  </Route>
                </Route>

                {/* PERSONS */}
                <Route path='/person'>
                  <Route path=':id' element={<PersonPage />} />
                  <Route path=':id/dettails' element={<DefaultDettails type={'person'} />}>
                    <Route path='media' >
                      <Route path='person' element={<MediaPerson />} />
                      <Route path='images' element={<MediaTaggedPerson />} />
                      <Route path='shows' element={<AllMovieTv />} />
                    </Route>
                  </Route>
                </Route>

                {/* SEARCH */}
                <Route path='/search' element={<SearchPage />} />

              </Route>

              {/* ERRORS */}
              <Route path='/' element={<BlankLayout />}>
                <Route path='not-found' element={<NotFound />}></Route>
              </Route>
              <Analytics />
            </Routes>
          </BrowserRouter>
        </GlobalProvider>
      </WindowProvider>

      <SpeedInsights />
    </div>
  )
}

export default App
