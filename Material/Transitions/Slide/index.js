import React from 'react'
import PropTypes from 'prop-types'

import MaterialSlide from '@material-ui/core/Slide'

function Slide({ children, delay, style, ...otherProps }) {

    style = delay ? { ...style, transitionDelay: delay, } : style

    return (
        <MaterialSlide style={style} {...otherProps}>
            <div>
                {children}
            </div>
        </MaterialSlide>
    )
}

Slide.propTypes = {
    direction: PropTypes.oneOf(['left', 'right', 'up', 'down']),
    children: PropTypes.node.isRequired,
    delay: PropTypes.number,
    in: PropTypes.bool,
    style: PropTypes.object,
}

export default Slide
