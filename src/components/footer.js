import React from 'react'
import Type from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default () => {
    return (
        <>
            <Box p={3}></Box>
            <div className="footer">
            <Type align='left' className='footerText'><img alt="imanshied logo" src="/images/imanshield_white.png" style={{width: `5rem`}} /><div id="footer-text">...a <a href="https://hikmahsessions.com">Hikmah Sessions</a> project.</div></Type>
            </div>
        </>
    );   
}