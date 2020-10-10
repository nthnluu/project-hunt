import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import {ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../styles/theme';
import '../styles/tailwind.css'
import fb from "../src/firebase-config";
import AuthContext from "../src/AuthContext";
import algoliasearch from 'algoliasearch/lite';
import {
    InstantSearch,
} from 'react-instantsearch-dom';

export default function MyApp(props) {
    const {Component, pageProps} = props;
    const [authState, setAuthState] = useState(0) //0: Loading, 1: Signed in, 2: Signed out
    const [sessionInfo, setSessionInfo] = useState(undefined)

    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
        fb.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                setAuthState(1)
                setSessionInfo(user)
            } else {
                // User is signed out.
                // ...
                setAuthState(2)
            }
        });
    }, []);

    const searchClient = algoliasearch('NX4F36XPF6', 'afc772ef14c8ff051f6b6925ecb3726a');

    if (authState === 0) return null
    return (
        <React.Fragment>
            <InstantSearch indexName="projects" searchClient={searchClient}>
                <AuthContext.Provider value={{authState, sessionInfo}}>
                    <Head>
                        <title>My page</title>
                        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
                    </Head>
                    <ThemeProvider theme={theme}>
                        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                        <CssBaseline/>
                        <Component {...pageProps} />
                    </ThemeProvider>
                </AuthContext.Provider>
            </InstantSearch>
        </React.Fragment>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};
