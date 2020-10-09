import {createMuiTheme} from '@material-ui/core/styles';
import {red} from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
    shape: {
        borderRadius: 7,
    },
    typography: {
        h5: {
            fontFamily: [
                'Google Sans',
                'Inter var',
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
        },
        fontFamily: [
            'Inter var',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    props: {
        MuiButton: {
            disableElevation: true
        }
    },
    overrides: {
        MuiButton: {
            // Name of the styleSheet
            root: {
                // Name of the rule
                fontWeight: 600
            }
        },
        MuiFab: {
            root: {
                // Name of the rule
                background: 'linear-gradient(to right, #ff416c, #ff4b2b)',
                fontWeight: 600
            }
        }
    },
    palette: {
        type: 'light',
        primary: {
            main: '#4285F4',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        }
    },
});

export default theme;
