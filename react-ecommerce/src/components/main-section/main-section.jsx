import React from 'react';
import { useParams } from 'react-router-dom';
import mainimage from '../../assets/Airpodstest.jpg';
import './main-section.styles.scss';

const MainSection = ({ history }) => {
    return (
        <div className='main-section-container'>
            <div className='main-section-middle'>
                <div className='ms-m-image'>
                    <img src={mainimage} alt='mainimage' />
                </div>
                <div className='ms-m-description'>
                    <h2>Designed for you. Crafted for your needings</h2>
                    <p>
                        We make products that are in the current trend from day to night.
                        Everything is produced with accuracy.
                    </p>
                    <button className='button is-bulma' id ='shop-now' onClick={()=> history.push('/product/1')}>
                        niggr
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MainSection;