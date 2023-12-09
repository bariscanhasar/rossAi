import * as React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Toolbar } from '@mui/material';
import { getAllPrompts, getAllStylesAdmin } from '../../graphql/queries';
import { useQuery } from '@apollo/client';
import {makeQuery} from "../../makeQuery"
const columns = [
    {
        field: 'name',
        headerName: 'Style',
        width: 200,
        renderCell: (params) => <a style={{ color: 'blue' }}>{params.value}</a>,
    },
    {
        field: 'prompt',
        headerName: 'Prompt',
        width: 1050,
        renderCell: (params) => (
            <>
                <div>{params.row.prompt}</div>
            </>
        ),
    },
    { field: 'gender', headerName: 'Gender', hide: true }, // Hide the gender column
];

export default function PromptTable() {
    const navigate = useNavigate();
    const [age, setAge] = React.useState('');
    const [genderFilter, setGenderFilter] = React.useState('');

    const { loading, error, data } =  useQuery(getAllPrompts);
    console.log(error)
    const style_data = useQuery(getAllStylesAdmin);
    const handleRowClick = (params) => {
        navigate(`/prompts/${params.row.prompt_id}`);
    };



    const rowsData = data && data.getAllPrompts ? data.getAllPrompts : [];
    const styleData =
        style_data.data && style_data.data.getAllStylesAdmin
            ? style_data.data.getAllStylesAdmin
            : [];

    const transformedRows = rowsData.reduce((acc, style) => {
        const promptRows = style.prompt
            .filter((prompt) => {
                const isStyleMatch = age === '' || style.id === age;
                const isGenderMatch = genderFilter === '' || prompt.gender === genderFilter;
                return isStyleMatch && isGenderMatch;
            })
            .map((prompt, index) => ({
                id: `${style.id}-${index}`,
                name: style.name,
                prompt: prompt.prompt,
                gender: prompt.gender,
                prompt_id: prompt.id,
            }));
        return [...acc, ...promptRows];
    }, []);

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleGenderChange = (event) => {
        setGenderFilter(event.target.value);
    };

    return (
        <div style={{ width: '100%' }}>
            <Toolbar>
                <div className="d-flex justify-content-between w-100 align-items-center">
                    <div className="d-flex">
                        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="style-label">Style</InputLabel>
                            <Select
                                labelId="style-label"
                                id="style-select"
                                value={age}
                                onChange={handleChange}
                            >
                                <MenuItem value="">All Styles</MenuItem>
                                {styleData && style_data ? (
                                    styleData.map((style) => (
                                        <MenuItem key={style.id} value={style.id}>
                                            {style.name}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <span>NO STYLE DATA</span>
                                )}
                            </Select>
                        </FormControl>
                        <div className="ms-3">
                            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="gender-label">Gender</InputLabel>
                                <Select
                                    labelId="gender-label"
                                    id="gender-select"
                                    value={genderFilter}
                                    onChange={handleGenderChange}
                                >
                                    <MenuItem value="">All Genders</MenuItem>
                                    <MenuItem value="MALE">MALE</MenuItem>
                                    <MenuItem value="FEMALE">FEMALE</MenuItem>
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
                rows={transformedRows}
                columns={columns}
                rowsPerPageOptions={[5, 10]}
                onRowClick={handleRowClick}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
            />
        </div>
    );
}
