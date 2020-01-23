import React from 'react'
import { Field, getIn } from 'formik'
import FormHelperText from '@material-ui/core/FormHelperText'

const ErrorMessage = ({ name, props }) => (
    <Field
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
    </Field>
)

export default ErrorMessage
