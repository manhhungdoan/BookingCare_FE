import { Avatar, List } from "antd"
import HomeHeader from "../HomeHeader"
import { getAllDoctors, getTopDoctorHomeService } from "../../../services/userService"
import { useEffect, useState } from "react"
import './Specialty.scss'


const AllDoctors = (props) => {
    const [listDoctors, setListDoctors] = useState([])
    useEffect(() => {
        fetchListDoctors();
    }, [])
    const fetchListDoctors = async () => {
        let res = await getTopDoctorHomeService();
        console.log('res', res)
        if (res?.errCode === 0) {
            setListDoctors(res?.data)
        }
    }

    const handleClick = (item) => {
        if (props.history) {
            props.history.push(`/detail-doctor/${item.id}`);
        }
    }
    return (
        <>
            <HomeHeader />

            <div className="container">
                <h5 className="font-weight-bold my-4">Danh sách các bác sĩ</h5>
                <List
                    itemLayout="horizontal"
                    dataSource={listDoctors}
                    renderItem={(item, index) => (
                        <List.Item onClick={() => handleClick(item)}>
                            <List.Item.Meta
                                key={index}
                                avatar={<Avatar src={item.image} />}
                                title={`${item.firstName} ${item.lastName}`}
                                description={item.address}

                            />
                        </List.Item>
                    )}
                />
            </div>
        </>
    )
}
export default AllDoctors;