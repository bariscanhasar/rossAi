import MenuIcon from '@mui/icons-material/Menu'
import { Link, NavLink } from 'react-router-dom'
export default function SideMenu() {
  return (
    <div>
      <NavLink style={{ textDecoration: 'none', color: 'black' }} to="/users">
        <div className="d-flex align-items-center">
          <div className="m-2">
            <MenuIcon />
          </div>
          Users
        </div>
      </NavLink>
      <NavLink style={{ textDecoration: 'none', color: 'black' }} to="/styles">
        <div className="d-flex align-items-center">
          <div className="m-2">
            <MenuIcon />
          </div>
          Styles
        </div>
      </NavLink>
      <NavLink style={{ textDecoration: 'none', color: 'black' }} to="/prompts">
        <div className="d-flex align-items-center">
          <div className="m-2">
            <MenuIcon />
          </div>
          Prompts
        </div>
      </NavLink>
      <NavLink
        style={{ textDecoration: 'none', color: 'black' }}
        to="/replicatemodels"
      >
        <div className="d-flex align-items-center">
          <div className="m-2">
            <MenuIcon />
          </div>
          ReplicateModels
        </div>
      </NavLink>
      <NavLink style={{ textDecoration: 'none', color: 'black' }} to="/credits">
        <div className="d-flex align-items-center">
          <div className="m-2">
            <MenuIcon />
          </div>
          Credits
        </div>
      </NavLink>
      <NavLink style={{ textDecoration: 'none', color: 'black' }} to="/sets">
        <div className="d-flex align-items-center">
          <div className="m-2">
            <MenuIcon />
          </div>
          Set
        </div>
      </NavLink>
    </div>
  )
}
