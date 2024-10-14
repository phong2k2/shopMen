const paper = {
  backgroundColor: "rgb(255, 255, 255)",
  color: "rgb(43, 52, 69)",
  transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  boxShadow: "rgba(3, 0, 71, 0.09) 0px 1px 3px",
  borderRadius: "4px",
  width: "100%",
  overflow: "hidden",
  marginBottom: "1.25rem"
}

const wrapContent = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignContent: "center",
  height: "100%",
  padding: "14px"
}

const boxImg = {
  position: "relative",
  display: "block",
  paddingBottom: "120%",
  width: "100%"
}

const skeletonImg = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "100%",
  width: "100%"
}

const wrapProductPrice = {
  display: "flex",
  justifyContent: "flex-start",
  gap: "10px"
}

export default {
  paper,
  wrapContent,
  wrapProductPrice,
  boxImg,
  skeletonImg
}
