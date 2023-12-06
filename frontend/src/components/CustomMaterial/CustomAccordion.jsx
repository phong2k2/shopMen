import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { styled } from "@mui/material/styles";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordion from "@mui/material/Accordion";

export const AccordionCustom = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
  "& .MuiButtonBase-root": {
    backgroundColor: "#f9fafa",
    padding: 0,
  },
  ".MuiCollapse-wrapperInner": {
    backgroundColor: "#f9fafa",
  },
}));

export const AccordionSummaryCustom = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "1.3rem" }} />}
    {...props}
  />
))(() => ({
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
}));

export const AccordionDetailsCustom = styled(MuiAccordionDetails)(
  ({ theme }) => ({
    padding: theme.spacing(0),
    // "& .MuiAccordion-region": {
    //   backgroundColor: "#f9fafa",
    // },
  })
);
