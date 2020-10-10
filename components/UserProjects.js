import React, {useEffect, useState} from "react";
import fb from "../src/firebase-config";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {Divider} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";


function navToProject(project_id){
    router.push(`/projects/${project_id}`);
}

function PartCard ({projectInfo}) {
    // const [displayName, setDisplayName] = useState(undefined)

    // useEffect(() => {

    //     fb.firestore().collection("profiles").doc(profileId)
    //         .onSnapshot(function (doc) {
    //             setDisplayName(doc.data().name)
    //         });

    // }, [])

    return <ListItem onClick={navToProject}>
        <ListItemText>
            {projectInfo.title}
        </ListItemText>
        <Divider/>
    </ListItem>
}

export default function UserProjects(props) {
    const [participantsData, setParticipantsData] = useState()
    const [isLoading, toggleLoading] = useState(true)

    useEffect(() => {

        fb.firestore().collection("projects").where("created_by", "==", props.profile_id).get()
            .then(function (querySnapshot){
                var foo = []
                querySnapshot.forEach(function (doc){
                    console.log(doc.data());
                    foo.push(doc.data())
                });
                setParticipantsData(foo);
                toggleLoading(false)
            })
    }, [])

    return <Paper variant="outlined">
        <Box p={4}>
            <h1 className="text-2xl font-display">Project Gallery: </h1>
            {!isLoading && <List>
                <ListItem>
                    <ListItemText>
                        { participantsData.map(value => 
                        <PartCard projectInfo={value}/>)
                        }
                    </ListItemText>
                    <Divider/>
                </ListItem>

            </List>}

        </Box>
    </Paper>


}
