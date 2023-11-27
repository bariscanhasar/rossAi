import { DataGrid } from '@mui/x-data-grid';
import { useQuery } from "@apollo/client";
import { GET_ALL_SETS_ADMIN } from "../../graphql/queries";
import * as React from "react";
import {Link, NavLink, useNavigate} from "react-router-dom";

const onButtonClick = (e, row) => {
    console.log(row)
    e.stopPropagation();

    //do whatever you want with the row
};



const columns = [
    { field: 'name', headerName: 'Name', width: 300 },
    {
        field: 'user',
        headerName: 'User',
        width: 400,
        valueGetter: (params) =>   params.row.user.first_name + ' ' +  params.row.user.last_name + ' ' + "<"+ params.row.user.email+ '>'  ,
    },
    {
        field: 'model',
        headerName: "Model",
        width: 300
    },
    {
        field: 'images',
        headerName: "Images",
        width: 300,
        valueGetter: (params) => params.row.images.length
    },


];

export default function SetTable() {
    const navigate = useNavigate();
    const { loading, error, data } = useQuery(GET_ALL_SETS_ADMIN);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const sets = data.get_all_set_admin; // Replace with the actual data field
    console.log(sets)

    const handleRowClick = (params) => {
        navigate(`/sets/${params.id}`)
    };

    return (
        <div style={{ width: '100%', height: 400 }}>
            <DataGrid
                rows={sets}
                columns={columns}
                pageSize={5}
                checkboxSelection
                onRowClick={handleRowClick}
            />
        </div>
    );
}