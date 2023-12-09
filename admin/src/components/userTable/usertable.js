import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import './usertable.css'
import {Link, NavLink, useNavigate} from "react-router-dom";
import { Toolbar } from '@mui/material';
import TextField from '@mui/material/TextField';
import * as React from "react";
import { useQuery, gql } from '@apollo/client';
import {getAllUsers} from "../../graphql/queries"
import { useState } from 'react';


const onButtonClick = (e, row) => {
    console.log(row)
    e.stopPropagation();

};

const columns = [
    { field: 'first_name', headerName: 'First Name',},
    { field: 'last_name', headerName: 'Last Name',width:150  },
    { field: 'created_at', headerName: 'Created at', },
    { field: 'email', headerName: 'Email', width:250  },
    { field: 'role', headerName: 'Role', width:150 },
    { field: 'is_premium', headerName: 'Premium Status',width:150 },
    { field: 'device_type', headerName: 'Device Type', width:150},
    { field: 'train_credits', headerName: 'Train Credits',width:150 },
    { field: 'predict_credits', headerName: 'Predict Credits',width:150  },

];



export default function UserTable() {
    const { loading, error, data } = useQuery(getAllUsers);
    const [filterEmail, setFilterEmail] = useState('');
    console.log(data)
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

    const rowsData = data && data.getAllUsers ? data.getAllUsers : [];

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
