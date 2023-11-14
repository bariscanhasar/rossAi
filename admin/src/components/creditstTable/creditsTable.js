import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
const rows = [
    { id: 1,  date: '10/24/2023', amount:1, user: 'Barış Topal <baristpl@gmail.com>', },
    { id: 1,  date: '10/24/2023', amount:1, user: 'Barış Topal <baristpl@gmail.com>', },
    { id: 1,  date: '10/24/2023', amount:1, user: 'Barış Topal <baristpl@gmail.com>', },
    { id: 1,  date: '10/24/2023', amount:1, user: 'Barış Topal <baristpl@gmail.com>', },
    { id: 1,  date: '10/24/2023', amount:1, user: 'Barış Topal <baristpl@gmail.com>', },

]


const columns = [
    { field: 'date', headerName: 'Date',width:500 },
    { field: 'amount', headerName: 'Amount',width:300 },
    { field: 'user', headerName: 'User', width:300  }]


export default function CreditsTable() {
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
                checkboxSelection
            />
        </div>
    );
}
