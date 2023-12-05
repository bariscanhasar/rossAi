import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import './usertable.css'
import {Link, NavLink, useNavigate} from "react-router-dom";
import { Toolbar } from '@mui/material';
import TextField from '@mui/material/TextField';
import * as React from "react";
import { useQuery, gql } from '@apollo/client';
import {GET_ALL_USERS} from "../../graphql/queries"
import { useState } from 'react';


const onButtonClick = (e, row) => {
    console.log(row)
    e.stopPropagation();

};

const columns = [
    { field: 'first_name', headerName: 'First Name',},
    { field: 'last_name', headerName: 'Last Name',width:150  },
    { field: 'created_at', headerName: 'Created at', },
    { field: 'email', headerName: 'Email', width:300  },
    { field: 'role', headerName: 'Role',  },
    { field: 'is_premium', headerName: 'Premium Status',width:150 },
    { field: 'device_type', headerName: 'Device Type', },
    { field: 'train_credits', headerName: 'Train Credits', },
    { field: 'predict_credits', headerName: 'Predict Credits',width:150  },
    { field: 'actions', headerName: 'Actions', width: 75, renderCell: (params) => {
            return (
                <button style={{width:50, fontSize:"x-small"}}
                    onClick={(e) => onButtonClick(e, params.row)}
                    variant="contained"
                >
                    Delete
                </button>
            );
        } }
];



export default function UserTable() {
    const { loading, error, data } = useQuery(GET_ALL_USERS);
    const [filterEmail, setFilterEmail] = useState('');

    const navigate = useNavigate();

    const handleRowClick = (params) => {
        navigate(`/users/${params.id}`);
    };

    const handleFilterChange = (event) => {
        setFilterEmail(event.target.value);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    const rowsData = data && data.get_all_users ? data.get_all_users : [];

    const filteredRows = rowsData.filter((row) =>
        row.email.toLowerCase().includes(filterEmail.toLowerCase())
    );

    return (
        <div style={{ width: '100%' }}>
            <Toolbar>
                <TextField
                    id="filled-basic"
                    label="Email"
                    variant="filled"
                    value={filterEmail}
                    onChange={handleFilterChange}
                />
            </Toolbar>
            <DataGrid
                rows={filteredRows}
                columns={columns}
                pageSize={5}
                checkboxSelection
                onRowClick={handleRowClick}
            />
        </div>
    );
}
