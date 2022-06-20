import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calendarActions } from "../slices/calendarSlice";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import styled from "styled-components";
const StyledDiv = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 70%;
`;

function MyCalendar() {
  const { calendar } = useSelector((state) => state.calendarReducer);

  if (calendar.data !== undefined) {
    var newArray = calendar.data.map(function (cal) {
      const newObj = {};
      newObj["title"] = cal.subject;
      newObj["start"] = cal.startDate.replace("T00:00:00.000Z", "");
      newObj["end"] = cal.finalDate.replace("T00:00:00.000Z", "");
      return newObj;
    });
  }
  console.log(newArray);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calendarActions.getCalendar());
  }, [dispatch]);

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
        // events={[
        //   { title: "캡스톤 발표", start: "2022-06-08", end: "2022-06-10" },
        //   { title: "기말고사", start: "2022-06-15", end: "2022-06-22" },
        //   { title: "캡스톤 마무리 발표", date: "2022-06-23" },
        // ]}
        events={newArray}
        eventLimit={true}
        dayMaxEvents={3}
      />
    </StyledDiv>
  );
}

export default MyCalendar;
