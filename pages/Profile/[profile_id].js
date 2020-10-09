import {nanoid} from "nanoid";
import fb from "../../src/firebase-config";
import React, {useContext, useState, useEffect} from "react";
import AuthContext from "../../src/AuthContext";
import {useRouter} from "next/router";
import PageLayout from "../../components/PageLayout";
import ArrayInputPanel from "../../components/modals/NewProjectModal/ArrayInputPanel";
import { Chip, Container, Paper, Box } from '@material-ui/core'

import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import WebIcon from '@material-ui/icons/Web';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

export default function () {

    const router = useRouter();
    const { profile_id } = router.query;

    // Form Data
    const [pageData, setPageData] = useState()

    // user: sessionInfo.uid,
    // githubUrl: githubLink, 
    // linkedinUrl: linkedinLink, 
    // twitterUrl: twitterLink, 
    // bio: bioContents, 
    // skills: skillArray

    useEffect(() => {
        fb.firestore().collection("profiles").doc(profile_id)
            .onSnapshot(function(doc) {
                setPageData(doc.data())
            });
    });

    return <PageLayout>
        <Container maxWidth="md" className="my-24">
            <h1 className="mb-6 text-3xl font-display ">Basic Information</h1>
            <div className="space-y-4">
                <Paper variant="outlined">
                    {pageData
                        ? <Box p={4}>

                            <h1 className="mb-6 text-3xl font-display ">{ pageData.name }</h1>

                            <div className="newProjectFormPanelGrid">
                                <div className="grid grid-cols-4">
                                    { pageData.githubUrl
                                        ? <a href={pageData.githubUrl}><GitHubIcon fontSize="large"/></a>
                                        : <p/> }

                                    { pageData.twitterUrl
                                        ? <a href={pageData.twitterUrl}><TwitterIcon fontSize="large"/></a>
                                        : <p/> }

                                    { pageData.websiteUrl
                                        ? <a href={pageData.websiteUrl}><WebIcon fontSize="large"/></a>
                                        : <p/> }

                                    { pageData.linkedinUrl
                                        ? <a href={pageData.linkedinUrl}><LinkedInIcon fontSize="large"/></a>
                                        : <p/> }
                                </div>

                                <div>
                                    <h2 className="text-xl font-display">Bio: </h2>
                                    <p>{ pageData.bio } </p>
                                </div>

                                <div className="w-full">
                                    { pageData.skills.map((skill, index) =>
                                            <Chip key={skill.id}
                                                label={skill.value} variant="outlined" className="mr-2 mb-2"/>)
                                    }
                                </div>
                            </div>

                        </Box>
                        : <Box/>
                    }
                </Paper> 
            </div>
        </Container>

    </PageLayout>
}
