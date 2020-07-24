import React from 'react'
import PropTypes from 'prop-types'

import MaterialFade from '@material-ui/core/Fade'

function Fade({ children, delay, style, ...otherProps }) {

    style = delay ? { ...style, transitionDelay: delay, } : style

    return (
        <MaterialFade style={style} {...otherProps}>
            <div>
                {children}
            </div>
        </MaterialFade>
    )
}

Fade.propTypes = {
    children: PropTypes.node.isRequired,
    delay: PropTypes.number,
    in: PropTypes.bool,
    style: PropTypes.object,
}

export default Fade
