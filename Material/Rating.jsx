import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Rating from '@material-ui/lab/Rating'
import { useFormikContext } from 'formik'

function RatingFormik({ name, updateOnHover, ...otherProps }) {
    const { setFieldValue, values } = useFormikContext()
    const [rating, setRating] = useState(values[name])
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
            onChange={(e, value) => setRating(value)}
            onChangeActive={(e, newHover) => setHoverRating(newHover)}
            {...otherProps}
        />
    )
}

RatingFormik.defaultProps = {
    updateOnHover: false,
}

RatingFormik.propTypes = {
    name: PropTypes.string.isRequired,
    updateOnHover: PropTypes.bool,
}

export default RatingFormik