import React, { Component } from 'react';

class Construccion extends Component {
    render() {
        return (
            <div className='infoAbout oh-flex oh-center center4k'>
                <div className='formAbout oh-flex oh-center'>
                    <h1 className='oh-flex oh-center width100 txtBlueS'>Modulo en construcción</h1>
                </div>
                <div className='divLogo'>
                    <img
                        src={require('./Images/_log.png')}
                        width="300"
                        height="300"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                </div>
            </div>
        );
    }
}

export default Construccion;