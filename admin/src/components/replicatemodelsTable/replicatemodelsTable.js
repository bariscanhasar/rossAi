import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ALL_REPLICATE_MODELS } from '../../graphql/queries';

const columns = [
    { field: 'name', headerName: 'Name', width: 500, valueGetter: (params) => params.row.name },
    { field: 'created_at', headerName: 'Updated at', width: 250 },
    { field: 'status', headerName: 'Status', width: 300 },
];

export default function ReplicateModelsTable() {
    const { loading, error, data } = useQuery(GET_ALL_REPLICATE_MODELS);
    const modelsData = data?.get_all_replicate_models ?? [];
    console.log(modelsData);
    const navigate = useNavigate();

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
