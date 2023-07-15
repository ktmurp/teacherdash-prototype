import { Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getInventory, getOrders } from "../../API";

function Students() {
    const [loading, setLoading] = useState(false)
    const [dataSource, setDataSource] = useState([])
    
    useEffect(() => {
        setLoading(true)
        getInventory().then(res=>{
            setDataSource(res.products)
        })
    }, [])
    
    return (<div>
    <Space>
    <Typography.Title level={4}>Class</Typography.Title>
    </Space>
    <Table columns={[
        {
        title: "Name",
        dataIndex: 'title',
        },
        {
            title: "Active Time",
            dataIndex: 'discountPercentage',
        },
        {
            title: "# of Completed",
            dataIndex: 'price',
        },
        {
            title: "# of Attempted",
            dataIndex: 'rating',
        },
        {
            title: "# of Events",
            dataIndex: 'stock',
        },
        {
            title: "Completion Time",
            dataIndex: 'discountPercentage',
        },
        {
            title: "Percent Incorrect",
            dataIndex: 'discountPercentage',
        },
    ]}
    dataSource={dataSource}
    ></Table>
    </div>
    );
}
export default Students;