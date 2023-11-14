import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import {Link, useNavigate} from "react-router-dom";
import { useQuery } from '@apollo/client';
import {GET_ALL_STYLES, GET_ALL_USERS} from "../../graphql/queries";
import * as React from "react";
import {Toolbar} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";


const columns = [



    { field: 'name', headerName: 'Name' ,width: 400},
    {
        field: 'banner',
        headerName: 'Banner',
        width: 200,
        renderCell: (params) => (
            <img
                src={params.value}
                alt={params.row.name}
                style={{ width: '100%', height: 'auto' }}
            />
        ),
    },
];

export default function StylesTable() {
    const [age, setAge] = React.useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const { loading, error, data } = useQuery(GET_ALL_STYLES);
    const navigate = useNavigate();


    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    const rowsData = data && data.get_all_styles ? data.get_all_styles : [];

    const handleRowClick = (params) => {
        navigate(`/styles/${params.id}`)
    };
    return (
        <div style={{ width: '100%' }}>
            <Toolbar>
                <div className="d-flex justify-content-end w-100 align-items-center">
                    <Link to="/styles/create">
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
                checkboxSelection
                rowHeight={200}
                onRowClick={handleRowClick}
            />
        </div>
    );
}
