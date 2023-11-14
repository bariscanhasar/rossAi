import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import {Link, NavLink, useNavigate} from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import {Toolbar} from "@mui/material";
import TextField from "@mui/material/TextField";
import AddIcon from '@mui/icons-material/Add';
import {GET_ALL_PROMPTS} from "../../graphql/queries";
import { useQuery } from '@apollo/client';
import * as React from "react";
const columns = [

    {
        field: 'style',
        headerName: 'Style',
        width: 200,
        renderCell: (params) => (
        <a style={{color:'blue'}}>
            {params.value}

        </a>
        ),
    },
    {
        field: 'prompt',
        headerName: 'Prompt',
        width: 1050,
        renderCell: (params) => (
            <a>
                {params.value}

            </a>
        ),
    },
    { field: 'gender', headerName: 'Gender' },
];

export default function PromptTable() {
    const navigate = useNavigate();
    const [age, setAge] = React.useState('');
    const { loading, error, data } = useQuery(GET_ALL_PROMPTS);


    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    const rowsData = data && data.get_all_prompts ? data.get_all_prompts : [];
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const label = { inputProps: { 'aria-label': 'Switch demo' } };


    const handleRowClick = (params) => {
        navigate(`/prompts/${params.id}`)
    };
    return (
        <div style={{ width: '100%' }}>
            <Toolbar>
                <div className="d-flex justify-content-between w-100 align-items-center">

                <div className="d-flex">
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
                <div className="ms-3">
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
                </div>
                </div>
                    <Link to="/prompts/create">
                        <button className="btn btn-sm btn-primary me-3">Create</button>
                    </Link>
                </div>
            </Toolbar>
            <DataGrid
                rows={rowsData}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                onRowClick={handleRowClick}

            />
        </div>
    );
}
