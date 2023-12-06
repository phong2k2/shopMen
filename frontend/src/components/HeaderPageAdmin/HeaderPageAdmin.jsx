import PropTypes from "prop-types"

function HeaderPageAdmin({title, subTitle}) {
    return ( 
        <div className="">
            <div className="">
              <h4 className="card-title">{title}</h4>
              <p className="card-description">
                {subTitle}
              </p>
            </div>
          </div>
     );
}

HeaderPageAdmin.propTypes = {
    title: PropTypes.string,
    subTitle: PropTypes.string,
}

export default HeaderPageAdmin;