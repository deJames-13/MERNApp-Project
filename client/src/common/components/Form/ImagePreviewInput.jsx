import PropTypes from 'prop-types';
import React from 'react';

function ImagePreviewInput({ label, alt, refer, meta, formik, ...inputProps }) {
    return (
        <label className="w-full max-w-xs form-control">
            {label && <span>{label}</span>}

            {alt && (
                <div className="label">
                    <span className="label-text-alt">{alt}</span>
                </div>
            )}
        </label>
    )
}


ImageInput.propTypes = {
    label: PropTypes.string,
    alt: PropTypes.string,
    refer: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    meta: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    formik: PropTypes.object,
};

export default ImagePreviewInput
