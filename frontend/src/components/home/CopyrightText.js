import React from 'react';

const CopyrightText = () => {

    const fullYear = new Date().getFullYear();

    return(
        <span>
            © {fullYear} Data-BETA
        </span>
    )
}

export default CopyrightText;
