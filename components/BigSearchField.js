import Paper from "@material-ui/core/Paper";
import React, {useRef, useState} from "react";
import {IconButton} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import Chip from "@material-ui/core/Chip";
import { connectHits, connectSearchBox } from 'react-instantsearch-dom';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {useRouter} from "next/router";


const Hits = ({ hits }) => {
    const router = useRouter()

    if (hits.length === 0) return null

    return <Paper elevation={6}>
        <List>
            {hits.map(hit => (
                <ListItem button onClick={(e) => {
                    e.preventDefault()
                    router.push(`/${hit.objectID}`)}} key={hit.objectID}>
                    <ListItemText>
                        {hit.title}
                    </ListItemText>
                </ListItem>
            ))}
        </List>
    </Paper>
};


const CustomHits = connectHits(Hits);

const SearchBar = ({ currentRefinement, refine }) => {
    const [isFocused, toggleIsFocused] = useState(false)
    const searchRef = useRef(null)
    const id = open ? 'transitions-popper' : undefined;

    return <>
        <div className="relative">
            <div className={`border rounded-lg ${isFocused ? "border-transparent" : "border-lightGray"}`} ref={searchRef}>
                <Paper elevation={isFocused ? 3 : 0}>
                    <div className="p-2 flex justify-start">
                        <IconButton>
                            <SearchIcon/>
                        </IconButton>
                        <input
                            onChange={e => refine(e.currentTarget.value)}
                            value={currentRefinement}
                            onFocus={() => toggleIsFocused(true)}
                            onBlur={() => setTimeout(() => toggleIsFocused(false), 500)}
                            className="w-full py-3 pr-3 pl-1 focus:outline-none text-lg"
                            placeholder="Search"/>
                    </div>
                </Paper>

            </div>

            {isFocused && <div className="absolute w-full mt-2">
                <CustomHits/>
            </div>}


        </div>




        <div className="mt-4">
            <Chip variant="outlined" label="Startups" className="mr-2 mb-2"/>
            <Chip variant="outlined" label="Social Entrepreneurship" className="mr-2 mb-2"/>
            <Chip variant="outlined" label="Student-led Venture" className="mr-2 mb-2"/>
            <Chip variant="outlined" label="Programming" className="mr-2 mb-2"/>
        </div>
    </>
}


const ConnectedSearchBox = connectSearchBox(SearchBar);

export default function () {
    return <>
        <ConnectedSearchBox/>

        </>
}



