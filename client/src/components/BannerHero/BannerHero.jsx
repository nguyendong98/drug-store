import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import LazyLoad from 'react-lazyload';

import './BannerHero.scss';
import slider1 from 'assets/images/slider1.jpg';
import slider2 from 'assets/images/slider2.jpg';

export default function BannerHero() {
    return (
        <Carousel infiniteLoop={true} useKeyboardArrows={true} autoPlay={true}  showThumbs={false}>
            <div>
                <LazyLoad height={200}>
                    <img alt="img4" src={slider1} />
                </LazyLoad>
            </div>
            <div>
                <LazyLoad height={200}>
                    <img alt="img5" src={slider2} />
                </LazyLoad>
            </div>
        </Carousel>
    )
}
