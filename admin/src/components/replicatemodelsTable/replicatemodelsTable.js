import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import {useNavigate} from "react-router-dom";
const rows = [
    { id: 1, name: 'univenn-startup-studio/clo4q8qsy008kmh1rnwmbr29b', status: 'canceled',updated_at: '24.10.2023 22:39:05\n', user: 'Barış Topal <baristpl@gmail.com>', },
    { id: 1, name: 'univenn-startup-studio/clo4q8qsy008kmh1rnwmbr29b', status: 'canceled',updated_at: '24.10.2023 22:39:05\n', user: 'Barış Topal <baristpl@gmail.com>', },
    { id: 1, name: 'univenn-startup-studio/clo4q8qsy008kmh1rnwmbr29b', status: 'canceled',updated_at: '24.10.2023 22:39:05\n', user: 'Barış Topal <baristpl@gmail.com>', },
    { id: 1, name: 'univenn-startup-studio/clo4q8qsy008kmh1rnwmbr29b', status: 'canceled',updated_at: '24.10.2023 22:39:05\n', user: 'Barış Topal <baristpl@gmail.com>', },
    { id: 1, name: 'univenn-startup-studio/clo4q8qsy008kmh1rnwmbr29b', status: 'canceled',updated_at: '24.10.2023 22:39:05\n', user: 'Barış Topal <baristpl@gmail.com>', },
    { id: 1, name: 'univenn-startup-studio/clo4q8qsy008kmh1rnwmbr29b', status: 'canceled',updated_at: '24.10.2023 22:39:05\n', user: 'Barış Topal <baristpl@gmail.com>', },
]


const columns = [
    { field: 'name', headerName: 'Name',width:500 },
    { field: 'updated_at', headerName: 'Updated at',width:250 },
    { field: 'status', headerName: 'Status',width:300  },
    { field: 'user', headerName: 'User', width:300  }]


export default function ReplicateModelsTable() {
    const navigate = useNavigate();

    const handleRowClick = (params) => {
        navigate(`/prompts/${params.id}`)
    };
    return (
        <div style={{  width: '100%' }}>
            <DataGrid
                rows={rows}
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
