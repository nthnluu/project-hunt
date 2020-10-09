import {nanoid} from "nanoid";
import fb from "../src/firebase-config";
import React, {useContext, useState} from "react";
import AuthContext from "../src/AuthContext";
import {useRouter} from "next/router";
import PageLayout from "../components/PageLayout";
import {Button} from "@material-ui/core";

export default function () {

    const [isLoading, toggleLoading] = useState(false)
    const {sessionInfo} = useContext(AuthContext)
    const router = useRouter()

    // Form Data
    const [githubLink, setGithubLink] = useState(false)

    function createProfile() {
        // call this function to create the profile on FB


        const newId = nanoid(12)
        toggleLoading(true)

        fb.firestore().collection("profiles").doc(newId).set({
            user: sessionInfo.uid,
            githubUrl: githubLink
        })
            .then(function() {
                router.push(`/profile`)
            })
            .catch(function(error) {
                toggleLoading(false)
            });

    }

    return <PageLayout isLoading={isLoading}>
        <h1>User onboarding screen</h1>

        <Button onClick={createProfile}>Create</Button>

    </PageLayout>
}
