import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import {useQuery} from "@apollo/client";
import {getAllCreditsAdmin} from "../../graphql/queries";
import ProgressBar from "../circularProgress/circularProgress";
import { Toolbar } from '@mui/material';
import {Link} from "react-router-dom";
import * as React from "react";
const rows = [
    { id: 1,  date: '10/24/2023', amount:1, user: 'Barış Topal <baristpl@gmail.com>', },
    { id: 1,  date: '10/24/2023', amount:1, user: 'Barış Topal <baristpl@gmail.com>', },
    { id: 1,  date: '10/24/2023', amount:1, user: 'Barış Topal <baristpl@gmail.com>', },
    { id: 1,  date: '10/24/2023', amount:1, user: 'Barış Topal <baristpl@gmail.com>', },
    { id: 1,  date: '10/24/2023', amount:1, user: 'Barış Topal <baristpl@gmail.com>', },

]


const columns = [
    { field: 'date', headerName: 'Date',width:300 },
    { field: 'amount', headerName: 'Amount',width:300 },
    { field: 'type', headerName: 'Type',width:300 },
    {
        field: 'user',
        headerName: 'User',
        width: 400,
        valueGetter: (params) =>   params.row.user.firstName + ' ' +  params.row.user.lastName + ' ' + "<"+ params.row.user.email+ '>'  ,
    }]


export default function CreditsTable() {
    const { loading, error, data } = useQuery(getAllCreditsAdmin);

    if (loading) {
        return  <ProgressBar/>
    }


    const rowsData = data && data.getAllCreditsAdmin ? data.getAllCreditsAdmin : []

    console.log(data)
    return (
        <div style={{  width: '100%' }}>
           <Toolbar>
               <div className="d-flex flex-row-reverse w-100">

               <Link to="/credits/create">
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
            />

        </div>
    );
}
