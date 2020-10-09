import { useRouter } from 'next/router'
import {useEffect, useState} from "react";
import fb from "../src/firebase-config";
import PageLayout from "../components/PageLayout";


export default function () {
    const router = useRouter()
    const { project_id } = router.query

    const [pageData, setPageData] = useState()

    useEffect(() => {

        fb.firestore().collection("projects").doc(project_id)
            .onSnapshot(function(doc) {
                setPageData(doc.data())
            });

    }, [])

    return <PageLayout>
        <p>{JSON.stringify(pageData)}</p>
    </PageLayout>


}