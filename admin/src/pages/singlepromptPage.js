import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import {GET_PROMPT} from "../graphql/queries";
export default function SinglePromptPage() {
    const [age, setAge] = React.useState('');
    const { id } = useParams()
    const { loading, error, data } = useQuery(GET_PROMPT, {
        variables: { prompt_id: id },
    })

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error: {error.message}</p>
    }

    const promptData = data && data.get_prompt ? data.get_prompt : null
    console.log(promptData)
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    return (
        <div>
            <div className="d-flex flex-column">
                <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-filled-label">Style</InputLabel>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={age}
                        onChange={handleChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>


                    <div className='mb-3'>

                    <TextField
                        id="filled-multiline-static"
                        label="Prompt"
                        fullWidth
                        multiline
                        rows={4}
                        defaultValue={promptData.prompt}
                        variant="filled"
                    />
                    </div>

                <div className='mb-3'>

                    <TextField
                        id="filled-multiline-static"
                        label="Negative Prompt"
                        fullWidth
                        multiline
                        rows={4}
                        defaultValue={promptData.negative_prompt}
                        variant="filled"
                    />
                </div>
                <div className='w-25 mb-3'>

                    <TextField id="filled-basic" label="Steps" variant="filled" defaultValue={promptData.steps}  />
                </div>
                <div className='w-25 mb-3'>

                    <TextField id="filled-basic" label="Cfg" variant="filled" defaultValue={promptData.cfg}  />
                </div>

                <div className='w-25 mb-3'>

                    <TextField id="filled-basic" label="Seeds" variant="filled"  />
                </div>






                <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-filled-label">Scheduler</InputLabel>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={promptData.scheduler}
                        onChange={handleChange}
                    >

                        <MenuItem value="DDIM">DDIM</MenuItem>
                        <MenuItem value="DPMSOLVERMULTISTEP">DPMSOLVERMULTISTEP</MenuItem>
                        <MenuItem value="K_EULER">K_EULER</MenuItem>
                        <MenuItem value="K_EULER_ANCESTRAL">K_EULER_ANCESTRAL</MenuItem>
                        <MenuItem value="KLMS">KLMS</MenuItem>
                        <MenuItem value="PNDM">PNDM</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-filled-label">Gender</InputLabel>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={promptData.gender}
                        onChange={handleChange}
                    >

                        <MenuItem value="MALE">MALE</MenuItem>
                        <MenuItem value="FEMALE">FEMALE</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>



                <div className='d-flex justify-content-between p-3 bg-light'>
                    <SaveIcon/>
                    <div className=''>

                        <DeleteIcon/>
                        <span>Delete</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
