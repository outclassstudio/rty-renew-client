import { useEffect, useState } from "react";
import styled from "styled-components";
import { colorSet, fadeMoveActionDelay, fadeOut } from "../../style/global";
import GiftModal from "./GiftModal";
import useDate from "../../hooks/useDate";

interface Props {
  data: any;
}

export default function GiftListBox({ data }: Props) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [date, setDate] = useState<string>("");
  const [nowAdd, setNowAdd] = useState<boolean>(false);
  const [nowAni, setNowAni] = useState<string>("now");
  const currentDate = useDate();

  //svg url세팅
  const svgStr = data.svg.data;
  // const svg = new Blob([svgStr], { type: "image/svg+xml" });
  // const url = URL.createObjectURL(svg);

  //날짜세팅
  useEffect(() => {
    if (data.createdAt) {
      // const year = data.createdAt.split(" ")[0];
      // const hour = data.createdAt.split(" ")[1].split(":")[0];
      // const min = data.createdAt.split(" ")[1].split(":")[1];
      // let dateStr = "";

      // //*보낸 날짜 포매팅
      // if (Number(hour) > 12) {
      //   dateStr = `${year} 오후${Number(hour) - 12}:${min}`;
      // } else {
      //   dateStr = `${year} 오전${hour}:${min}`;
      // }
      // setDate(dateStr);
      let dateStr = data.createdAt.split("T")[0];
      setDate(dateStr);

      // //*현재시각과 비교하여 CSS변경
      // if (
      //   currentDate.now === year &&
      //   Math.abs(
      //     Number(`${currentDate.hour}${currentDate.min}`) -
      //       Number(`${hour}${min}`)
      //   ) < 3
      // ) {
      //   setNowAdd(true);
      // }

      // setTimeout(() => {
      //   setNowAdd(false);
      //   // setNowAni("close");
      // }, 5000);
    }
  }, []);

  //모달 on/off함수
  const handleOpenModal = () => {
    setOpenModal((prev) => !prev);
  };

  return (
    <BoxWrapper onClick={handleOpenModal} className={nowAdd ? nowAni : ""}>
      {nowAdd ? <OverWrapText>방금전</OverWrapText> : ""}
      <BoxSvg src={svgStr} alt="" />
      <Text>
        <div>to. {data.userTo.nickname}</div>
        <div>{date}</div>
      </Text>
      {openModal && <GiftModal data={data} />}
    </BoxWrapper>
  );
}

const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  color: ${colorSet.base};
  border-radius: 10px 10px 11px 11px;
  width: 160px;
  height: 183px;
  box-shadow: rgba(50, 50, 93, 0.5) 0px 0px 10px 0px;
  cursor: pointer;

  &.now {
    outline: 3px solid ${colorSet.darkPink};
    box-shadow: rgba(224, 40, 80, 0.5) 0px 0px 10px 0px;
    animation: ${fadeMoveActionDelay} 0.8s ease-in;
  }
`;

const BoxSvg = styled.img`
  margin-bottom: 5px;
  padding: 13px 35px 13px 35px;
`;

const Text = styled.div`
  width: 137px;
  height: 43px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${colorSet.base};
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

const OverWrapText = styled.div`
  /* height: 185px; */
  width: 160px;
  position: fixed;
  font-size: 13px;
  margin-top: 5px;
  margin-left: 5px;
  /* font-weight: bold; */
  color: ${colorSet.pink};
  font-family: "Hanna", sans-serif;
`;
