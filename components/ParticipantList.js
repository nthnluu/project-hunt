import React, {useEffect, useState} from "react";
import fb from "../src/firebase-config";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {Divider} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";


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
                {displayName}
            </ListItemText>
            <Divider/>
        </ListItem>
    } else {
        return null
    }

}

export default function ({projectId}) {
    const [participantsData, setParticipantsData] = useState()
    const [isLoading, toggleLoading] = useState(true)

    useEffect(() => {

        fb.firestore().collection("projects").doc(projectId).collection("participants")
            .onSnapshot(function (doc) {
                setParticipantsData(doc.docs)

                toggleLoading(false)
            });

    }, [])

    if (!isLoading && participantsData.length < 1) return null

    return <Paper variant="outlined">
        {!isLoading &&  <Box p={4}>
            <h1 className="text-2xl font-display">Participants ({participantsData.length})</h1>
            <List>
               <ListItem>
                    <ListItemText>
                        {participantsData.map(value => <PartCard key={value.id} profileId={value.id}/>)}
                    </ListItemText>
                    <Divider/>


                </ListItem>

            </List>

        </Box>}
    </Paper>


}
