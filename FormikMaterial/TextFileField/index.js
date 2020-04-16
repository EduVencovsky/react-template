import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import { Field, getIn } from 'formik'
import Encoding from 'encoding-japanese'

export const MaterialTextFileField = ({
    field,
    form,
    disabled,
    showMessage,
    helperText,
    accept,
    encoding,
    clearable,
    ...otherProps,
}) => {
    const [key, setKey] = useState(() => Date.now())
    const { name, value } = field;
    const { touched, errors, isSubmitting, setFieldValue, setFieldTouched } = form;

    const fieldError = getIn(errors, name)
    const showError = getIn(touched, name) && !!fieldError

    // force input to rerender and clear it's value
    useEffect(() => {
        if (!value && clearable) setKey(Date.now())
    }, [value])

    const onChange = e => {
        const file = e.target.files[0]
        if (!file) return setFieldValue(name, null)

        setFieldValue(name, { // can't use spread operator because it's inherited properties
            name: file.name,
            size: file.size,
            type: file.type,
            lastModifiedDate: file.lastModifiedDate,
            lastModified: file.lastModified,
        })

        let reader
        const handleFileRead = e => {
            debugger
            var codes = new Uint8Array(e.target.result);
            const customEncoding = encoding ? encoding : Encoding.detect(codes);

            // Convert encoding to unicode
            var unicodeString = Encoding.convert(codes, {
                to: 'unicode',
                from: customEncoding,
                type: 'string'
            });
            setFieldValue(`${name}.content`, unicodeString)
            setFieldTouched(name, true)
        }
        debugger
        reader = new FileReader()
        reader.onloadend = handleFileRead
        reader.readAsArrayBuffer(file)

    }

    return (
        <TextField
            type="file"
            key={key}
            name={name}
            error={showError}
            variant="outlined"
            onChange={onChange}
            inputProps={{ accept }}
            disabled={disabled != undefined ? disabled : isSubmitting}
            helperText={showMessage ? (showError ? fieldError : helperText) : undefined}
            {...otherProps}
        />
    )
}

MaterialTextFileField.defaultProps = {
    showMessage: false,
    clearable: true,
}

MaterialTextFileField.propTypes = {
    disabled: PropTypes.bool,
    clearable: PropTypes.bool,
    showMessage: PropTypes.bool,
    accept: PropTypes.string,
    encoding: PropTypes.string,
    helperText: PropTypes.string,
    form: PropTypes.object.isRequired,
    field: PropTypes.object.isRequired,
}

const MUIFormikTextFileField = props => <Field {...props} component={MaterialTextFileField} />

MUIFormikTextFileField.propTypes = {
    name: PropTypes.string.isRequired
}

export default MUIFormikTextFileField
