import React, {useEffect, useState} from "react";
import fb from "../src/firebase-config";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {Divider, Paper, Button} from "@material-ui/core";
import {useRouter} from "next/router";

export default function ({projectId}) {
    const [pendingData, setPendingData] = useState()
    const [isLoading, toggleLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {

        fb.firestore().collection("projects").doc(projectId).collection("pendingParticipants")
            .onSnapshot(function (doc) {
                setPendingData(doc.docs)

                toggleLoading(false)
            });

    }, [])

    function PartCard ({profileId}) {
        const [displayName, setDisplayName] = useState(undefined)

        useEffect(() => {

            fb.firestore().collection("profiles").doc(profileId)
                .onSnapshot(function (doc) {
                    setDisplayName(doc.data().name)
                });

        }, [])

        if (displayName) {
            return <ListItem>
                <ListItemText>
                    <Button onClick={() => router.push(`/profile/${profileId}`)} >
                        {displayName}
                    </Button>
                </ListItemText>
                <Button variant="outlined" color="primary" onClick={() => acceptParticipant(profileId)}> Accept </Button>
                &nbsp;&nbsp;&nbsp;
                <Button variant="outlined" color="secondary" onClick={() => rejectParticipant(profileId)}> Decline </Button>
                <Divider/>
            </ListItem>
        } else {
            return null
        }

    }

    function acceptParticipant(user){
        toggleLoading(true)
        fb.firestore().collection("projects").doc(projectId).collection("participants").doc(user).set({
            clicked_at: new Date(),
            profile: fb.firestore().collection("profiles").doc(user)
        })
            .then(function() {
                fb.firestore().collection("projects").doc(projectId).collection("pendingParticipants").doc(user).delete()
                    .finally(function(){
                        toggleLoading(false);

                    });
            })
            .catch(function(error) {
                toggleLoading(false)
            });
    }

    function rejectParticipant(user){
        toggleLoading(true)
        fb.firestore().collection("projects").doc(projectId).collection("pendingParticipants").doc(user).delete()
            .finally(function(){
                toggleLoading(false);
            });
    }

    if (!isLoading && pendingData.length < 1) return null

    return <Paper variant="outlined">
        {!isLoading &&  <Box p={4}>
            <h1 className="text-2xl font-display">Pending members({pendingData.length})</h1>
            <List>
                <ListItem>
                    <ListItemText>
                        {pendingData.map(value => 
                        <PartCard key={value.id} profileId={value.id}/>)}
                    </ListItemText>
                    <Divider/>
                </ListItem>
            </List>
        </Box>}
    </Paper>


}
