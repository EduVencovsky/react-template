import React from 'react'
import PropTypes from 'prop-types'
import MUIBadge from '@material-ui/core/Badge'

const defaultAnchor = {
    vertical: 'top',
    horizontal: 'right',
}

function Badge({
    children,
    variant,
    dot,
    circle,
    overlap,
    top,
    left,
    right,
    bottom,
    div,
    component,
    badgeContent,
    ...otherProps
}) {
    let vertical = bottom ? 'bottom' : top ? 'top' : defaultAnchor.vertical
    let horizontal = left ? 'left' : right ? 'right' : defaultAnchor.horizontal

    let customComponent = component ? component : div ? 'div' : undefined

    let customBadgeContent = badgeContent !== undefined ? badgeContent : dot ? ' ' : undefined

    let customVariant = variant ? variant : dot ? 'dot' : 'standard'

    let customOverlap = overlap ? overlap : circle ? 'circle' : 'rectangle'

    return (
        <MUIBadge
            overlap={customOverlap}
            variant={customVariant}
            component={customComponent}
            badgeContent={customBadgeContent}
            anchorOrigin={{ vertical, horizontal }}
            {...otherProps}
        >
            {children}
        </MUIBadge>
    )
}

const checkVertical = props => anchorTest(props, ['bottom', 'top'])
const checkHorizontal = props => anchorTest(props, ['left', 'right'])

const anchorTest = (props, usedPropsNames) => {
    const trueValueProps = usedPropsNames.filter(x => props[x])
    if (trueValueProps.length > 1) {
        return new Error(`Only one of the props ${trueValueProps.join(', ')} should be true`)
    }
}

Badge.defaultProps = {}

Badge.propTypes = {
    dot: PropTypes.bool,
    top: checkVertical,
    bottom: checkVertical,
    left: checkHorizontal,
    right: checkHorizontal,
    circle: PropTypes.bool,
    variant: PropTypes.string,
    overlap: PropTypes.string,
}

export default Badge
