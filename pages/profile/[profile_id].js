import {nanoid} from "nanoid";
import fb from "../../src/firebase-config";
import React, {useContext, useState, useEffect} from "react";
import AuthContext from "../../src/AuthContext";
import {useRouter} from "next/router";
import PageLayout from "../../components/PageLayout";
import ArrayInputPanel from "../../components/modals/NewProjectModal/ArrayInputPanel";
import {Button, Chip, Container, Paper, Box} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles';

import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import WebIcon from '@material-ui/icons/Web';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import ProtectedRoute from "../../components/ProtectedRoute";

export default function () {

    const useStyles = makeStyles((theme) => ({
        root: {
            height: '100vh',
        },
    }));

    const router = useRouter();
    const {profile_id} = router.query;

    // Form Data
    const [pageData, setPageData] = useState()
    const {sessionInfo} = useContext(AuthContext)

    // user: sessionInfo.uid,
    // githubUrl: githubLink, 
    // linkedinUrl: linkedinLink, 
    // twitterUrl: twitterLink, 
    // bio: bioContents, 
    // skills: skillArray

    useEffect(() => {
        fb.firestore().collection("profiles").doc(profile_id)
            .onSnapshot(function (doc) {
                setPageData(doc.data())
            });
    });

    function followUser(){
        var newFollowings = (pageData.followingUsers) ? pageData.followingUsers.push(profile_id) : [profile_id]; 
        fb.firestore().collection("profiles").doc(sessionInfo.uid).set({
            followingUsers: newFollowings
        }, { merge: true });
        alert(`Followed user ${pageData.name}!`);
    }

    return <ProtectedRoute><PageLayout>
        <Container maxWidth="md" className="pt-4">
            <h1 className="mb-6 text-3xl font-display ">Basic Information</h1>
            <div className="space-y-4">
                <Paper variant="outlined">
                    {pageData &&
                    <Box p={4}>

                        <div className="grid grid-cols-2">
                            <h1 className="mb-6 text-3xl font-display ">{pageData.name}</h1>

                            {(profile_id != sessionInfo.uid) && 
                                    ((pageData.followingUsers && pageData.followingUsers.includes(profile_id))
                                        ? <Button onClick={followUser} variant="contained" color="primary">Follow</Button> 
                                        : <Button variant="contained" color="secondary">Following</Button>) }

                            <div> {`(Goes to ${pageData.institution})`} </div>
                        </div>

                        <div className="newProjectFormPanelGrid">
                            <div className="grid grid-cols-4">
                                {pageData.githubUrl &&
                                <a href={pageData.githubUrl}><GitHubIcon fontSize="large"/></a>}

                                {pageData.twitterUrl && 
                                    <a href={pageData.twitterUrl}><TwitterIcon fontSize="large"/></a>}

                                {pageData.websiteUrl && 
                                    <a href={pageData.websiteUrl}><WebIcon fontSize="large"/></a>}

                                {pageData.linkedinUrl &&
                                    <a href={pageData.linkedinUrl}><LinkedInIcon fontSize="large"/></a>}
                            </div>

                            <div>
                                <h2 className="text-xl font-display">Bio: </h2>
                                <p>{pageData.bio}</p>
                            </div>

                            <div className="w-full">
                                {pageData.skills.map((skill, index) =>
                                <Chip key={skill.id}
                                    label={skill.value} variant="outlined" className="mr-2 mb-2"/>)
                                }
                            </div>
                        </div>

                    </Box>}
                </Paper>
            </div>
        </Container>

    </PageLayout>
    </ProtectedRoute>
}
