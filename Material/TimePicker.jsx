import React from "react";
import PropTypes from 'prop-types'
import t from 'ui-stack/lang'
import { Field, getIn } from "formik"
import { KeyboardTimePicker as MUIKeyboardTimePicker } from "@material-ui/pickers"

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

const MaterialKeyboardTimePicker = React.memo(({
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
            setFieldValue(name, date, false)
        }
    }

    const invalidDate = invalidDateMessage || t('validation_string')

    return (
        <MUIKeyboardTimePicker
            autoOk
            size="small"
            ampm={false}
            name={name}
            value={value}
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
})

MaterialKeyboardTimePicker.defaultProps = {
    ISOString: true,
    anyError: false,
}

MaterialKeyboardTimePicker.propTypes = {
    disabled: PropTypes.bool,
    anyError: PropTypes.bool,
    ISOString: PropTypes.bool,
    showMessage: PropTypes.bool,
    helperText: PropTypes.string,
    form: PropTypes.object.isRequired,
    field: PropTypes.object.isRequired,
}

const KeyboardTimePicker = React.memo(props => <Field {...props} component={MaterialKeyboardTimePicker} />)

KeyboardTimePicker.propTypes = {
    name: PropTypes.string.isRequired
}

export default KeyboardTimePicker
