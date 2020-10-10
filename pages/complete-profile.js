import {ProfilePage} from "./profile/edit";
import {useContext, useEffect} from "react";
import fb from "../src/firebase-config";
import AuthContext from "../src/AuthContext";
import {useRouter} from "next/router";

export default function () {
    const {sessionInfo} = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
        if (sessionInfo) {
            fb.firestore().collection("profiles").doc(sessionInfo.uid)
                .onSnapshot(function (doc) {
                    if (doc.data()) {
                        router.push('/')
                    }
                });
        }

    }, [sessionInfo]);

    return <div className="p-6">
        <ProfilePage toggleLoading={() => console.log('loading...')}/>
    </div>
}