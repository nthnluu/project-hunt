import {nanoid} from "nanoid";
import fb from "../../src/firebase-config";
import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../../src/AuthContext";
import {useRouter} from "next/router";
import PageLayout from "../../components/PageLayout";
import ArrayInputPanel from "../../components/modals/NewProjectModal/ArrayInputPanel";
import {TextField, Button, Container, Paper, Box, AppBar} from "@material-ui/core";
import ProtectedRoute from "../../components/ProtectedRoute";

import Autocomplete from "@material-ui/lab/Autocomplete";

export function ProfilePage({pageData, toggleLoading}) {

    const {sessionInfo} = useContext(AuthContext)
    const router = useRouter()

    // Form Data
    const [nameString, setNameString] = useState(pageData ? pageData.name : "")
    const [githubLink, setGithubLink] = useState(pageData ? pageData.githubUrl : "")
    const [linkedinLink, setLinkedinLink] = useState(pageData ? pageData.linkedinUrl : "")
    const [twitterLink, setTwitterLink] = useState(pageData ? pageData.twitterUrl : "")
    const [websiteLink, setWebsiteLink] = useState(pageData ? pageData.websiteUrl : "")
    const [bioContents, setBioContents] = useState(pageData ? pageData.bio : "")
    const [skillArray, setSkillArray] = useState(pageData ? pageData.skills : [])
    const [noNameStatus, setNoNameStatus] = useState(false)

    const [institutionString, setInstitutionString] = useState(pageData ? pageData.institution : "")
    const listOfInstitutions = ["Brown University", "Rhode Island School of Design"];

    function createProfile() {
        // call this function to create the profile on FB
        toggleLoading(true);

        if (nameString === "") {
            toggleLoading(false);
            setNoNameStatus(true);
            return;
        }

        fb.firestore().collection("profiles").doc(sessionInfo.uid).set({
            name: nameString,
            githubUrl: githubLink,
            linkedinUrl: linkedinLink,
            twitterUrl: twitterLink,
            websiteUrl: websiteLink,
            bio: bioContents,
            skills: skillArray, 
            institution: institutionString, 
            followingUsers: []
        })
            .then(function () {
                router.push(`/profile/${sessionInfo.uid}`);
            })
            .catch(function (error) {
                toggleLoading(false);
            });

    }

    return <Container maxWidth="md" className="mb-16 mt-4">
        <h1 className="mb-6 text-3xl font-display ">{pageData ? "Edit" : "Complete Your"} Profile</h1>
        <div className="space-y-4">


            <Paper variant="outlined">
                <Box p={4}>
                    <h2 className="text-xl font-display">{"Full name (required)"}</h2>
                    <div className="newProjectFormPanelGrid">
                        {(noNameStatus)
                        ? <TextField error id="standard-error-helper-text" className="w-full" label="Name" variant="outlined"
                            autoComplete="off" placeholder="Max Goof" helperText="Must be filled out."
                                     required
                            value={nameString} onChange={event => setNameString(event.target.value)} />
                        : <TextField id="outlined-basic" className="w-full" label="Name" variant="outlined"
                                   autoComplete="off" placeholder="Max Goof"
                                     required
                                   value={nameString} onChange={event => setNameString(event.target.value)}/>
                        }
                    </div>

                    

                </Box>
            </Paper>

            <Paper variant="outlined">
                <Box p={4}>
                    <h2 className="text-xl font-display">{"Socials"}</h2>
                    <div className="newProjectFormPanelGrid">
                        <TextField id="outlined-basic" className="w-full" label="Github" variant="outlined"
                                   autoComplete="off" placeholder="Start typing..."
                                   value={githubLink} onChange={event => setGithubLink(event.target.value)}/>

                        <TextField id="outlined-basic" className="w-full" label="Linkedin" variant="outlined"
                                   autoComplete="off" placeholder="Start typing..."
                                   value={linkedinLink} onChange={event => setLinkedinLink(event.target.value)}/>

                        <TextField id="outlined-basic" className="w-full" label="Twitter" variant="outlined"
                                   autoComplete="off" placeholder="Start typing..."
                                   value={twitterLink} onChange={event => setTwitterLink(event.target.value)}/>

                        <TextField id="outlined-basic" className="w-full" label="Personal Website" variant="outlined"
                                   autoComplete="off" placeholder="Start typing..."
                                   value={websiteLink} onChange={event => setWebsiteLink(event.target.value)}/>
                    </div>
                </Box>
            </Paper>

            <Paper variant="outlined">
                <Box p={4}>
                    <h2 className="text-xl font-display">{"Introduce yourself! Write your bio here."}</h2>
                    <div className="mt-8">
                        <TextField multiline id="outlined-basic" className="w-full" label="Biography" variant="outlined"
                                   autoComplete="off" placeholder="I am a quirky human bean"
                                   value={bioContents} onChange={event => setBioContents(event.target.value)}/>
                    </div>
                </Box>
            </Paper>

            <ArrayInputPanel title="Tags (eg: skills, programming and foreign languages)"
                             itemName="skill"
                             value={skillArray} setValue={setSkillArray}/>

            <Autocomplete
                className="form-item" options={listOfInstitutions} 
                value={institutionString}
                onChange={(event, value) => setInstitutionString(value)}
                renderInput={params => (
                    <TextField
                        {...params}
                        label="Institution"
                        placeholder="Choose your school"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined" />
                )}
            />

            <Button onClick={createProfile} disabled={nameString.length < 1} variant="contained" size="large" color="primary">{pageData ? "Save" : "Continue"}</Button>

        </div>
    </Container>
}


export default function () {
    const {sessionInfo} = useContext(AuthContext)
    if (!sessionInfo) return null
    const [isLoading, toggleLoading] = useState(true)
    const [pageData, setPageData] = useState(undefined)



    useEffect(() => {
        fb.firestore().collection("profiles").doc(sessionInfo.uid)
            .get()
            .then(function (snapshot) {
                setPageData(snapshot.data())
                toggleLoading(false)
            })
            .catch(() => toggleLoading(false));
    }, [sessionInfo])


    return <ProtectedRoute><PageLayout isLoading={isLoading}>
        {!isLoading && <ProfilePage pageData={pageData} toggleLoading={toggleLoading}/>}
    </PageLayout></ProtectedRoute>
}


