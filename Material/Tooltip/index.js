import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import MUITooltip from '@material-ui/core/Tooltip'
import { Typography } from '@material-ui/core'

function Tooltip({
    arrow,
    title,
    children,
    bottomEnd,
    bottomStart,
    bottom,
    leftEnd,
    leftStart,
    left,
    rightEnd,
    rightStart,
    right,
    topEnd,
    topStart,
    top,
    Component,
    withWrapper,
    ...otherProps
}) {

    const placementProps = {
        'bottom-end': bottomEnd,
        'bottom-start': bottomStart,
        'bottom': bottom,
        'left-end': leftEnd,
        'left-start': leftStart,
        'left': left,
        'right-end': rightEnd,
        'right-start': rightStart,
        'right': right,
        'top-end': topEnd,
        'top-start': topStart,
        'top': top,
    }

    const placement = Object.keys(placementProps).find(x => placementProps[x])

    const titleComponent = typeof title === 'string' ? <Typography>{title}</Typography> : title

    const WrappedComponent = withWrapper ?
        <span>
            <Component
                {...otherProps}
            >
                {children}
            </Component>
        </span> :
        <Component
            {...otherProps}
        >
            {children}
        </Component>

    return (
        <MUITooltip
            title={titleComponent}
            {...{ arrow, placement }}
        >
            {WrappedComponent}
        </MUITooltip>
    )
}

Tooltip.defaultProps = {
    withWrapper: true,
    Component: 'div',
}

const placementPropsName = ['bottomEnd', 'bottomStart', 'bottom', 'leftEnd', 'leftStart', 'left', 'rightEnd', 'rightStart', 'right', 'topEnd', 'topStart', 'top']

const placementTest = props => {
    const trueValueProps = placementPropsName.filter(x => props[x])
    if (trueValueProps.length > 1) {
        return new Error(`Only one of the props ${trueValueProps.join(', ')} should be true`)
    }
}

export const TooltipPropTypes = {
    arrow: PropTypes.bool,
    children: PropTypes.node,
    bottomEnd: placementTest,
    bottomStart: placementTest,
    bottom: placementTest,
    leftEnd: placementTest,
    leftStart: placementTest,
    left: placementTest,
    rightEnd: placementTest,
    rightStart: placementTest,
    right: placementTest,
    topEnd: placementTest,
    topStart: placementTest,
    top: placementTest,
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
}

Tooltip.propTypes = {
    ...TooltipPropTypes,
    Component: PropTypes.any, // why PropTypes.elementType doesn't work
}

export default Tooltip
