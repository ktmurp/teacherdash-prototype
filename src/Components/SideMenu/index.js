import { AppstoreOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

function SideMenu() {
    const navigate = useNavigate()
    return <div className="SideMenu">
        <Menu 
        onClick={(item) => {
            //item.key
            navigate(item.key);
        }}
        items={[
            {
            label: "Dashboards",
            icon: <AppstoreOutlined />,
            key: '/'
            },
            {
            label: "Students",
            icon: <UserOutlined />,
            key: '/students'
            },
        ]}>

        </Menu>

    </div>
}
export default SideMenu;