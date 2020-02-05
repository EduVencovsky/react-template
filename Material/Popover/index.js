import React from 'react'
import PropTypes from 'prop-types'
import Popover from '@material-ui/core/Popover'

const addVerticalName = ([bottom, center, top]) => [
    { value: bottom, name: 'bottom' },
    { value: center, name: 'center' },
    { value: top, name: 'top' },
]

const addHorizontalName = ([left, middle, right]) => [
    { value: left, name: 'left' },
    { value: middle, name: 'center' }, // It's called middle but for MUI it's center
    { value: right, name: 'right' },
]

const defaultPosition = { name: 'center' }

function CustomPopover({
    style,
    isOpen,
    onClose,
    padding,
    anchorTop,
    elementRef,
    anchorCenter,
    anchorBottom,
    anchorLeft,
    anchorMiddle,
    anchorRight,
    elementTop,
    elementCenter,
    elementBottom,
    elementLeft,
    elementMiddle,
    elementRight,
    children,
    containerProps,
    ...otherProps
}) {

    const anchorVertical = addVerticalName([anchorBottom, anchorCenter, anchorTop]).find(x => x.value) || defaultPosition
    const anchorHorizontal = addHorizontalName([anchorLeft, anchorMiddle, anchorRight]).find(x => x.value) || defaultPosition

    const elementVertical = addVerticalName([elementBottom, elementCenter, elementTop]).find(x => x.value) || defaultPosition
    const elementHorizontal = addHorizontalName([elementLeft, elementMiddle, elementRight]).find(x => x.value) || defaultPosition

    const customContainerProps = {
        ...containerProps,
        style: {
            ...(containerProps.style || {}),
            ...(!!padding ?
                { padding: typeof padding === 'number' ? padding + 'px' : '5px' } :
                {}
            )
        }
    }

    return (
        <Popover
            open={isOpen}
            anchorEl={elementRef && elementRef.current}
            onClose={onClose}
            anchorOrigin={{
                vertical: anchorVertical.name,
                horizontal: anchorHorizontal.name,
            }}
            transformOrigin={{
                vertical: elementVertical.name,
                horizontal: elementHorizontal.name,
            }}
            {...otherProps}
        >
            <div {...customContainerProps}>
                {children}
            </div>
        </Popover>
    )
}

CustomPopover.defaultProps = {
    style: {},
    containerProps: {},
    padding: true,
}

const testVerticalProps = prefix => testPositionProps(prefix, ['Bottom', 'Center', 'Top'])

const testHorizontalProps = prefix => testPositionProps(prefix, ['Left', 'Middle', 'Right'])

const testPositionProps = (prefix, suffixArray) => props => {
    const propsName = suffixArray.map(x => prefix + x)
    const trueValueProps = propsName.filter(x => props[x])
    if (trueValueProps.length > 1) {
        return new Error(`Only one of the props ${trueValueProps.join(', ')} should be true`)
    }
}

CustomPopover.propTypes = {
    style: PropTypes.object,
    containerProps: PropTypes.object,
    padding: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    onClose: PropTypes.func,
    elementRef: PropTypes.object,
    children: PropTypes.node,
    anchorBottom: testVerticalProps('anchor'),
    anchorCenter: testVerticalProps('anchor'),
    anchorTop: testVerticalProps('anchor'),
    elementBottom: testVerticalProps('element'),
    elementCenter: testVerticalProps('element'),
    elementTop: testVerticalProps('element'),
    anchorLeft: testHorizontalProps('anchor'),
    anchorMiddle: testHorizontalProps('anchor'),
    anchorRight: testHorizontalProps('anchor'),
    elementLeft: testHorizontalProps('element'),
    elementMiddle: testHorizontalProps('element'),
    elementRight: testHorizontalProps('element'),
}

export default CustomPopover
