import React, {Component} from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import { sliceEvents, createPlugin } from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'


class MyCalendar extends Component {
    constructor(props){
        super(props);
    }
    
    render() {
        return (

          <div className="App" style={{width:"70%", marginLeft:"400px", marginTop:"50px"}}>
            <FullCalendar 
              locale={'ko'}
              height = {900}
              handleWindowResize={true}
              contentHeight ={300}
              droppable={true}        
              defaultView="dayGridMonth" 
              plugins={[ dayGridPlugin ]}
              events={[
                { title: '캡스톤 발표', date: '2022-06-08' },
                { title: '기말고사', start : '2022-06-15', end: '2022-06-22'},
                { title: '캡스톤 마무리 발표', date: '2022-06-23' }

                ]}
              eventLimit={true} 
              dayMaxEvents={3}
            />
          </div>
        );
        
      }

}

export default MyCalendar;