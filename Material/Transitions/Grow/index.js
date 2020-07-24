import React from 'react'
import PropTypes from 'prop-types'

import MaterialGrow from '@material-ui/core/Grow'

function Grow({ children, delay, style, ...otherProps }) {

    style = delay ? { ...style, transitionDelay: delay, } : style

    return (
        <MaterialGrow style={style} {...otherProps} >
            <div>
                {children}
            </div>
        </MaterialGrow>
    )
}

Grow.propTypes = {
    children: PropTypes.node.isRequired,
    delay: PropTypes.number,
    in: PropTypes.bool,
    style: PropTypes.object,
}

export default Grow
