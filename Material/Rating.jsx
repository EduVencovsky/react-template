import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Rating from '@material-ui/lab/Rating'

export const MaterialRating = ({
    field,
    form,
    updateOnHover,
    ...otherProps
}) => {
    const { name, value, ...otherFieldProps } = field
    const { isSubmitting, setFieldValue } = form

    const [rating, setRating] = useState(value)
    const [hoverRating, setHoverRating] = useState(-1)

    useEffect(() => {
        if (updateOnHover)
            setFieldValue(name, hoverRating !== -1 ? hoverRating : rating)
        else
            setFieldValue(name, rating)
    }, [rating, hoverRating, name, setFieldValue, updateOnHover])

    return (
        <Rating
            name={name}
            value={rating}
            disabled={disabled != undefined ? disabled : isSubmitting}
            onChange={(e, value) => setRating(value)}
            onChangeActive={(e, newHover) => setHoverRating(newHover)}
            {...otherProps}
            {...otherFieldProps}
        />
    )
}

MaterialRating.defaultProps = {
    updateOnHover: false,
}

MaterialRating.propTypes = {
    updateOnHover: PropTypes.bool,
    disabled: PropTypes.bool,
    form: PropTypes.object.isRequired,
    field: PropTypes.object.isRequired,
}

const MUIFormikRating = props => <Field {...props} component={MaterialRating} />

MUIFormikRating.propTypes = {
    name: PropTypes.string.isRequired
}

export default MUIFormikRating