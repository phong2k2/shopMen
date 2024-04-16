import { useState } from "react";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  AccordionCustom,
  AccordionDetailsCustom,
  AccordionSummaryCustom,
} from "./CustomAccordion";
import { useDeliveryInfo } from "@/hook/useContext";
import { PUBLICROUTER } from "@/config/routes";

export const CustomizeAccordion = ({ listCategory }) => {
  const [expanded, setExpanded] = useState("panel1");
  const { setShowModalFilter } = useDeliveryInfo();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <AccordionCustom
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
    >
      <AccordionSummaryCustom
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 400,
            fontSize: 15,
          }}
        >
          Danh mục
        </Typography>
      </AccordionSummaryCustom>

      <AccordionDetailsCustom>
        {listCategory?.map((item) => (
          <AccordionCustom key={item?._id}>
            <AccordionSummaryCustom aria-controls="panel1d-content">
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: 16,
                }}
              >
                {item?.name}
              </Typography>
            </AccordionSummaryCustom>
            {item?.subCategory?.map((subItem) => (
              <AccordionDetailsCustom key={subItem?._id}>
                <Link 
                  style={{
                    color: '#000'
                  }} 
                  to={PUBLICROUTER.product.subCategory(subItem?._id, subItem?.name)}
                  onClick={()=>setShowModalFilter(false)} 
                >
                  <Typography
                    sx={{
                      fontSize: 13,
                      cursor: "pointer",
                      textTransform: "capitalize",
                    }}
                    variant="button"
                  >
                    {subItem?.name}
                  </Typography>
               </Link>
              </AccordionDetailsCustom>
            ))}
          </AccordionCustom>
        ))}
      </AccordionDetailsCustom>
    </AccordionCustom>
  );
};

CustomizeAccordion.propTypes = {
  listCategory: PropTypes.array,
};
