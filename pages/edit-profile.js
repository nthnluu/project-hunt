import {nanoid} from "nanoid";
import fb from "../src/firebase-config";
import React, {useContext, useState} from "react";
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

export default function () {

    // const classes = useStyles();
    const [isLoading, toggleLoading] = useState(false)
    const {sessionInfo} = useContext(AuthContext)
    const router = useRouter()

    // Form Data
    const [githubLink, setGithubLink] = useState("")
    const [linkedinLink, setLinkedinLink] = useState("")
    const [twitterLink, setTwitterLink] = useState("")
    const [websiteLink, setWebsiteLink] = useState("")
    const [bioContents, setBioContents] = useState("")
    const [skillArray, setSkillArray] = useState([])


    function createProfile() {
        // call this function to create the profile on FB


        const newId = nanoid(12)
        toggleLoading(true)

        fb.firestore().collection("profiles").doc(newId).set({
            user: sessionInfo.uid,
            githubUrl: githubLink, 
            linkedinUrl: linkedinLink, 
            twitterUrl: twitterLink, 
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

    return <PageLayout isLoading={isLoading}>
      <Container maxWidth="md" className="my-24">
        <h1 className="mb-6 text-3xl font-display ">Edit Profile</h1>
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

          <Button onClick={createProfile}>Create</Button>

        </div>
      </Container>

    </PageLayout>
}
