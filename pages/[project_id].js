import {useRouter} from 'next/router'
import React, {useContext, useEffect, useState} from "react";
import fb from "../src/firebase-config";
import PageLayout from "../components/PageLayout";
import {Container, Divider} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import FullScreenDialog from "../components/modals/NewProjectModal";
import AuthContext from "../src/AuthContext";
import LikeButton from "../components/LikeButton";
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import TagChip from "../components/TagChip";
import OutlinedTimeline from "../components/Timeline";
import ImInButton from "../components/ImInButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ParticipantList from "../components/ParticipantList";
import DeleteProject from "../components/modals/DeleteProject";


export default function () {
    const router = useRouter()
    const {project_id} = router.query
    const {sessionInfo, authState} = useContext(AuthContext)

    const [isLoading, toggleLoading] = useState(true)
    const [deleteModal, toggleDeleteModal] = useState(false)
    const [pageData, setPageData] = useState()
    const [editProjectModal, toggleEditProjectModal] = useState(false)

    useEffect(() => {

        fb.firestore().collection("projects").doc(project_id)
            .onSnapshot(function (doc) {
                setPageData(doc.data())
                toggleLoading(false)
            });


    }, [])

    function deleteProject () {
        toggleLoading(true)
        router.push('/')
        fb.firestore().collection("projects").doc(project_id).delete()
            .then(function (doc) {
                router.push('/')
            })
            .catch(() => toggleLoading(false))
    }


    return <>
        <DeleteProject  isOpen={deleteModal} onClose={() => toggleDeleteModal(false)} onDelete={deleteProject}/>
        <FullScreenDialog projectId={project_id} isOpen={editProjectModal} onClose={() => toggleEditProjectModal(false)} pageData={pageData}/>
        <PageLayout isLoading={isLoading}>
        {!isLoading && <Container maxWidth="md" className="space-y-4">
            <Paper variant="outlined">
                <Box p={4}>
                    <h1 className="text-4xl font-display font-semibold text-gray-800">{pageData.title}</h1>
                    <p className="text-gray-700 text-lg mt-2 mb-4">{pageData.description}</p>
                    <Box mx={-1}>
                        <span>
                            <LikeButton projectId={project_id}/>
                        </span>


                        {authState === 1 && ((pageData.created_by === sessionInfo.uid) ? <span>
                            <Button
                                color="primary"
                                size="100"
                                onClick={() => toggleEditProjectModal(true)}
                            >
                            Edit
                        </Button>
                            <Button
                                color="secondary"
                                size="100"
                                onClick={() => toggleDeleteModal(true)}
                            >
                            Delete
                        </Button>
                        </span> : <ImInButton projectId={project_id}/>)}
                    </Box>
                </Box>

            </Paper>

            <Paper variant="outlined">
                <Box p={4}>
                    <h1 className="text-2xl font-display">What we're looking for</h1>
                    {pageData.skills.length > 0 && <div className="mt-6">
                        <h3 className="font-medium text-gray-700 mb-2">Skills I'm looking for</h3>
                        <div>
                            {pageData.skills.map(skill =>  <TagChip key={skill.id} tag={skill.value}/>)}
                        </div>
                    </div>}

                    {pageData.software.length > 0 && <div className="mt-2">
                        <h3 className="font-medium text-gray-700 mb-2">Software, programming languages, and
                            technologies</h3>
                        <div>
                            {pageData.software.map(software =>  <TagChip key={software.id} tag={software.value}/>)}
                        </div>
                    </div>}

                    {pageData.languages.length > 0 && <div className="mt-2">
                        <h3 className="font-medium text-gray-700 mb-2">Foreign Languages</h3>
                        <div>
                            {pageData.languages.map(language => <TagChip key={language.id} tag={language.value}/>)}
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
    
            <Paper variant="outlined">
                <Box p={4}>
                    <h1 className="text-2xl font-display">Timeline</h1>
                    <OutlinedTimeline/>
                </Box>                
            </Paper>

            <ParticipantList projectId={project_id}/>


        </Container>}


    </PageLayout>
    </>


}


