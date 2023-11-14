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
export default function SingleUserPage() {
    const [age, setAge] = React.useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    return (
        <div>
            <div className="d-flex flex-column">
             <div className='w-25 mb-3'>

            <TextField id="filled-basic" label="First Name" variant="filled" />
             </div>
                <div className='w-25 mb-3'>

                    <TextField id="filled-basic" label="Last Name" variant="filled"  />
                </div>
                <div className='w-25 mb-3'>

                    <TextField disabled id="filled-disabled" label="Created at" variant="filled" />
                </div>
                <div className='w-25 mb-3'>

                    <TextField id="filled-basic" label="Email" variant="filled" defaultValue="bariscanhasar@icloud.com"/>
                </div>
                <div className='w-25 mb-3'>

                    <Switch {...label} />
                    <span>is Premium</span>
                </div>
                <div className='w-25 mb-3'>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker />
                    </LocalizationProvider>
                </div>
                <div className='w-25 mb-3'>

                    <TextField disabled id="filled-disabled" label="Premium Status" variant="filled" defaultValue="FREE" />
                </div>
                <div className='w-25 mb-3'>

                    <TextField id="filled-basic" label="Keychain" variant="filled"  />
                </div>


                        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-filled-label">Role</InputLabel>
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
                            <InputLabel id="demo-simple-select-filled-label">Device type</InputLabel>
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
