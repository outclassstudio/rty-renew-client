import { useState } from "react";
import Calendar from "react-calendar";
import "../style/myPicker.css";
import styled from "styled-components";

interface Props {
  handleAcitvePicker: () => void;
  handleDateValue: (date: string) => void;
}

export default function MyPicker({
  handleAcitvePicker,
  handleDateValue,
}: Props) {
  const [date, setDate] = useState<Date>(new Date());

  const handleOnChange = (value: Date) => {
    let currentDate = value;
    let year = currentDate.getFullYear();
    let month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
    let day = ("0" + currentDate.getDate()).slice(-2);
    let dateString = `${year}-${month}-${day}`;

    handleDateValue(dateString);
    handleAcitvePicker();
    setDate(value);
  };

  return (
    <CalendarContainer>
      <Calendar onClickDay={handleOnChange} onChange={setDate} value={date} />
    </CalendarContainer>
  );
}

const CalendarContainer = styled.div`
  z-index: 1;
`;
