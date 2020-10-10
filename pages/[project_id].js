import {useRouter} from 'next/router'
import React, {useContext, useEffect, useState} from "react";
import fb from "../src/firebase-config";
import PageLayout from "../components/PageLayout";
import {Container} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import SaveIcon from '@material-ui/icons/Save';
import Button from "@material-ui/core/Button";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FullScreenDialog from "../components/modals/NewProjectModal";
import AuthContext from "../src/AuthContext";
import LikeButton from "../components/LikeButton";


export default function () {
    const router = useRouter()
    const {project_id} = router.query
    const {sessionInfo} = useContext(AuthContext)

    const [isLoading, toggleLoading] = useState(true)
    const [pageData, setPageData] = useState()
    const [editProjectModal, toggleEditProjectModal] = useState(false)

    useEffect(() => {

        fb.firestore().collection("projects").doc(project_id)
            .onSnapshot(function (doc) {
                setPageData(doc.data())
                toggleLoading(false)
            });

    }, [])

    return <>
        <FullScreenDialog projectId={project_id} isOpen={editProjectModal} onClose={() => toggleEditProjectModal(false)} pageData={pageData}/>
        <PageLayout isLoading={isLoading}>
        {!isLoading && <Container maxWidth="md" className="space-y-4">
            <Paper variant="outlined">
                <Box p={4}>
                    <h1 className="text-4xl font-display font-semibold text-gray-800">{pageData.title}</h1>
                    <p className="text-gray-700 text-lg mt-2 mb-4">{pageData.description}</p>
                   <LikeButton projectId={project_id}/>
                    <Button
                        size="120"
                        startIcon={<StarBorderIcon/>}
                    >

                        I'm Interested
                    </Button>
                    {pageData.created_by === sessionInfo.uid ? <Button
                        color="primary"
                        size="120"
                        onClick={() => toggleEditProjectModal(true)}
                    >
                        Edit
                    </Button> : null}

                </Box>
            </Paper>

            <Paper variant="outlined">
                <Box p={4}>
                    <h1 className="text-2xl font-display">What we're looking for</h1>
                    {pageData.skills.length > 0 && <div className="mt-6">
                        <h3 className="font-medium text-gray-700 mb-2">Skills I'm looking for</h3>
                        <div>
                            {pageData.skills.map(skill => <Chip key={skill.id} label={skill.value} variant="outlined"
                                                                className="mr-2 mb-2"/>)}
                        </div>
                    </div>}

                    {pageData.software.length > 0 && <div className="mt-2">
                        <h3 className="font-medium text-gray-700 mb-2">Software, programming languages, and
                            technologies</h3>
                        <div>
                            {pageData.software.map(software => <Chip key={software.id} label={software.value}
                                                                     variant="outlined" className="mr-2 mb-2"/>)}
                        </div>
                    </div>}

                    {pageData.languages.length > 0 && <div className="mt-2">
                        <h3 className="font-medium text-gray-700 mb-2">Foreign Languages</h3>
                        <div>
                            {pageData.languages.map(language => <Chip key={language.id} label={language.value}
                                                                      variant="outlined" className="mr-2 mb-2"/>)}
                        </div>
                    </div>}
                </Box>
            </Paper>

            <Paper variant="outlined">
                <Box p={4}>
                    <h1 className="text-2xl font-display">Time commitment</h1>
                    <p className="mt-4 text-xl text-gray-700">{pageData.timeCommitment} per week</p>
                </Box>
            </Paper>


        </Container>}


    </PageLayout>
    </>


}