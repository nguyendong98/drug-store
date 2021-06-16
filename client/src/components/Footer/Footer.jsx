import React from 'react';
import Grid from "@material-ui/core/Grid";
import './Footer.scss';
import Typography from "@material-ui/core/Typography";
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from '@material-ui/icons/Twitter';
export default function Footer() {
    return (
        <Grid container className="footer px-3 py-8">
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Typography variant="h6" gutterBottom>Company</Typography>
                <Typography variant="subtitle1" gutterBottom><a href="google.com">Careers</a></Typography>
                <Typography variant="subtitle1" gutterBottom><a href="google.com">Blog</a></Typography>
                <Typography variant="subtitle1" gutterBottom><a href="google.com">Partner with
                    PharmEasy</a></Typography>
                <Typography variant="h6" gutterBottom>Our Services</Typography>
                <Typography variant="subtitle1" gutterBottom><a href="google.com">Order Medicine</a></Typography>
                <Typography variant="subtitle1" gutterBottom><a href="google.com">Healthcare Products</a></Typography>
                <Typography variant="subtitle1" gutterBottom><a href="google.com">Diagnostic Tests</a></Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Typography variant="h6" gutterBottom>Featured Categories</Typography>
                <Typography variant="subtitle1" gutterBottom><a href="google.com">Personal Care</a></Typography>
                <Typography variant="subtitle1" gutterBottom><a href="google.com">Ayurvedic Store</a></Typography>
                <Typography variant="subtitle1" gutterBottom><a href="google.com">Sexual Wellness</a></Typography>
                <Typography variant="subtitle1" gutterBottom><a href="google.com">Mother & Baby care</a></Typography>
                <Typography variant="subtitle1" gutterBottom><a href="google.com">Diabetic care</a></Typography>
                <Typography variant="subtitle1" gutterBottom><a href="google.com">Nutrition, Vitamins & Suppliments</a></Typography>
                <Typography variant="subtitle1" gutterBottom><a href="google.com">Skin Care</a></Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Typography variant="h6" gutterBottom>Need Help</Typography>
                <Typography variant="subtitle1" gutterBottom><a href="google.com">Browse All Medicines</a></Typography>
                <Typography variant="subtitle1" gutterBottom><a href="google.com">Browse All Molecules</a></Typography>
                <Typography variant="subtitle1" gutterBottom><a href="google.com">FAQs</a></Typography>
                <Typography variant="h6" gutterBottom>Policy Info</Typography>
                <Typography variant="subtitle1" gutterBottom><a href="google.com">Editorial Policy</a></Typography>
                <Typography variant="subtitle1" gutterBottom><a href="google.com">Privacy Policy</a></Typography>
                <Typography variant="subtitle1" gutterBottom><a href="google.com">Terms and condition</a></Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Typography variant="h6" gutterBottom>FOLLOW US</Typography>
                <Grid container className="mt-2 mt-md-5">
                    <Grid item xs={3}><a href="google.com"><LinkedInIcon className="social-icon-footer"/></a></Grid>
                    <Grid item xs={3}><a href="google.com"><FacebookIcon className="social-icon-footer"/></a></Grid>
                    <Grid item xs={3}><a href="google.com"><YouTubeIcon className="social-icon-footer"/></a></Grid>
                    <Grid item xs={3}><a href="google.com"><TwitterIcon className="social-icon-footer"/></a></Grid>
                </Grid>
            </Grid>
            <Grid container direction="column" className="mt-3">
                <Typography variant="h6" gutterBottom>Our Payment Partners</Typography>
                <Grid container direction="row" justify="space-between" alignItems="center">
                    <Grid item xs={12} md={7}>
                        <img src="https://d2y2l77dht9e8d.cloudfront.net/web-assets/dist/af0c6812.svg" alt="google pay"
                             className="our-payment"/>
                        <img src="https://d2y2l77dht9e8d.cloudfront.net/web-assets/dist/0e010044.svg" alt="pay tm"
                             className="our-payment"/>
                        <img src="https://d2y2l77dht9e8d.cloudfront.net/web-assets/dist/1066bb1f.svg" alt="Amazon Pay"
                             className="our-payment"/>
                        <img src="https://d2y2l77dht9e8d.cloudfront.net/web-assets/dist/3a1a533d.svg" alt="google pay"
                             className="our-payment"/>
                        <img src="https://d2y2l77dht9e8d.cloudfront.net/web-assets/dist/fbea1701.svg" alt="Mobikwik"
                             className="our-payment"/>
                        <img src="https://d2y2l77dht9e8d.cloudfront.net/web-assets/dist/4733a49d.svg" alt="Airtel Money"
                             className="our-payment"/>
                        <img src="https://d2y2l77dht9e8d.cloudfront.net/web-assets/dist/b278e536.svg" alt="Ola Money"
                             className="our-payment"/>
                        <img src="https://d2y2l77dht9e8d.cloudfront.net/web-assets/dist/0aca2077.svg" alt="Maestro"
                             className="our-payment"/>
                        <img src="https://d2y2l77dht9e8d.cloudfront.net/web-assets/dist/44a51ca5.svg" alt="Mastercard"
                             className="our-payment"/>
                        <img src="https://d2y2l77dht9e8d.cloudfront.net/web-assets/dist/d058b00d.svg" alt="Visa"
                             className="our-payment"/>
                        <img src="https://d2y2l77dht9e8d.cloudfront.net/web-assets/dist/e9445364.svg" alt="Rupay"
                             className="our-payment"/>
                        <img src="https://d2y2l77dht9e8d.cloudfront.net/web-assets/dist/6e09c713.svg" alt="Diners"
                             className="our-payment"/>
                    </Grid>
                    <Grid item className="mt-sm-3 mt-md-1"><Typography variant="subtitle1">© 2020 DV Pharmacy. All
                        Rights Reserved</Typography></Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
