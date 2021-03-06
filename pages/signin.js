import React, {useContext, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Copyright from "../src/Copyright";
import fb from '../src/firebase-config'
import {useRouter} from "next/router";
import AuthContext from "../src/AuthContext";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignInSide() {
    const classes = useStyles();
    const router = useRouter()
    const {authState} = useContext(AuthContext)
    const [isLoading, toggleLoading] = useState(false)
    const [errorMessage, setError] = useState()

    function signIn(event) {
        event.preventDefault()

        const email = event.target.email.value
        const password = event.target.password.value

        toggleLoading(true)
        fb.auth().signInWithEmailAndPassword(email, password)
            .then(() => router.push('/'))
            .catch(function (error) {
                setError(true)
                toggleLoading(false)
            });
    }

    // Prevents authenticated users from accessing this page
    if (authState === 1) {
        router.push('/')
        return null
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline/>
            <Grid item xs={false} sm={4} md={7} className={classes.image}/>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <LinearProgress hidden={!isLoading}/>
                <div className="my-24 md:my-64">
                    <Container maxWidth="sm">
                        <div className={classes.paper}>
                            <Typography component="h1" variant="h5">
                                Welcome back to ProjectHunt
                            </Typography>
                            <form className={classes.form} onSubmit={signIn}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    error={errorMessage}
                                    autoFocus
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    error={errorMessage}
                                    autoComplete="current-password"
                                />
                                {errorMessage ? <Typography color="error" variant="body1">Invalid email or password.</Typography> : null}

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    disabled={isLoading}
                                    className={classes.submit}
                                >
                                    Sign In
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="/signup" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                                <Box mt={5}>
                                    <Copyright/>
                                </Box>
                            </form>
                        </div>
                    </Container>
                </div>
            </Grid>
        </Grid>
    );
}