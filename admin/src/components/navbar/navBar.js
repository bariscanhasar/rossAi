  import Button from '@mui/material/Button'
  import {useNavigate} from "react-router-dom";
export default function NavBar() {
    const navigate = useNavigate()

    const handleLogOut = (e) => {
        window.localStorage.removeItem("token")
        navigate("/login")
        window.location.reload()
    }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between align-items-center">

        <a className="navbar-brand" href="/">
          RossAi
        </a>
        <Button onClick={handleLogOut} variant="text">Logout</Button>

    </nav>
  )
}
