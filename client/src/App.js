import React , {useState} from 'react';
import ResponsiveAppBar from './components/TopNav.js';
import Notice from './components/Notice/Notice.js';
import TopNav from './components/TopNav.js';
import Notice_info from './components/Notice/Notice_info.js';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Write from './components/Notice/Write.js';
import Calendar from './components/Calendar/Calendar.js';
import Scholarship from './components/Scholarship/Scholarship.js';
import Community from './components/Community/Community.js';
import Home from './components/Home.js';
import FullCalendar from './components/FullCalendar.js';

function App(){
    return(
        
        <div>
            {/* <BrowserRouter>

            <Routes>
                    <Route path="/TopNav/*" element={<TopNav/>}></Route>
            </Routes>

                <Routes>

                    <Route path="/" element={<Home/>}></Route>
                    <Route path="/TopNav/Notice" element={<Notice/>}></Route>
                    <Route path="/TopNav/Schedule" element={<Calendar/>}></Route>
                    <Route path="/TopNav/Write" element={<Write/>}></Route>
                    <Route path="/TopNav/Notice_info" element={<Notice_info/>}></Route>
                    <Route path="/TopNav/Scholarship" element={<Scholarship/>}></Route>
                    <Route path="/TopNav/Community" element={<Community/>}></Route>
                </Routes>
          </BrowserRouter>         */}

          {/* FullCalendar 구현 */}
          <BrowserRouter>
              <TopNav/>
                <FullCalendar/>
        </BrowserRouter>
        </div>
    );
}

export default App;