import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import MUISwitch from '@material-ui/core/Switch'
import {
    amber,
    blue,
    blueGrey,
    brown,
    common,
    cyan,
    deepOrange,
    deepPurple,
    green,
    grey,
    indigo,
    lightBlue,
    lightGreen,
    lime,
    orange,
    pink,
    purple,
    red,
    teal,
    yellow,
} from '@material-ui/core/colors'
import { withStyles } from '@material-ui/core/styles'

const allColors = {
    amber,
    blue,
    blueGrey,
    brown,
    common,
    cyan,
    deepOrange,
    deepPurple,
    green,
    grey,
    indigo,
    lightBlue,
    lightGreen,
    lime,
    orange,
    pink,
    purple,
    red,
    teal,
    yellow,
}

const createColorSwitch = color => withStyles({
    switchBase: {
        '&$checked': {
            color: color[500],
        },
        '&$checked + $track': {
            backgroundColor: color[500],
        },
    },
    checked: {},
    track: {},
})(MUISwitch)

const Switch = React.forwardRef(({ color, withWrapper, ...otherProps }, ref) => {

    // Store Component in State because if calculated
    // On every render, will remove the animation
    const [CustomSwitch, setCustomSwitch] = useState(MUISwitch)

    // Update Component only when color changes
    useEffect(() => {
        if (allColors[color])
            setCustomSwitch(createColorSwitch(allColors[color]))
        else
            setCustomSwitch(MUISwitch)
    }, [color, setCustomSwitch])

    if (withWrapper)
        return (
            <div
                style={{ display: 'inline-block' }}
                ref={ref}
            >
                <CustomSwitch
                    color={!!allColors[color] ? undefined : color} // if it's a different color, don't added it
                    {...otherProps}
                />
            </div>
        )
    return (
        <CustomSwitch
            ref={ref}
            color={!!allColors[color] ? undefined : color} // if it's a different color, don't added it
            {...otherProps}
        />
    )
})

Switch.defaultProps = {
    withWrapper: true,
}

Switch.propTypes = {
    color: PropTypes.oneOf([
        'primary',
        'secondary',
        'default',
        'amber',
        'blue',
        'blueGrey',
        'brown',
        'common',
        'cyan',
        'deepOrange',
        'deepPurple',
        'green',
        'grey',
        'indigo',
        'lightBlue',
        'lightGreen',
        'lime',
        'orange',
        'pink',
        'purple',
        'red',
        'teal',
        'yellow',
    ]),
    withWrapper: PropTypes.bool,
}

export default Switch
