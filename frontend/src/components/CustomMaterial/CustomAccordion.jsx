import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp"
import { styled } from "@mui/material/styles"
import MuiAccordionSummary from "@mui/material/AccordionSummary"
import MuiAccordionDetails from "@mui/material/AccordionDetails"
import MuiAccordion from "@mui/material/Accordion"

export const AccordionCustom = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))({
  "&:not(:last-child)": {
    borderBottom: 0
  },
  "&:before": {
    display: "none"
  }
})

export const AccordionSummaryCustom = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "1.3rem" }} />}
    {...props}
  />
))({
  paddingLeft: 0,
  backgroundColor: "#fff",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)"
  },
  "& p": {
    fontSize: 18,
    fontWeight: 400,
    textTransform: "uppercase"
  }
})

export const AccordionDetailsCustom = styled(MuiAccordionDetails)({
  padding: 0,
  "& span": {
    fontSize: 16,
    fontWeight: 400
  },
  marginLeft: 10,
  marginBottom: 10
})
