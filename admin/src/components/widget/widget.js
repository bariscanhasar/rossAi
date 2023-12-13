import "./widget.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import ImageIcon from '@mui/icons-material/Image';
import CollectionsIcon from '@mui/icons-material/Collections';
const Widget = ({type, amount,diff}) => {
    let data;

    //temporary

    switch (type) {
        case "users":
            data = {
                title: "USERS",
                isMoney: false,
                link: "See all users",
                icon: (
                    <PersonOutlinedIcon
                        className="icon"
                        style={{
                            color: "crimson",
                            backgroundColor: "rgba(255, 0, 0, 0.2)",
                        }}
                    />
                ),
            };
            break;
        case "models":
            data = {
                title: "MODELS",
                isMoney: false,
                link: "View all models",
                icon: (
                    <ViewInArIcon
                        className="icon"
                        style={{
                            backgroundColor: "rgba(218, 165, 32, 0.2)",
                            color: "goldenrod",
                        }}
                    />
                ),
            };
            break;
        case "predictions":
            data = {
                title: "PREDICTIONS",
                link: "View all predictions.",
                icon: (
                    <ImageIcon
                        className="icon"
                        style={{backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green"}}
                    />
                ),
            };
            break;
        case "sets":
            data = {
                title: "SETS",
                link: "View all sets",
                icon: (
                    <CollectionsIcon
                        className="icon"
                        style={{
                            backgroundColor: "rgba(128, 0, 128, 0.2)",
                            color: "purple",
                        }}
                    />
                ),
            };
            break;
        default:
            break;
    }

    return (
        <div className="widget">
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">
          {data.isMoney && "$"} {amount}
        </span>
                <span className="link">{data.link}</span>
            </div>
            <div className="right">
                <div className="percentage positive">
                    <KeyboardArrowUpIcon/>
                    {diff} %
                </div>
                {data.icon}
            </div>
        </div>
    );
};

export default Widget;