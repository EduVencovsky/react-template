import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

function ButtonList({
    onSelect,
    onClick,
    onClose,
    options,
    children,
    menuProps,
    menuItemProps,
    valueKey,
    textKey,
    ButtonComponent = Button,
    ItemComponent = MenuItem,
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
        <Fragment>
            <ButtonComponent aria-haspopup='true' onClick={handleClick} {...otherProps}>
                {children}
            </ButtonComponent>
            <Menu
                keepMounted
                open={!!anchorEl}
                anchorEl={anchorEl}
                onClose={handleClose}
                {...menuProps}
            >
                {options && options.map((option, i) =>
                    <ItemComponent
                        key={`${option[valueKey]}_${option[textKey]}_${i}`}
                        onClick={e => handleClickMenuItem(e, option[valueKey])}
                        {...menuItemProps}
                    >
                        {option[textKey]}
                    </ItemComponent>
                )}
            </Menu>
        </Fragment>
    )
}

ButtonList.defaultProps = {
    valueKey: 'value',
    textKey: 'text',
}

ButtonList.propTypes = {
    onClick: PropTypes.func,
    onClose: PropTypes.func,
    children: PropTypes.node,
    textKey: PropTypes.string,
    valueKey: PropTypes.string,
    menuProps: PropTypes.object,
    menuItemProps: PropTypes.object,
    // ItemComponent: PropTypes.elementType,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string,
            value: PropTypes.any
        })
    ).isRequired,
    onSelect: PropTypes.func.isRequired,
}

export default ButtonList
