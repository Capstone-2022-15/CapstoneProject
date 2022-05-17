import "./style.css"

let date = new Date();

const renderCalendar = ()=> {
    
    const viewYear = date.getFullYear();
    const viewMonth = date.getMonth();

    const prevLast = new Date(viewYear, viewMonth, 0);
    const thisLast = new Date(viewYear, viewMonth+1, 0);

    const PLDate = prevLast.getDate();
    const PLDay = prevLast.getDay();

    const TLDate = thisLast.getDate();
    const TLDay = thisLast.getDay();

    const prevDates = [];
    const thisDates = [...Array(TLDate + 1).keys()].slice(1);
    const nextDates = [];

    if(PLDay !==6){
        for(let i = 0; i < PLDay + 1; i++){
            prevDates.unshift(PLDate -i);
        }
    }

    for (let i = 1; i< 7 -TLDay; i++){
        nextDates.push(i);
    }

    const dates = prevDates.concat(thisDates, nextDates);
    const firstDateIndex = dates.indexOf(1);
    const lastDateIndex = dates.lastIndexOf(TLDate);

    const conditionList = []; 
    const dateList = [];
    dates.forEach((date, i)=> {
        const condition = i >= firstDateIndex && i < lastDateIndex + 1
                         ? 'this'
                         : 'other'; 
        // dates[i] = `<div className="date"><span className = "${condition}"> ${date}</span> </div>`;
        conditionList.push(condition);
        dateList.push(date);
    });

    
    const today = new Date();
    if (viewMonth === today.getMonth() && viewYear === today.getFullYear()){
        for (let date of document.querySelectorAll('.this')){
            if(+date.innerText === today.getDate()){
                date.classList.add('today');
                break;
            }
        }
    }
    const ax = document.querySelector('.dates');
    const bx = document.querySelector('.year-month');
    if(ax!=null){
        const doms=ax.childNodes
        for( let i = 0; i <35; i ++){
            const ai = doms[i].childNodes[0];
            ai.className = conditionList[i];
            ai.textContent = dateList[i];
        }
    }
    if(bx!=null){
        bx.textContent = `${viewYear}년 ${viewMonth + 1}월`;
    }
    console.log(ax);

    const prevMonth=()=>{
        date.setMonth(date.getMonth()-1);
        renderCalendar();
    };

    const nextMonth =()=>{

        date.setMonth(date.getMonth()+1);
        renderCalendar();
    }

    const goToday = () =>{

        date= new Date();
        renderCalendar();
    };
    // console.log("Song");
    // document.querySelector('.dates').innerHTML = dates.join('');
    // console.log(dateList, conditionList);
    return (
    <div className="calendar"  style={{position: 'absolute', top: '15%',left: '25%'}}>
        <div className="body">
    <div className="header">
        <div className="year-month">{viewYear}년 {viewMonth + 1}월</div>
    <div className="nav" >
        <p>
        <button className="nav-btn go-prev" onClick={prevMonth}>&lt;</button>
        <button className="nav-btn go-today" onClick={goToday}>오늘</button>
        <button className="nav-btn go-next" onClick={nextMonth}>&gt;</button>
        </p>
        </div>
    </div>
    <div className="main">
        <div className="days">
        <div className="day">일</div>
        <div className="day">월</div>
        <div className="day">화</div>
        <div className="day">수</div>
        <div className="day">목</div>
        <div className="day">금</div>
        <div className="day">토</div>
        </div>
        <div className="dates">
            <div className="date"><span className = {conditionList[0]}> {dateList[0]}</span> </div>
            <div className="date"><span className = {conditionList[1]}> {dateList[1]}</span> </div>
            <div className="date"><span className = {conditionList[2]}> {dateList[2]}</span> </div>
            <div className="date"><span className = {conditionList[3]}> {dateList[3]}</span> </div>
            <div className="date"><span className = {conditionList[4]}> {dateList[4]}</span> </div>
            <div className="date"><span className = {conditionList[5]}> {dateList[5]}</span> </div>
            <div className="date"><span className = {conditionList[6]}> {dateList[6]}</span> </div>
            <div className="date"><span className = {conditionList[7]}> {dateList[7]}</span> </div>
            <div className="date"><span className = {conditionList[8]}> {dateList[8]}</span> </div>
            <div className="date"><span className = {conditionList[9]}> {dateList[9]}</span> </div>
            <div className="date"><span className = {conditionList[10]}> {dateList[10]}</span> </div>
            <div className="date"><span className = {conditionList[11]}> {dateList[11]}</span> </div>
            <div className="date"><span className = {conditionList[12]}> {dateList[12]}</span> </div>
            <div className="date"><span className = {conditionList[13]}> {dateList[13]}</span> </div>
            <div className="date"><span className = {conditionList[14]}> {dateList[14]}</span> </div>
            <div className="date"><span className = {conditionList[15]}> {dateList[15]}</span> </div>
            <div className="date"><span className = {conditionList[16]}> {dateList[16]}</span> </div>
            <div className="date"><span className = {conditionList[17]}> {dateList[17]}</span> </div>
            <div className="date"><span className = {conditionList[18]}> {dateList[18]}</span> </div>
            <div className="date"><span className = {conditionList[19]}> {dateList[19]}</span> </div>
            <div className="date"><span className = {conditionList[20]}> {dateList[20]}</span> </div>
            <div className="date"><span className = {conditionList[21]}> {dateList[21]}</span> </div>
            <div className="date"><span className = {conditionList[22]}> {dateList[22]}</span> </div>
            <div className="date"><span className = {conditionList[23]}> {dateList[23]}</span> </div>
            <div className="date"><span className = {conditionList[24]}> {dateList[24]}</span> </div>
            <div className="date"><span className = {conditionList[25]}> {dateList[25]}</span> </div>
            <div className="date"><span className = {conditionList[26]}> {dateList[26]}</span> </div>
            <div className="date"><span className = {conditionList[27]}> {dateList[27]}</span> </div>
            <div className="date"><span className = {conditionList[28]}> {dateList[28]}</span> </div>
            <div className="date"><span className = {conditionList[29]}> {dateList[29]}</span> </div>
            <div className="date"><span className = {conditionList[30]}> {dateList[30]}</span> </div>
            <div className="date"><span className = {conditionList[31]}> {dateList[31]}</span> </div>
            <div className="date"><span className = {conditionList[32]}> {dateList[32]}</span> </div>
            <div className="date"><span className = {conditionList[33]}> {dateList[33]}</span> </div>
            <div className="date"><span className = {conditionList[34]}> {dateList[34]}</span> </div>
        </div>
    </div>
    </div>
    </div>
    );
}

export default renderCalendar;
