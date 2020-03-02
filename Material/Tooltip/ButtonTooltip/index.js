import React from 'react'
import PropTypes from 'prop-types'
import Tooltip, { TooltipPropTypes } from '../.'
import Button from '@material-ui/core/Button'

function ButtonTooltip({ children, ...otherProps }) {

    return (
        <Tooltip
            Component={Button}
            {...otherProps}
        >
            {children}
        </Tooltip>
    )
}

Tooltip.defaultProps = {
    arrow: true,
}

ButtonTooltip.propTypes = {
    ...TooltipPropTypes,
}

export default ButtonTooltip
