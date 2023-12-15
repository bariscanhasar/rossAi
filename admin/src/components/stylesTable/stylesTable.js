import { DataGrid  } from '@mui/x-data-grid'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { getAllStylesAdmin } from '../../graphql/queries'
import * as React from 'react'
import { Toolbar } from '@mui/material'
import ProgressBar from "../circularProgress/circularProgress";


const columns = [
  { field: 'name', headerName: 'Name', width: 400 },
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
]

export default function StylesTable() {
  const navigate = useNavigate()
  const { loading, error, data } =  useQuery(getAllStylesAdmin);
  if (loading) {
    return  <ProgressBar/>
  }

  const label = { inputProps: { 'aria-label': 'Switch demo' } }
  const styleData = data && data.getAllStylesAdmin ? data.getAllStylesAdmin : []


  const handleRowClick = (params) => {
    navigate(`/styles/${params.id}`)
  }
  return (
    <div style={{ width: '100%' }}>
      <Toolbar>
        <div className="d-flex justify-content-end w-100 align-items-center">
          <Link to="/styles/create">
            <button className="btn btn-sm btn-dark me-3">Create</button>
          </Link>
        </div>
      </Toolbar>
      <DataGrid
        rows={styleData}
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
  )
}
