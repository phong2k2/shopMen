import { useState } from "react"
import Typography from "@mui/material/Typography"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import {
  AccordionCustom,
  AccordionDetailsCustom,
  AccordionSummaryCustom
} from "./CustomAccordion"
import { useDeliveryInfo } from "@/hook/useContext"
import { PUBLICROUTER } from "@/config/routes"

export const CustomizeAccordion = ({ listCategory }) => {
  const [expanded, setExpanded] = useState("panel1")
  const { setShowModalFilter, setShowModalCategory } = useDeliveryInfo()

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  const handleCloseModal = () => {
    setShowModalCategory(false)
    setShowModalFilter(false)
  }

  return (
    <AccordionCustom
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
    >
      <AccordionDetailsCustom>
        {listCategory?.map((item) => (
          <AccordionCustom
            key={item?._id}
            sx={{
              marginLeft: 2
            }}
          >
            <AccordionSummaryCustom aria-controls="panel1d-content">
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: 16,
                  textTransform: "capitalize !important"
                }}
              >
                {item?.name}
              </Typography>
            </AccordionSummaryCustom>
            {item?.subCategory?.map((subItem) => (
              <AccordionDetailsCustom key={subItem?._id}>
                <Link
                  style={{
                    color: "#000"
                  }}
                  to={PUBLICROUTER.product.subCategory(
                    subItem?._id,
                    subItem?.name
                  )}
                  onClick={handleCloseModal}
                >
                  <Typography
                    sx={{
                      cursor: "pointer",
                      textTransform: "capitalize"
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
  )
}

CustomizeAccordion.propTypes = {
  listCategory: PropTypes.array
}
