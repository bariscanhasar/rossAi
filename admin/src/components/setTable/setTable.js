import { DataGrid } from '@mui/x-data-grid';
import { useQuery } from "@apollo/client";
import { getAllSetsAdmin } from "../../graphql/queries";
import * as React from "react";
import {Link, NavLink, useNavigate} from "react-router-dom";
import ProgressBar from "../circularProgress/circularProgress";

const onButtonClick = (e, row) => {
    console.log(row)
    e.stopPropagation();

    //do whatever you want with the row
};



const columns = [
    {
        field: 'user',
        headerName: 'User',
        width: 400,
        valueGetter: (params) =>   params.row.user.first_name + ' ' +  params.row.user.last_name + ' ' + "<"+ params.row.user.email+ '>'  ,
    },
    {
        field: 'model',
        headerName: "Model",
        width: 300,
        valueGetter: (params) => params.row.model ? params.row.model.name : ''
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
    const { loading, error, data } = useQuery(getAllSetsAdmin);

    if (loading) {
        return  <ProgressBar/>
    }
    if (error) return <p>Error: {error.message}</p>;

    const setsData = data.getAllSetsAdmin;

    const handleRowClick = (params) => {
        navigate(`/sets/${params.id}`)
    };

    return (
        <div style={{ width: '100%', height: 400 }}>
            <DataGrid
                rows={setsData}
                columns={columns}
                pageSize={5}
                checkboxSelection
                onRowClick={handleRowClick}
            />
        </div>
    );
}
