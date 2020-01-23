import React from 'react'
import { FastField, getIn } from 'formik'
import FormHelperText from '@material-ui/core/FormHelperText'

const ErrorMessage = React.memo(({ name, props }) => (
    <FastField
        name={name}
    >
        {({ form }) => {
            const error = getIn(form.errors, name);
            const touch = getIn(form.touched, name);
            return touch && error ?
                <FormHelperText
                    {...props}
                    error
                >
                    {error}
                </FormHelperText>
                :
                null
        }}
    </FastField>
))

export default ErrorMessage
