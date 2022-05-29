import { hover } from "@testing-library/user-event/dist/hover";
import styled from "styled-components";

const ToolTipBox = styled.div`
  position: "relative",
  display: "inline-block",
  borderBottom: "1px dotted black",
  & :hover{
    visibility: "visible",
  },
 

`;

const ToolTipText = styled("span")({
  visibility: "hidden",
  width: "1200px",
  backgroundColor: "#000",
  color: "#fff",
  textAlign: "center",
  borderRadius: "6px",
  padding: "5px 0",
  position: "absolute",
  zIndex: 1,
  bottom: "150%",
  left: "50%",
  marginLeft: "-60px",
  ":after": {
    content: '""',
    position: "absolute",
    top: "100%",
    left: "50%",
    marginLeft: "-5px",
    borderWidth: "5px",
    borderStyle: "solid",
    borderColor: "black transparent transparent transparent",
  },
});

export function ToolTip(props: any) {
  const toolTipText = props.toolTipText;
  return (
    <ToolTipBox>
      <ToolTipText>{toolTipText}</ToolTipText>
    </ToolTipBox>
  );
}
