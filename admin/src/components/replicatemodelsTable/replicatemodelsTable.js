import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { getAllReplicateModelsAdmin } from '../../graphql/queries';
import ProgressBar from "../circularProgress/circularProgress";
import * as React from "react";

const columns = [
    { field: 'name', headerName: 'Name', width: 500, valueGetter: (params) => params.row.name },
    { field: 'created_at', headerName: 'Updated at', width: 250 },
    { field: 'status', headerName: 'Status', width: 300 },
];

export default function ReplicateModelsTable() {
    const navigate = useNavigate();
    const { loading, error, data } = useQuery(getAllReplicateModelsAdmin);
    if (loading) {
        return  <ProgressBar/>
    }
    const modelsData = data?.getAllReplicateModelsAdmin ?? [];
    console.log(modelsData);

    const handleRowClick = (params) => {
        navigate(`/replicate-models/${params.id}`);
    };

    return (
        <div style={{ width: '100%' }}>
            <DataGrid
                rows={modelsData}
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
