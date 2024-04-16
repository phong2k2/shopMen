import PropTypes from "prop-types"

function HeaderPageAdmin({title, subTitle}) {
    return ( 
        <div className="">
            <div className="">
              <h4 className="card-title">{title}</h4>
            </div>
          </div>
     );
}

HeaderPageAdmin.propTypes = {
    title: PropTypes.string,
    subTitle: PropTypes.string,
}

export default HeaderPageAdmin;