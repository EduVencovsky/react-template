import { useEffect } from 'react'
import { getIn, useFormikContext } from 'formik'

/**
 * Change field value when other field value changes
 * @param {string} fieldName Field Name to change value
 * @param {string} dependentFieldName Field Name to watch changes
 * @param {any} value Value to set on Field when Dependent Field changes
 */
function useDependentField(fieldName, dependentFieldName, value = null) {
    const { values, setFieldValue } = useFormikContext()

    const dependentFieldValue = getIn(values, dependentFieldName)

    useEffect(() => {
        if (dependentFieldName) {
            setFieldValue(fieldName, value)
        }
    }, [dependentFieldValue])

}

export default useDependentField
