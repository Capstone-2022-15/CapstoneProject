import React from "react";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { calendarActions } from "../slices/calendarSlice";

import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
// import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
// import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import styled from "styled-components";

const StyledDiv = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 70%;
`;

function MyCalendar() {
  // const { calendar } = useSelector((state) => state.calendarReducer);

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(calendarActions.getCalendar());
  // }, [dispatch]);

  // const [viewContent, setViewContent] = useState([]); // 적힌 내용 저장

  // console.log(calendar);

  // const newArray = calendar.data.map((board) => ({
  //   title: board.subject,
  //   start: board.startDate,
  //   end: board.finalDate,
  // }));
  // setViewContent(...newArray);

  return (
    <StyledDiv
      className="App"
      // style={{ width: "70%", display: flex, justify-content: center, marginTop: "50px" }}
    >
      <FullCalendar
        locale={"ko"}
        height={900}
        handleWindowResize={true}
        contentHeight={300}
        droppable={true}
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin]}
        events={[
          { title: "캡스톤 발표", date: "2022-06-08" },
          { title: "기말고사", start: "2022-06-15", end: "2022-06-22" },
          { title: "캡스톤 마무리 발표", date: "2022-06-23" },
        ]}
        eventLimit={true}
        dayMaxEvents={3}
      />
    </StyledDiv>
  );
}

export default MyCalendar;
