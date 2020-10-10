import React, {useEffect, useState} from "react";
import fb from "../src/firebase-config";
import Box from "@material-ui/core/Box";
import {useRouter} from "next/router";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {Divider, Typography, Paper, Button} from "@material-ui/core";


export default function UserProjects(props) {
    const [participantsData, setParticipantsData] = useState()
    const [isLoading, toggleLoading] = useState(true)
    const router = useRouter();

    function PartCard({projectInfo}) {
        return <Paper variant="outlined" className="overflow-none">
            <Box p={4}>
                <ListItem>
                    <ListItemText>
                        <h2 className="text-3xl font-display">{projectInfo.title}</h2>
                        <Typography variant="body1"> {projectInfo.description}</Typography>
                    </ListItemText>
                    <Divider/>
                </ListItem>
            </Box>
        </Paper>
    }

    useEffect(() => {
        fb.firestore().collection("projects").where("created_by", "==", props.profile_id).get()
            .then(function (querySnapshot){
                var foo = []
                querySnapshot.forEach(function (doc){
                    foo.push({id: doc.id, ...doc.data()})
                });
                setParticipantsData(foo);
                toggleLoading(false)
            })
    }, [])

    return <div>
            <h1 className="text-3xl font-display">Project Gallery: </h1>
            {!isLoading && <List>
                { participantsData.map(value => 
                <PartCard onClick={() => router.push(`/${value.id}`)} 
                    projectInfo={value}/>)}
            </List>}
        </div>


}
