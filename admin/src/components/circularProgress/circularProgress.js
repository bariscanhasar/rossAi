import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress';

export default function ProgressBar() {


    return(
        <div style={{height:'100vh'}} className="d-flex justify-content-center align-items-center" >
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        </div>
    )



}