import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import Typography from '@material-ui/core/Typography'

function ModalFooter({
    left,
    size,
    reverse,
    onCancel,
    onSubmit,
    children,
    disabled,
    cancelLabel,
    submitLabel,
    color,
    isCancelDisabled,
    isSubmitDisabled,
    submitColor,
    cancelColor,
    variant,
    style,
    submitType,
    ...otherProps
}) {

    const Buttons = [
        <Button
            key="cancelButton"
            size={size}
            color={color ? color : cancelColor}
            variant={variant}
            disabled={disabled !== undefined ? disabled : isCancelDisabled}
            onClick={onCancel}
        >
            <Typography>{cancelLabel}</Typography>
        </Button>,
        <Button
            key="submitButton"
            size={size}
            variant={variant}
            color={color ? color : submitColor}
            disabled={disabled !== undefined ? disabled : isSubmitDisabled}
            onClick={onSubmit}
            type={submitType ? "submit" : "button"}
        >
            <Typography>{submitLabel}</Typography>
        </Button>,
        <Fragment key="children">{children}</Fragment>,
    ]

    return (
        <DialogActions
            {...otherProps}
            style={{ ...style, justifyContent: left ? 'flex-start' : style.justifyContent }}
        >
            {reverse ? Buttons.reverse() : Buttons}
        </DialogActions>
    )
}

ModalFooter.defaultProps = {
    style: {},
    size: 'medium',
    color: 'primary',
    cancelLabel: 'cancel',
    submitLabel: 'submit',
}

ModalFooter.propTypes = {
    style: PropTypes.object,
    children: PropTypes.node,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
    left: PropTypes.bool,
    reverse: PropTypes.bool,
    disabled: PropTypes.bool,
    isCancelDisabled: PropTypes.bool,
    isSubmitDisabled: PropTypes.bool,
    cancelLabel: PropTypes.string,
    submitLabel: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
    submitColor: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
    cancelColor: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
}

export default ModalFooter