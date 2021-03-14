import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme();

theme.typography.h6 = {
    fontSize: '1rem',
    [theme.breakpoints.up('md')]: {
        fontSize: '1.2rem',
    },
};
theme.typography.h5 = {
    fontSize: '1.1rem',
    [theme.breakpoints.up('md')]: {
        fontSize: '1.3rem'
    }
}
theme.typography.h3 = {
    fontSize: '2rem',
    [theme.breakpoints.up('md')]: {
        fontSize: '3rem'
    }
}

export default theme
