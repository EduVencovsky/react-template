import React from "react";
import PropTypes from 'prop-types'
import t from 'ui-stack/lang'
import { Field, getIn } from "formik"
import { KeyboardDateTimePicker as MUIKeyboardDateTimePicker } from "@material-ui/pickers"

function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
}

const MaterialKeyboardDateTimePicker = ({
    field,
    form,
    showMessage,
    onChange,
    manually,
    disabled,
    helperText,
    ISOString,
    invalidDateMessage,
    anyError,
    ...otherProps
}) => {

    const { name, value } = field;
    const { setFieldTouched, setFieldError, setFieldValue, touched, errors, isSubmitting } = form;

    const fieldError = getIn(errors, name);
    const showError = getIn(touched, name) && !!fieldError;

    const handleChange = date => {
        if (ISOString && isValidDate(date) && typeof date.toISOString === 'function') {
            date = date.toISOString()
        }

        if (onChange && typeof onChange === 'function') {
            onChange(date)
        }
        if (!manually) {
            // if you are using custom validation schema you probably want to pass `true` as third argument
            setFieldValue(name, date, false)
        }
    }

    const format = "dd/MM/yyyy HH:mm"
    const invalidDate = invalidDateMessage || t('validation_string')

    return (
        <MUIKeyboardDateTimePicker
            name={name}
            value={value}
            format={format}
            error={showError}
            invalidDateMessage={t('validation_string')}
            disabled={disabled != undefined ? disabled : isSubmitting}
            helperText={showMessage ? (showError ? fieldError : helperText) : undefined}
            onChange={handleChange}
            onBlur={() => setFieldTouched(name, true)}
            onError={error => {
                if (error && error !== fieldError && (anyError || error === invalidDate)) {
                    setFieldError(field.name, error);
                }
            }}
            {...otherProps}
        />
    )
}

MaterialKeyboardDateTimePicker.defaultProps = {
    ISOString: true,
    anyError: false,
}

MaterialKeyboardDateTimePicker.propTypes = {
    disabled: PropTypes.bool,
    anyError: PropTypes.bool,
    ISOString: PropTypes.bool,
    showMessage: PropTypes.bool,
    helperText: PropTypes.string,
    form: PropTypes.object.isRequired,
    field: PropTypes.object.isRequired,
}

const KeyboardDateTimePicker = props => <Field {...props} component={MaterialKeyboardDateTimePicker} />

KeyboardDateTimePicker.propTypes = {
    name: PropTypes.string.isRequired
}

export default KeyboardDateTimePicker
