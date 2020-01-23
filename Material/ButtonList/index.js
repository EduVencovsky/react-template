import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Menu, MenuItem } from '@material-ui/core'

function ButtonList({ onSelect,
    onClick,
    onClose,
    options,
    children,
    menuProps,
    menuItemProps,
    ...otherProps
}) {
    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = event => {
        setAnchorEl(event.currentTarget)
        if (onClick && typeof onClick === 'function') {
            onClick()
        }
    }

    const handleClose = () => {
        setAnchorEl(null)
        if (onClose && typeof onClose === 'function') {
            onClose()
        }
    }

    const handleClickMenuItem = (e, value) => {
        handleClose()
        if (onSelect && typeof onSelect === 'function') {
            onSelect(e, value)
        }
    }

    return (
        <>
            <Button aria-haspopup="true" onClick={handleClick} {...otherProps}>
                {children}
            </Button>
            <Menu
                keepMounted
                open={!!anchorEl}
                anchorEl={anchorEl}
                onClose={handleClose}
                {...menuProps}
            >
                {options.map(option =>
                    <MenuItem key={`${option.value}`} onClick={e => handleClickMenuItem(e, option.value)}>{option.text}</MenuItem>
                )}
            </Menu>
        </>
    )
}

ButtonList.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    onClose: PropTypes.func,
    onSelect: PropTypes.func.isRequired,
    menuProps: PropTypes.object,
    menuItemProps: PropTypes.object,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default ButtonList
