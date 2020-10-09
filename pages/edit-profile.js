import {nanoid} from "nanoid";
import fb from "../src/firebase-config";
import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../src/AuthContext";
import {useRouter} from "next/router";
import PageLayout from "../components/PageLayout";
import ArrayInputPanel from "../components/modals/NewProjectModal/ArrayInputPanel";
import {TextField, Button, Container, Paper, Box, AppBar} from "@material-ui/core";
// import {makeStyles} from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//   socials: {
//     margin: theme.spacing(2),
//   },
// }));

function ProfilePage ({pageData}) {

    // const classes = useStyles();
    const [isLoading, toggleLoading] = useState(false)
    const {sessionInfo} = useContext(AuthContext)
    const router = useRouter()

    // Form Data
    const [githubLink, setGithubLink] = useState(pageData ? pageData.githubUrl : "")
    const [linkedinLink, setLinkedinLink] = useState(pageData ? pageData.linkedinUrl : "")
    const [twitterLink, setTwitterLink] = useState(pageData ? pageData.twitterUrl : "")
    const [websiteLink, setWebsiteLink] = useState(pageData ? pageData.websiteUrl : "")
    const [bioContents, setBioContents] = useState(pageData ? pageData.bio : "")
    const [skillArray, setSkillArray] = useState(pageData ? pageData.skills : [])


    function createProfile() {
        // call this function to create the profile on FB
        toggleLoading(true)

        fb.firestore().collection("profiles").doc(sessionInfo.uid).set({
            githubUrl: githubLink, 
            linkedinUrl: linkedinLink, 
            twitterUrl: twitterLink,
            websiteUrl: websiteLink,
            bio: bioContents, 
            skills: skillArray
        })
            .then(function() {
                router.push(`/profile`)
            })
            .catch(function(error) {
                toggleLoading(false)
            });

    }

    return <Container maxWidth="md" className="mb-16 mt-4">
        <h1 className="mb-6 text-3xl font-display ">{pageData ? "Edit" : "Complete Your"} Profile</h1>
        <div className="space-y-4">

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
              <div className="newProjectFormPanelGrid">
                <TextField multiline id="outlined-basic" className="w-full" label="Biography" variant="outlined" 
                  autoComplete="off" placeholder="I am a quirky human bean"a
                  value={bioContents} onChange={event => setBioContents(event.target.value)}/>
              </div>
            </Box>
          </Paper>

          <ArrayInputPanel title="Tags (eg: Institution, skills, programming and foreign languages)"
            itemName="skill"
            value={skillArray} setValue={setSkillArray}/>

          <Button onClick={createProfile} variant="contained" color="primary">Save</Button>

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
    }, [])


    return <PageLayout isLoading={isLoading}>
        {!isLoading &&  <ProfilePage pageData={pageData}/>}
    </PageLayout>
}


