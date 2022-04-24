// https://github.com/marvelopers/react_template/blob/master/src/util/calendar/component/Calendar.tsx

import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/HeaderDom";
import previous from "../img/bi_arrow-left-square-fill.png";
import next from "../img/bi_arrow-right-square-fill.png";

function Calendar() {
  const dayjs = require("dayjs");
  const weekday = require("dayjs/plugin/weekday");
  const isoWeek = require("dayjs/plugin/isoWeek");
  const weekOfYear = require("dayjs/plugin/weekOfYear");

  dayjs.extend(weekday);
  dayjs.extend(isoWeek);
  dayjs.extend(weekOfYear);

  const today = dayjs();
  const [viewDate, setViewDate] = useState(dayjs());
  const [selectDate, setSelectDate] = useState(dayjs());

  const createCalendar = () => {
    const startWeek = viewDate.startOf("month").week();
    const endWeek =
      viewDate.endOf("month").week() === 1
        ? 53
        : viewDate.endOf("month").week();
    let calender = [];

    for (let week = startWeek; week <= endWeek; week++) {
      calender.push(
        <div className="row" key={week}>
          {Array(7)
            .fill(0)
            .map((n, i) => {
              let current = viewDate
                .startOf("week")
                .week(week)
                .add(n + i, "day");
              if (viewDate.format("MM") === "12") {
                current = viewDate
                  .startOf("week")
                  .week(week - 52)
                  .add(n + i, "day");
              }
              // 현재 날짜 (기준)
              let isSelected =
                selectDate.format("YYYYMMDD") === current.format("YYYYMMDD")
                  ? "selected"
                  : "";
              let isToday =
                today.format("YYYYMMDD") === current.format("YYYYMMDD")
                  ? "today"
                  : "";
              let isNone =
                current.format("MM") === viewDate.format("MM") ? "" : "none";
              return (
                <>
                  <div className={`box`} key={`${week}_${i}`}>
                    <div
                      className={`text ${isSelected} ${isToday} ${isNone}`}
                      onClick={() => {
                        setSelectDate(current);
                      }}
                    >
                      <span className={`day`}>{current.format("D")}</span>
                      {isToday ? (
                        <span className="isToday">오늘</span>
                      ) : isSelected ? (
                        <span className="isSelected"></span>
                      ) : null}
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      );
    }
    return calender;
  };

  const changegeMonth = (date, changeString) => {
    switch (changeString) {
      case "add":
        return setViewDate(viewDate.add(1, "month"));
      case "subtract":
        return setViewDate(viewDate.subtract(1, "month"));
      default:
        return date;
    }
  };

  return (
    <>
      <Header />
      <div>
        <StyledHeader>
          <button
            className="previous_icon"
            onClick={() => changegeMonth(viewDate, "subtract")}
          ></button>
          <span className="thisMonth">{viewDate.format("MM")}월</span>
          <button
            className="next_icon"
            onClick={() => changegeMonth(viewDate, "add")}
          ></button>
        </StyledHeader>
        <StyledBody>
          <div className="row week">
            <div className="box">
              <span className="text">SUN</span>
            </div>
            <div className="box">
              <span className="text">MON</span>
            </div>
            <div className="box">
              <span className="text">TUE</span>
            </div>
            <div className="box">
              <span className="text">WED</span>
            </div>
            <div className="box">
              <span className="text">THU</span>
            </div>
            <div className="box">
              <span className="text">FRI</span>
            </div>
            <div className="box">
              <span className="text">SAT</span>
            </div>
          </div>
          <div>{createCalendar()}</div>
        </StyledBody>
      </div>
    </>
  );
}

export default Calendar;

const StyledHeader = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 20px;
  .thisMonth {
    font-weight: 700;
    color: #292929;
    line-height: 24px;
  }
  button {
    width: 24px;
    margin: 0 8px;
  }
  .previous_icon {
    width: 24px;
    height: 24px;
    background: url(${previous}) center no-repeat;
  }
  .next_icon {
    width: 24px;
    height: 24px;
    background: url(${next}) center no-repeat;
  }
`;

const StyledBody = styled.div`
  text-align: center;
  margin: 20px;
  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    width: 100%;
  }
  .row.week {
    height: 30px;
    border-bottom: 1px solid #e8e8e8;
  }
  .row .box {
    width: 32px;
    height: 32px;
    margin: 6px 6px;
    font-size: 14px;
  }
  .text {
    position: static;
    width: 32px;
    height: 32px;
    color: #292929;
  }
  .holiday,
  .grayed {
    color: #484848;
    pointer-events: none;
  }
  .day {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
  }
  .selected {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: pink;
    font-weight: 700;
    color: #fff;
  }
  .today {
    border-radius: 50%;
    font-weight: 500;
    /* color: pink; */
    background: pink;
  }
  .isSelected {
    position: relative;
    color: pink;
    font-size: 10px;
    font-weight: 400;
  }
  .isToday {
    position: relative;
    color: #292929;
    font-size: 10px;
    font-weight: 400;
  }
  .none {
    display: none;
  }
`;
