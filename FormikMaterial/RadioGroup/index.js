import React from 'react'
import PropTypes from 'prop-types'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const MaterialRadioGroup = ({ formik, name, options, children, label, ...otherProps }) => (
    <RadioGroup
        aria-label={label}
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange(name)}
        {...otherProps}
    >
        {children ? children : options.map(({ value, ...otherProps }) => (
            <FormControlLabel
                key={value}
                value={value}
                control={<Radio color="primary" />}
                {...otherProps}
            />
        ))}
    </RadioGroup>
)

MaterialRadioGroup.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    formik: PropTypes.object.isRequired,
    children: (props, propName, componentName) => {
        if (!props.options && !props.children) {
            return new Error(`The 'options' or 'data' prop should be specified in '${componentName}'.`);
        }
    },
    options: (props, propName, componentName) => {
        if (!props.options && !props.children) {
            return new Error(`The 'options' or 'data' prop should be specified in '${componentName}'.`);
        }
    },
}

const MUIFormikRadioGroup = props => <Field {...props} component={MaterialRadioGroup} />

MUIFormikRadioGroup.propTypes = {
    name: PropTypes.string.isRequired
}

export default MUIFormikRadioGroup
