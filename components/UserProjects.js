import React, {useContext, useEffect, useState} from "react";
import fb from "../src/firebase-config";
import Box from "@material-ui/core/Box";
import {useRouter} from "next/router";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {CardActionArea, Divider, Typography, Paper, Button} from "@material-ui/core";
import LikeButton from "./LikeButton";
import ImInButton from "./ImInButton";
import AuthContext from "../src/AuthContext";


export default function UserProjects(props) {
    const [participantsData, setParticipantsData] = useState()
    const [isLoading, toggleLoading] = useState(true)
    const router = useRouter();
    const {authState, sessionInfo} = useContext(AuthContext)

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
        {!isLoading && 
        <ul className="space-y-4 mb-8 mt-24">
            <h1 className="text-3xl font-display">Project Gallery: </h1>
            {participantsData.map(item => {
                return <li key={item.id}>
                    <Paper variant="outlined" key={item.id} className="overflow-none">
                        <CardActionArea onClick={() => router.push(`/${item.id}`)}>
                            <Box p={4}>
                                <Typography variant="h5" component="h2"
                                    gutterBottom>{item.title}</Typography>
                                <Typography variant="body1">
                                    {item.description}</Typography>
                            </Box>
                        </CardActionArea>
                        <Box mx={3} mb={2}>

                            <span className="mr-2">
                                <LikeButton projectId={item.id}/>
                            </span>

                            {authState === 1 && ((item.created_by === sessionInfo.uid) ? null : <ImInButton projectId={item.id}/>)}

                        </Box>
                    </Paper>
                </li>
            })}
        </ul>
        }
    </div>

}
