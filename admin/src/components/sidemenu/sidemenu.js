import React from 'react';
import { useSpring, animated } from 'react-spring';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';

const MenuItem = ({ to, children }) => {
    const [hovered, setHovered] = React.useState(false);

    const hoverAnimation = useSpring({
        scale: hovered ? 1.1 : 1,
        config: { mass: 1, tension: 120, friction: 14 },
    });


    return (
        <animated.div
            style={{
                transform: hoverAnimation.scale.interpolate(scale => `scale(${scale})`),
            }}
            onMouseOver={() => setHovered(true)}
            onMouseOut={() => setHovered(false)}
        >
            <NavLink style={{ textDecoration: 'none', color: 'black' }} to={to}>
                <div className="d-flex align-items-center">
                    <div className="m-2">
                        <MenuIcon />
                    </div>
                    {children}
                </div>
            </NavLink>
        </animated.div>
    );
};

const SideMenu = () => {
    return (
        <div>
            <MenuItem to="/users">Users</MenuItem>
            <MenuItem to="/styles">Styles</MenuItem>
            <MenuItem to="/prompts">Prompts</MenuItem>
            <MenuItem to="/replicatemodels">ReplicateModels</MenuItem>
            <MenuItem to="/credits">Credits</MenuItem>
            <MenuItem to="/sets">Set</MenuItem>
        </div>
    );
};

export default SideMenu;
