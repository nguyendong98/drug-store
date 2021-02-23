import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './BannerHero.scss'
const BannerHero = () => (
    <Carousel infiniteLoop={true} useKeyboardArrows={true} autoPlay={true}  >
        <div>
            <img alt="img1" src="https://d314ueg0lpx3nd.cloudfront.net/banner/3bb1e24adbe-Amazon.jpg?dim=250x250&dpr=2&q=80" />
        </div>
        <div>
            <img alt="img2" src="https://d314ueg0lpx3nd.cloudfront.net/banner/1658304d02e-Paytm.jpg?dim=250x250&dpr=1&q=80" />
        </div>
        <div>
            <img alt="img3" src="https://d314ueg0lpx3nd.cloudfront.net/banner/3acdabd7ba1-D--Web-Banners---generic.jpg?dim=250x250&dpr=2&q=80" />
        </div>
        <div>
            <img alt="img4" src="https://d314ueg0lpx3nd.cloudfront.net/banner/288a9544f6f-dweb.jpg?dim=250x250&dpr=2&q=80"/>
        </div>
        <div>
            <img alt="img5" src="https://d314ueg0lpx3nd.cloudfront.net/banner/ae6e1b4793d-safe18dweb.jpg?dim=250x250&dpr=1&q=80"/>
        </div>
        <div>
            <img alt="img6" src="https://d314ueg0lpx3nd.cloudfront.net/banner/584a6e0970f-vitamincdweb.jpg"/>
        </div>
    </Carousel>
);
export default BannerHero
