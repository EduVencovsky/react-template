import React from 'react'
import PropTypes from 'prop-types'
import Radio from '@material-ui/core/Radio'
import FormLabel from '@material-ui/core/FormLabel'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { Field, getIn } from 'formik'

export const MaterialRadioGroup = ({
    form,
    field,
    label,
    options,
    disabled,
    valueKey,
    labelKey,
    onChange,
    radioProps,
    helperText,
    showMessage,
    horizontal,
    ...otherProps,
}) => {
    const { name, value } = field;
    const { touched, errors, isSubmitting, setFieldValue } = form;

    const fieldError = getIn(errors, name)
    const showError = getIn(touched, name) && !!fieldError

    const handleOnChange = e => {
        setFieldValue(name, e.target.value)
        if (onChange && typeof onChange === 'function') {
            onChange(e)
        }
    }

    return (
        <FormControl
            component="fieldset"
            error={showError}
            disabled={disabled != undefined ? disabled : isSubmitting}
            {...otherProps}
        >
            {label && <FormLabel>{label}</FormLabel>}
            <RadioGroup
                name={name}
                value={value}
                row={horizontal}
                onChange={handleOnChange}
            >
                {options.map(item => (
                    <FormControlLabel
                        key={`${item[labelKey]}_${item[valueKey]}`}
                        value={item[valueKey]}
                        label={item[labelKey]}
                        control={<Radio {...radioProps} />}
                    />
                ))}
            </RadioGroup>
            {showMessage && (
                <FormHelperText>
                    {showError ? fieldError : helperText}
                </FormHelperText>
            )}
        </FormControl>
    )
}

MaterialRadioGroup.defaultProps = {
    valueKey: 'value',
    labelKey: 'label',
    showMessage: false,
    horizontal: false,
    radioProps: {},
}

MaterialRadioGroup.propTypes = {
    disabled: PropTypes.bool,
    showMessage: PropTypes.bool,
    valueKey: PropTypes.string,
    labelKey: PropTypes.string,
    helperText: PropTypes.string,
    radioProps: PropTypes.object,
    form: PropTypes.object.isRequired,
    field: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired,
}

const MUIFormikRadioGroup = props => <Field {...props} component={MaterialRadioGroup} />

MUIFormikRadioGroup.propTypes = {
    name: PropTypes.string.isRequired
}

export default MUIFormikRadioGroup
