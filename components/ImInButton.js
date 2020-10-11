import Button from "@material-ui/core/Button";
import React, {useContext, useEffect, useState} from "react";
import fb from "../src/firebase-config";
import AuthContext from "../src/AuthContext";
import {useRouter} from "next/router";
import CheckIcon from '@material-ui/icons/Check';
import StarBorderIcon from '@material-ui/icons/StarBorder';

export default function ({projectId}) {
    const {sessionInfo, authState} = useContext(AuthContext)
    const [isLiked, toggleLiked] = useState(false)
    const [isAcceptedParticipant, toggleAcceptedParticipant] = useState(false)
    const [isLoading, toggleLoading] = useState(true)
    const router = useRouter()

    const [totalLikes, setTotalLikes] = useState("Like")

    useEffect(() => {
        if (authState === 1) {
            fb.firestore().collection("projects").doc(projectId).collection("pendingParticipants").doc(sessionInfo.uid)
                .onSnapshot(function (doc) {
                    if (doc.data()) {
                        toggleLiked(true)
                    } else {
                        toggleLiked(false)
                    }
                });

            fb.firestore().collection("projects").doc(projectId).collection("participants").doc(sessionInfo.uid)
                .onSnapshot(function (doc) {
                    toggleLoading(false)
                    if (doc.data()) {
                        toggleAcceptedParticipant(true)
                    } else {
                        toggleAcceptedParticipant(false)
                    }
                });
        } else {
            toggleLoading(false)
        }

        fb.firestore().collection("projects").doc(projectId).collection("pendingParticipants")
            .onSnapshot(function (doc) {
                setTotalLikes(doc.docs.length)
            });

    }, [])

    function likeProject() {
        if (authState !== 1) {
            router.push('/signup')
        } else {
            toggleLoading(true)
            if (!isLiked) {
                fb.firestore().collection("projects").doc(projectId).collection("pendingParticipants").doc(sessionInfo.uid).set({
                    clicked_at: new Date(),
                    profile: fb.firestore().collection("profiles").doc(sessionInfo.uid)
                })
                    .then(function() {
                        toggleLiked(true)
                        toggleLoading(false)
                    })
                    .catch(function(error) {
                        toggleLoading(false)
                    });
            } else {
                fb.firestore().collection("projects").doc(projectId).collection("pendingParticipants").doc(sessionInfo.uid).delete()
                    .then(function() {
                        toggleLiked(false)
                        toggleLoading(false)
                    })
                    .catch(function(error) {
                        toggleLoading(false)
                    });
            }
        }
    }

    if (isAcceptedParticipant){
        return <Button
            color={"primary"}
            size="100"
            disabled={isLoading}
            variant={"outlined"}
            style={{ backgroundColor: 'transparent', cursor: 'default' }}
            startIcon={<StarBorderIcon/>}
        >
            Official Member!
        </Button>
    } else{
        return <Button
            color={isLiked ?  "primary" : "inherit"}
            size="100"
            disabled={isLoading}
            onClick={likeProject}
            variant={isLiked ? "outlined": null}
            startIcon={isLiked ? <CheckIcon/> : <StarBorderIcon/>}
        >
            I Want In!
        </Button>
    }
}
