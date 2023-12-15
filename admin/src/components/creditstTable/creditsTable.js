import { DataGrid,   } from '@mui/x-data-grid';
import {useQuery} from "@apollo/client";
import {getAllCreditsAdmin} from "../../graphql/queries";
import ProgressBar from "../circularProgress/circularProgress";
import { Toolbar } from '@mui/material';
import {Link} from "react-router-dom";
import * as React from "react";



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


    return (
        <div style={{  width: '100%' }}>
           <Toolbar>
               <div className="d-flex flex-row-reverse w-100">

               <Link to="/credits/create">
                   <button className="btn btn-sm btn-dark me-3">Create</button>
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
