import Chip from "@material-ui/core/Chip";
import React from "react";
import {useRouter} from "next/router";

export default function ({tag}) {
    const router = useRouter()
    return <span className="mr-2 mb-2"><Chip variant="outlined" label={tag}
                      button onClick={() => router.push(`/search/${tag}`)}/></span>
}