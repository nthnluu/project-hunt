import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import PageLayout from "../../components/PageLayout";
import BigSearchField from "../../components/BigSearchField";
import {CardActionArea, Container, Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {connectHits} from "react-instantsearch-dom";
import Box from "@material-ui/core/Box";
import LikeButton from "../../components/LikeButton";

export default function () {
    const router = useRouter()
    const {searchq} = router.query
    const [pageData, setPageData] = useState([])



    const Hits = ({ hits }) => {
        const router = useRouter()

        if (hits.length === 0) return null

        return <div className="space-y-4">
                {hits.map(hit => (
                    <li key={hit.objectID}>
                        <Paper variant="outlined" className="overflow-none">
                            <CardActionArea onClick={() => router.push(`/${hit.objectID}`)}>
                                <Box p={4}>
                                    <Typography variant="h5" component="h2"
                                                gutterBottom>{hit.title}</Typography>
                                    <Typography variant="body1">
                                        {hit.description}</Typography>
                                </Box>
                            </CardActionArea>
                            <Box mx={3} mb={2}>
                                <LikeButton projectId={hit.objectID}/>
                            </Box>
                        </Paper>
                    </li>
                ))}
        </div>
    };

    const CustomHits = connectHits(Hits);

    return <PageLayout>
        <Container maxWidth="md">
            <BigSearchField hitCards={<CustomHits/>}  prefilledTerm={searchq}/>
        </Container>

    </PageLayout>

}