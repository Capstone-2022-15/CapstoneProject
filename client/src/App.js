import React , {useState} from 'react';
import ResponsiveAppBar from './components/TopNav.js';
import Notice from './components/Notice/Notice.js';
import TopNav from './components/TopNav.js';
function App(){
    const x =  <div> <ResponsiveAppBar/> </div>
    return(
        <div>
            <TopNav/>

        </div>
    );
}

export default App;