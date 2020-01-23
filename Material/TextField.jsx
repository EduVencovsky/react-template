import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField';
import { FastField, getIn } from 'formik'

export const MaterialTextField = React.memo(({
    field,
    form,
    disabled,
    showMessage,
    helperText,
    ...props,
}) => {
    const { name, value, ...otherFieldProps } = field;
    const { touched, errors, isSubmitting } = form;

    const fieldError = getIn(errors, name)
    const showError = getIn(touched, name) && !!fieldError

    return (
        <TextField
            {...props}
            {...field}      
            {...otherFieldProps}
            size="small"
            name={name}
            value={value === null ? '' : value} // allow null values
            disabled={disabled != undefined ? disabled : isSubmitting}
            error={showError}
            helperText={showMessage ? (showError ? fieldError : helperText) : undefined}
        />
    )
})

MaterialTextField.defaultProps = {
    showMessage: false,
}

MaterialTextField.propTypes = {
    disabled: PropTypes.bool,
    showMessage: PropTypes.bool,
    helperText: PropTypes.string,
    form: PropTypes.object.isRequired,
    field: PropTypes.object.isRequired,
}

const MUIFormikTextField = React.memo(props => <FastField {...props} component={MaterialTextField} />)

MUIFormikTextField.propTypes = {
    name: PropTypes.string.isRequired
}

export default MUIFormikTextField
