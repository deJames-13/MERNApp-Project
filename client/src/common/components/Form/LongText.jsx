import PropTypes from 'prop-types';
import React from 'react';
import { Textarea } from 'react-daisyui';

function LongText({ label, refer, meta, outerStyle, ...inputProps }) {
    return (
        <div className={outerStyle}>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">{label}</span>
                </label>
                <Textarea placeholder="Type your message here."
                    color={meta?.touched && meta?.error ? 'error' : 'primary'}
                    ref={refer}
                    {...inputProps} />

            </div>
        </div>
    )
}



export default LongText
