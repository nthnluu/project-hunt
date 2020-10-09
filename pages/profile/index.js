import PageLayout from "../../components/PageLayout";
import {useContext, useEffect} from "react";
import AuthContext from "../../src/AuthContext";
import {useRouter} from "next/router";

export default function () {
    const {sessionInfo} = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
        if (sessionInfo) {
            router.push(`/profile/${sessionInfo.uid}`)
        }
    })
    return <PageLayout isLoading={true}/>
 }