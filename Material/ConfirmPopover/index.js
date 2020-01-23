import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import styled from 'styled-components'

export const Container = styled.div`

`

export const ActionButtons = styled.div`

`

function ConfirmPopover({ children, onClose, onCancel, onConfirm, closeOnCancel, message }) {
    const [open, setOpen] = useState(false)
    const elementRef = useRef(null)

    const handleClose = e => {
        setOpen(false)
        if (onClose && typeof onClose === 'function')
            onClose(e)
    }

    const handleCancel = e => {
        if (closeOnCancel)
            setOpen(false)
        if (onCancel && typeof onCancel === 'function')
            onCancel(e)
    }

    return (
        <>
            <div ref={elementRef} onClick={() => setOpen(prev => !prev)}>
                {children}
            </div>
            <Popover
                open={open}
                anchorEl={elementRef.current}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <div style={{ margin: '10px' }}>
                    <Typography>{message}</Typography>
                    <div style={{
                        justifyContent: 'space-between',
                        display: 'flex'
                    }}>
                        <Button
                            color="secondary"
                            variant="outlined"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            color="primary"
                            variant="outlined"
                            onClick={onConfirm}
                        >
                            Ok
                        </Button>
                    </div>
                </div>
            </Popover>
        </>
    )
}

ConfirmPopover.defaultProps = {
    closeOnCancel: true
}

ConfirmPopover.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func,
    message: PropTypes.string,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
    closeOnCancel: PropTypes.bool,
}

export default ConfirmPopover