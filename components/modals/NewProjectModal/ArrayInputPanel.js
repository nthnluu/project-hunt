import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import {nanoid} from "nanoid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import React, {useState} from "react";

export default function ({title, itemName, value, setValue}) {

    const [newValue, setNewValue] = useState("")

    const addToArray = (newItem, setFunc) => {
        return setFunc(prevState => [...prevState, newItem])
    };

    const removeFromArray = (skill, setFunc) => {
        return setFunc(prevState => {
            let newArr = [...prevState]
            const indexToDel = newArr.findIndex(element => element.id === skill.id)
            newArr.splice(indexToDel, 1)
            return newArr
        })
    };

    return (<Paper variant="outlined">
        <Box p={4}>
            <h2 className="text-xl font-display">{title}</h2>
            <div className="newProjectFormPanelGrid">
                <form className="w-full" onSubmit={event => {
                    event.preventDefault();
                    addToArray({value: event.target[`new${itemName}`].value,
                        id: nanoid(6)}, setValue);
                    setNewValue("")}
                }>
                    <TextField id={`new${itemName}`}
                               name={`new${itemName}`}
                               className="w-full" variant="outlined"
                               placeholder="Start typing..."
                               autoComplete="off"
                               value={newValue}
                               onChange={event => setNewValue(event.target.value)}/>

                    <div className="flex justify-start mt-2">
                        <Button variant="outlined" color="primary"
                                type="submit"
                                disabled={newValue.length < 1}
                                size="small">Add</Button>
                    </div>

                </form>
                <div className="w-full">
                    {value.map((skill, index) =>
                        <Chip key={skill.id}
                              onDelete={() => removeFromArray(skill, setValue)}
                              label={skill.value} variant="outlined" className="mr-2 mb-2"/>)}


                </div>
            </div>

        </Box>


    </Paper>)
}