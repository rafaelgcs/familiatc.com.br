import * as React from 'react';
import { NumericFormat } from 'react-number-format';



function NumberFormat(props) {
    const { onChange, ...other } = props;

    return (
        <NumericFormat
            {...other}
            thousandSeparator='.'
            valueIsNumericString
            decimalScale={2}
            decimalSeparator=','
            fixedDecimalScale
            prefix="R$"
        />
    );
}

export default NumberFormat