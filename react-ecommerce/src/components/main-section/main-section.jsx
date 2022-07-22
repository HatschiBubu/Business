import React from 'react';
import mainimage from '../../assets/Airpodscleaner.jpg';
import withRouter from '../withRouter';
import { useNavigate } from 'react-router-dom';
import './main-section.styles.scss';

const MainSection = () => {
    const navigate = useNavigate();
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
                    <button className='button is-black' id ='shop-now' onClick={()=> navigate('/product/1')}>
                        Buy now
                    </button>
                </div>
            </div>
        </div>
    )
}

export default withRouter(MainSection);