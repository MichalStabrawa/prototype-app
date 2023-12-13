import {useSelector} from 'react-redux'

import classes from './HeaderComponent.module.scss';
import ResponsiveCarousel from '../Carousel/ResponsiveCarousel/ResponsiveCarousel';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const HeaderComponent = props => {
    const data = useSelector(state=>state.currency.data)
    return (
        <header className={classes.header}>
            <h1>Header lorem ipsum</h1>
            <p>Lorem ipsum description</p>
            <ResponsiveCarousel data={data[1]}/>
        </header>)
}

export default HeaderComponent