import PaginationLib from "@mui/material/Pagination";

function Pagination({
  count,
  color = "primary",
  size = "large",
  boundaryCount = 2,
  onChange,
  ...props
}) {
  return (
    <PaginationLib
      sx={{
        display: "flex",
        justifyContent: "center",
        listStyle: "none",
        padding: 5,
        marginBottom: 0,
        "&  svg": {
          fontSize: "2.2rem",
        },
      }}
      count={count}
      color={color}
      size={size}
      boundaryCount={boundaryCount}
      showFirstButton
      showLastButton
      onChange={onChange}
      {...props}
    />
  );
}

export default Pagination;
