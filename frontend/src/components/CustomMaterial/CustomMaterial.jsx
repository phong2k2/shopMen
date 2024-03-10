import { useState } from "react";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  AccordionCustom,
  AccordionDetailsCustom,
  AccordionSummaryCustom,
} from "./CustomAccordion";
import { useDeliveryInfo } from "@/hook/useContext";

export const CustomizeAccordion = ({ listCategory }) => {
  const [expanded, setExpanded] = useState("panel1");
  const { setShowModalFilter } = useDeliveryInfo();
  const navigate = useNavigate();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleClickShowProduct = (subItem) => {
    navigate(`/collections/${subItem?.slug}`, {
      state: { stateNav: subItem },
    });
    setShowModalFilter(false);
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
            fontFamily: "CriteriaCF",
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
                <Typography
                  sx={{
                    fontSize: 13,
                    cursor: "pointer",
                    textTransform: "capitalize",
                  }}
                  variant="button"
                  onClick={() => handleClickShowProduct(subItem)}
                >
                  {subItem?.name}
                </Typography>
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
