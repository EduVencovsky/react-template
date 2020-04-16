import React from 'react'
import PropTypes from 'prop-types'

function GrowContainer({ children, ...otherProps }) {
    return (
        <div style={{ flexGrow: 1 }} {...otherProps}>
            {children}
        </div>
    )
}

GrowContainer.propTypes = {
    children: PropTypes.node,
}

export default GrowContainer
