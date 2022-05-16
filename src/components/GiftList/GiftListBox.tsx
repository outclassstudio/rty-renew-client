import { useEffect, useState } from "react";
import styled from "styled-components";
import { baseColor } from "../../style/global";
import GiftModal from "./GiftModal";

export default function GiftListBox({ data }: any) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [date, setDate] = useState<string>("");

  const svgStr = data.svg;
  const svg = new Blob([svgStr], { type: "image/svg+xml" });
  const url = URL.createObjectURL(svg);

  useEffect(() => {
    const year = data?.date?.split(" ")[0];
    const hour = data?.date?.split(" ")[1].split(":")[0];
    const min = data?.date?.split(" ")[1].split(":")[1];
    let dateStr = "";

    if (hour > 12) {
      dateStr = `${year} 오후${hour - 12}:${min}`;
    } else {
      dateStr = `${year} 오전${hour}:${min}`;
    }

    setDate(dateStr);
  }, []);

  //모달 on/off함수
  const handleOpenModal = () => {
    setOpenModal((prev) => !prev);
  };

  return (
    <BoxWrapper onClick={handleOpenModal}>
      <BoxSvg src={url} alt="" />
      <Text>
        <div>to. {data.userTo}</div>
        <div>{date}</div>
      </Text>
      {openModal ? <GiftModal data={data} /> : ""}
    </BoxWrapper>
  );
}

const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  color: ${baseColor};
  border-radius: 10px 10px 11px 11px;
  width: 160px;
  box-shadow: rgba(50, 50, 93, 0.5) 0px 0px 10px 0px;
  cursor: pointer;
`;

const BoxSvg = styled.img`
  margin-bottom: 5px;
  padding: 20px 35px 20px 35px;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  background: ${baseColor};
  color: white;
  font-size: 16px;
  font-weight: bold;
  padding: 12px 0px 12px 24px;
  border-radius: 0px 0px 10px 10px;

  div:nth-child(2) {
    font-size: 13px;
    color: #ffffffb5;
    font-weight: 200;
  }
`;
