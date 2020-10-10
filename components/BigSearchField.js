import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import React, {useState} from "react";
import {IconButton} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import Chip from "@material-ui/core/Chip";

export default function () {
    const [isFocused, toggleIsFocused] = useState(false)
    return <>
        <div className={`border rounded-lg ${isFocused ? "border-transparent" : "border-lightGray"}`}>
            <Paper elevation={isFocused ? 3 : 0}>
                <div className="p-2 flex justify-start">
                    <IconButton>
                        <SearchIcon/>
                    </IconButton>
                    <input
                        onFocus={() => toggleIsFocused(true)}
                        onBlur={() => toggleIsFocused(false)}
                        className="w-full py-3 pr-3 pl-1 focus:outline-none text-lg"
                        placeholder="Search for ideas, tags, desired skills, and more!"/>
                </div>
            </Paper>

        </div>
        <div className="mt-4">
            <Chip variant="outlined" label="Startups" className="mr-2 mb-2"/>
            <Chip variant="outlined" label="Social Entrepreneurship" className="mr-2 mb-2"/>
            <Chip variant="outlined" label="Student-led Venture" className="mr-2 mb-2"/>
            <Chip variant="outlined" label="Programming" className="mr-2 mb-2"/>
        </div>
    </>
}