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
export default function SinglePromptPage() {



    const [age, setAge] = React.useState('');
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
                        defaultValue="modelshoot style, head to shoulder portrait of cjw female,  (extremely detailed Hasselblad Award photo), tattoo model, neck tatoo, badass, perfect symmetrical face, centered, cinematic lighting, soft ambient lighting, grainy, 8k, dramatic lighting, ((intricate)), ((highly detailed)), high quality, sharp focus
"
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
                        defaultValue="black and white, black & white, low quality, 3d, anime, sketch, cartoon, (poorly drawn), blurry, face blemish, (ugly), watermark, b&w, big breasts, text, canvas frame, cartoon, 3d, ((disfigured)), ((bad art)), ((deformed)),((extra limbs)),((close up)),((b&w)), weird colors, blurry, (((duplicate))), ((morbid)), ((mutilated)), [out of frame], extra fingers, mutated hands, ((poorly drawn hands)), ((poorly drawn face)), (((mutation))), (((deformed))), ((ugly)), blurry, ((bad anatomy)), (((bad proportions))), ((extra limbs)), cloned face, (((disfigured))), out of frame, ugly, extra limbs, (bad anatomy), gross proportions, (malformed limbs), ((missing arms)), ((missing legs)), (((extra arms))), (((extra legs))), mutated hands, (fused fingers), (too many fingers), (((long neck))), Photoshop, video game, ugly, tiling, poorly drawn hands, poorly drawn feet, poorly drawn face, out of frame, mutation, mutated, extra limbs, extra legs, extra arms, disfigured, deformed, cross-eye, body out of frame, blurry, bad art, bad anatomy, 3d render
"
                        variant="filled"
                    />
                </div>
                <div className='w-25 mb-3'>

                    <TextField id="filled-basic" label="Steps" variant="filled"  />
                </div>
                <div className='w-25 mb-3'>

                    <TextField id="filled-basic" label="Cfg" variant="filled"  />
                </div>

                <div className='w-25 mb-3'>

                    <TextField id="filled-basic" label="Seeds" variant="filled"  />
                </div>






                <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-filled-label">Scheduler</InputLabel>
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
                <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-filled-label">Gender</InputLabel>
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
