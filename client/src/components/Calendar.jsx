// import React, {useState, useEffect} from "react";
// import moment from "moment";
// import "./styles.css";
// import buildCalendar from "./build";

// export default function Calendar(){
//   const [calendar, setCalendar] = useState([]);
//   const [value, setValue] = useState(moment());

//   useEffect(()=>{
//     setCalendar(buildCalendar(value));
//   }, [value]);

//   function isSelected(day){
//     return value.isSame(day, "day");
//   }

//   function beforeToday(day){
//     return day.isBefore(new Date(), "day");
//   }

//   function isToday(day){
//     return day.isSame(new Date(), "day");
//   }

//   function dayStyles(day){
//     if(beforeToday(day)) return "before"
//     if(isSelected(day)) return "selected"
//     if(isToday(day)) return "today"
//     return ""
//   }
//   return( 
//     <div className="calendar">
//       {calendar.map((week)=> (
//         <div>
//           {week.map((day)=> (
//             <div className="day"
//               onClick={()=>setValue(day)}
//             >
//               <div
//                 className={dayStyles(day)}
//               >
//                 {day.format("D").toString()}
//               </div>
//             </div>
//             ))}
//         </div>))
//       }
//     </div>
//   );
// }


const date= new Date();

const viewYear = date.getFullYear();
const viewMonth = date.getMonth();

document.querySelector('.year-month').textContent=`${viewYear}년 ${viewMonth +1}월`