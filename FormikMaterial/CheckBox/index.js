import React from 'react'
import PropTypes from 'prop-types'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { Field } from 'formik'

export const MaterialCheckBox = ({ field, form, disabled, ...props }) => {
    const { isSubmitting } = form;

    return (
        <FormControlLabel
            {...field}
            {...props}
            checked={field.value}
            disabled={disabled != undefined ? disabled : isSubmitting}
            control={<Checkbox />}
        />
    )
}

MaterialCheckBox.defaultProps = {
    label: '',
}

MaterialCheckBox.propTypes = {
    disabled: PropTypes.bool,
    form: PropTypes.object.isRequired,
    field: PropTypes.object.isRequired,
}

const MUIFormikCheckBox = props => <Field {...props} component={MaterialCheckBox} />

MUIFormikCheckBox.propTypes = {
    name: PropTypes.string.isRequired
}

export default MUIFormikCheckBox
