import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import Chip from '@material-ui/core/Chip'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { Field, getIn } from 'formik'
import useDependentField from '../../Formik/Hooks/useDependentField'

export const MaterialAutocomplete = React.memo(({
    form,
    field,
    label,
    textKey,
    options,
    disabled,
    onChange,
    manually,
    valueKey,
    multiple,
    chipProps,
    helperText,
    showMessage,
    textFieldProps,
    getOptionLabel,
    dependentField,
    dependentFieldValue,
    ...otherProps
}) => {
    const { name, value, ...otherFieldProps } = field
    const { setFieldTouched, setFieldValue, touched, errors, isSubmitting } = form

    const fieldError = getIn(errors, name)
    const showError = getIn(touched, name) && !!fieldError

    useDependentField(name, dependentField, dependentFieldValue)

    const handleChange = (e, newValue) => {
        // Use valueKey
        if (valueKey && newValue) {
            newValue = Array.isArray(newValue) ? newValue.map(x => x[valueKey]) : newValue[valueKey]
        }
        // Handler for onChange
        if (onChange && typeof onChange === 'function') {
            onChange(newValue)
        }
        // If it's manually, you should update the value in the onChange handler
        // Used for custom change
        if (!manually) {
            setFieldValue(name, newValue)
        }
    }

    const displayValue = useMemo(() => {
        if (value && valueKey) {
            if (Array.isArray(value)) { // Find options that matches valueKey inside the array
                return options.filter(x => value.map(x => x.toString()).includes(x[valueKey].toString()))
            } else { // Find options that matches valueKey
                return options.find(x => x[valueKey] === value) || ''
            }
        } else { // Sets default values
            return value ? value : (multiple ? [] : '')
        }
    }, [value, valueKey, options, multiple])

    const customOptionLabel = useMemo(() => textKey ? opt => (opt[textKey] || '') : getOptionLabel
        , [getOptionLabel, textKey])

    return (
        <Autocomplete
            {...otherProps}
            {...otherFieldProps}
            {...{ name, multiple, options }}
            value={displayValue}
            onChange={handleChange}
            getOptionLabel={customOptionLabel}
            disabled={disabled != undefined ? disabled : isSubmitting}
            onBlur={() => setFieldTouched(name, true)}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Chip
                        variant='outlined'
                        label={customOptionLabel(option)}
                        size='small'
                        {...chipProps}
                        {...getTagProps({ index })}
                    />
                ))
            }
            renderInput={inputProps => (
                <TextField
                    {...inputProps}
                    {...textFieldProps}
                    label={label}
                    size='small'
                    error={showError}
                    helperText={showMessage ? (showError ? fieldError : helperText) : undefined}
                />
            )}
        />
    )
})

MaterialAutocomplete.defaultProps = {
    manually: false,
    showMessage: false,
    dependentFieldValue: null,
}

MaterialAutocomplete.propTypes = {
    options: PropTypes.array,
    onChange: PropTypes.func,
    manually: PropTypes.bool,
    disabled: PropTypes.bool,
    showError: PropTypes.bool,
    textKey: PropTypes.string,
    valueKey: PropTypes.string,
    chipProps: PropTypes.object,
    helperText: PropTypes.string,
    getOptionLabel: PropTypes.func,
    textFieldProps: PropTypes.object,
    form: PropTypes.object.isRequired,
    field: PropTypes.object.isRequired,
    dependentFieldValue: PropTypes.any,
    dependentField: PropTypes.string,
}

const MUIFormikAutocomplete = React.memo(props => <Field {...props} component={MaterialAutocomplete} />)

MUIFormikAutocomplete.propTypes = {
    name: PropTypes.string.isRequired
}

export default MUIFormikAutocomplete
