import React from 'react'
import PropTypes from 'prop-types'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import { Field, getIn } from 'formik'

export const MaterialAutocomplete = ({
    textFieldProps,
    field,
    form,
    disabled,
    helperText,
    showMessage,
    onChange,
    manually,
    valueKey,
    options,
    ...props
}) => {
    const { name, value, ...otherFieldProps } = field
    const { setFieldTouched, setFieldValue, touched, errors, isSubmitting } = form

    const fieldError = getIn(errors, name);
    const showError = getIn(touched, name) && !!fieldError;

    const handleChange = (e, newValue) => {
        if (valueKey && newValue && newValue[valueKey]) {
            newValue = newValue[valueKey]
        }
        if (onChange && typeof onChange === 'function') {
            onChange(newValue)
        }
        if (!manually) {
            setFieldValue(name, newValue)
        }
    }

    return (
        <Autocomplete
            {...props}
            {...otherFieldProps}
            name={name}
            value={(valueKey ? options.find(x => x[valueKey] === value) : value) || ''}
            options={options}
            disabled={disabled != undefined ? disabled : isSubmitting}
            onChange={handleChange}
            onBlur={() => setFieldTouched(name, true)}
            renderInput={props => (
                <TextField
                    {...props}
                    {...textFieldProps}

                    error={showError}
                    helperText={showMessage ? (showError ? fieldError : helperText) : undefined}
                />
            )}
        />
    );
}

MaterialAutocomplete.defaultProps = {
    showMessage: false,
    manually: false,
    getOptionLabel: x => x,
}

MaterialAutocomplete.propTypes = {
    options: PropTypes.array,
    onChange: PropTypes.func,
    manually: PropTypes.bool,
    disabled: PropTypes.bool,
    showError: PropTypes.bool,
    valueKey: PropTypes.string,
    helperText: PropTypes.string,
    textFieldProps: PropTypes.object,
    form: PropTypes.object.isRequired,
    field: PropTypes.object.isRequired,
}

const MUIFormikAutocomplete = props => <Field {...props} component={MaterialAutocomplete} />

MUIFormikAutocomplete.propTypes = {
    name: PropTypes.string.isRequired
}

export default MUIFormikAutocomplete