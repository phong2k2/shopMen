const wrapperSkeleton = {
  display: "flex",
  gap: "50px"
}

const wrapperSkeletonLeft = {
  width: "50%",
  display: "flex"
}

const wrapperSkeletonRight = {
  width: "50%"
}
const slideVertical = {
  width: "30%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "6px"
}

const slideHorizontal = {
  width: "70%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center"
}

const wrapperAttribute = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "6px",
  height: "50px"
}

const wrapperBtn = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "6px"
}

const wrapperText = {
  display: "flex",
  flexDirection: "column",
  marginTop: "10px",
  gap: "1px"
}

export default {
  wrapperSkeleton,
  wrapperSkeletonLeft,
  wrapperSkeletonRight,
  slideVertical,
  slideHorizontal,
  wrapperAttribute,
  wrapperBtn,
  wrapperText
}
