import React, {useContext, useEffect, useState} from 'react';
import PageLayout from "../components/PageLayout";
import AuthContext from "../src/AuthContext";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import {CardActionArea, Typography} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import fb from '../src/firebase-config'
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import {useRouter} from "next/router";
import NewProjectModal from '../components/modals/NewProjectModal'
import LikeButton from "../components/LikeButton";
import BigSearchField from "../components/BigSearchField";
import ImInButton from "../components/ImInButton";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import MyImage from "../components/MainBanner"


export default function Index() {
    const {authState, sessionInfo} = useContext(AuthContext)
    const [pageData, setPageData] = useState([])
    const [newProjectModal, setNewProjectModal] = useState(false)

    const router = useRouter()

    useEffect(() => {
        fb.firestore().collection("projects")
            .onSnapshot(function (snapshot) {
                setPageData(snapshot.docs)
            });
    }, [])

    return (
        <>
            <NewProjectModal isOpen={newProjectModal} onClose={() => setNewProjectModal(false)}/>
            {authState === 1 ?
                <Fab onClick={() => setNewProjectModal(true)} color="primary" aria-label="add" variant="extended"
                     style={{
                         margin: 0,
                         top: 'auto',
                         right: 20,
                         bottom: 20,
                         left: 'auto',
                         position: 'fixed',
                         zIndex: 1000
                     }}>
                    <AddIcon className="mr-1"/> Create Project
                </Fab> : null}

            <PageLayout>
                <Container maxWidth="md">
                    <Box mt={6} mb={8} >
                        <MyImage/>
                          
                        <div className="my-12">
                            <BigSearchField/>
                        </div>

                    </Box>

                    <ul className="space-y-4 mb-8 mt-24">
                        {pageData.map(item => {
                            let data = item.data()
                            return <li key={item.id}>
                                <Paper variant="outlined" key={item.id} className="overflow-none">
                                    <CardActionArea onClick={() => router.push(`/${item.id}`)}>
                                        <Box p={4}>
                                            <Typography variant="h5" component="h2"
                                                        gutterBottom>{data.title}</Typography>
                                            <Typography variant="body1">
                                                {data.description}</Typography>
                                        </Box>
                                    </CardActionArea>
                                    <Box mx={3} mb={2}>

                                        <span className="mr-2">
                                             <LikeButton projectId={item.id}/>
                                        </span>

                                        {authState === 1 && ((data.created_by === sessionInfo.uid) ? null : <ImInButton projectId={item.id}/>)}

                                    </Box>
                                </Paper>
                            </li>
                        })}
                    </ul>
                </Container>
            </PageLayout>
        </>

    );
}
