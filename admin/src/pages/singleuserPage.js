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
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {getUser} from "../graphql/queries";
import NativeSelect from '@mui/material/NativeSelect';
export default function SingleUserPage() {
    const [age, setAge] = React.useState('');
    const { id } = useParams()

    const { loading, error, data } = useQuery(getUser, {
        variables: { userId: id },
    });
    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error: {error.message}</p>
    }

    const userData = data && data.getUser ? data.getUser : null
    console.log(userData)
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    return (
        <div>
            <div className="d-flex flex-column">
             <div className='w-25 mb-3'>

            <TextField id="filled-basic" label="First Name" variant="filled" defaultValue={userData.firstName} />
             </div>
                <div className='w-25 mb-3'>

                    <TextField id="filled-basic" label="Last Name" variant="filled" defaultValue={userData.lastName}  />
                </div>
                <div className='w-25 mb-3'>

                    <TextField disabled id="filled-disabled" label="Created at" variant="filled" defaultValue={userData.createdAt} />
                </div>
                <div className='w-25 mb-3'>

                    <TextField id="filled-basic" label="Email" variant="filled" defaultValue="bariscanhasar@icloud.com" defaultValue={userData.email}/>
                </div>
                <div className='w-25 mb-3'>

                    <Switch {...label} defaultChecked={userData.isPremium} />
                    <span>is Premium</span>
                </div>
                <div className='w-25 mb-3'>
                    <InputLabel>Premium expiry date</InputLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker />
                    </LocalizationProvider>
                </div>

                <div className='w-25 mb-3'>

                    <TextField id="filled-basic" label="Keychain" variant="filled" defaultValue={userData.keychain}   />
                </div>

                <div className="mt-3"></div>
                <FormControl  sx={{ m: 1, minWidth: 120 }}>

                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                        defaultValue={userData.role}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Role"
                        onChange={handleChange}
                    >
                        <MenuItem value="USER">USER</MenuItem>
                        <MenuItem value="ADMIN">ADMIN</MenuItem>
                        <MenuItem value="SUPERADMIN">SUPERADMIN</MenuItem>
                    </Select>
                </FormControl>
                <div className="mt-3"></div>
                <FormControl  sx={{ m: 1, minWidth: 120 }}>

                    <InputLabel id="demo-simple-select-label">Device Type</InputLabel>
                    <Select
                        defaultValue={userData.device_type}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Device Type"
                        onChange={handleChange}
                    >
                        <MenuItem value="IOS">IOS</MenuItem>
                        <MenuItem value="ANDROID">ANDROID</MenuItem>
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
