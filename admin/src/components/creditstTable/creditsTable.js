import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import {useQuery} from "@apollo/client";
import {GET_ALL_CREDITS} from "../../graphql/queries";
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
        valueGetter: (params) =>   params.row.user.first_name + ' ' +  params.row.user.last_name + ' ' + "<"+ params.row.user.email+ '>'  ,
    }]


export default function CreditsTable() {
    const { loading, error, data } = useQuery(GET_ALL_CREDITS);


    const rowsData = data && data.get_all_credits ? data.get_all_credits : []

    console.log(data)
    return (
        <div style={{  width: '100%' }}>
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
