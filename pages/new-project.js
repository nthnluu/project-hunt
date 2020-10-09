import PageLayout from "../components/PageLayout";
import {useContext} from "react";
import AuthContext from "../src/AuthContext";
import {Container, Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

export default function () {
    const {authState, sessionInfo} = useContext(AuthContext)

    return <PageLayout>
        <Container maxWidth="md" className="mt-8">
            <h1 className="mb-6 text-3xl font-display ">Create a new project</h1>
            <div className="space-y-4">


                <Paper variant="outlined">
                    <Box p={4}>
                        <h2 className="text-xl font-display">Basic Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            <TextField id="outlined-basic" label="Project Title" variant="outlined"/>
                            <FormControl variant="outlined">
                                <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={'10'}
                                    onChange={() => console.log('hi')}
                                    label="Category"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Startup</MenuItem>
                                    <MenuItem value={20}>Social Initiative</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="mt-4">
                            <TextField multiline id="outlined-basic" label="Breif overview of your projeect"
                                       variant="outlined" className="w-full"/>
                        </div>
                    </Box>
                </Paper>
                <Paper variant="outlined">
                    <Box p={4}>
                        <h2 className="text-xl font-display">People you're looking for</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            <TextField id="outlined-basic" label="Project Title" />
                            <div></div>
                        </div>


                    </Box>


                </Paper>
            </div>
        </Container>

    </PageLayout>
}