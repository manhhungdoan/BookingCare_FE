import { Avatar, List } from "antd"
import HomeHeader from "../HomeHeader"
import { getAllSpecialty } from "../../../services/userService"
import { useEffect, useState } from "react"
import './Specialty.scss'


const AllSpecialty = (props) => {
    const [listSpecialty, setListSpecialty] = useState([])
    useEffect(() => {
        fetchListSpecialty();
    }, [])
    const fetchListSpecialty = async () => {
        let res = await getAllSpecialty();
        console.log('res', res)
        if (res?.errCode === 0) {
            setListSpecialty(res?.data)
        }
    }

    const handleClick = (item) => {
        if (props.history) {
            props.history.push(`/detail-specialty/${item.id}`);
        }
    }
    return (
        <>
            <HomeHeader />

            <div className="container">
                <h5 className="font-weight-bold my-4">Danh sách các chuyên khoa</h5>
                <List
                    itemLayout="horizontal"
                    dataSource={listSpecialty}
                    renderItem={(item, index) => (
                        <List.Item onClick={() => handleClick(item)}>
                            <List.Item.Meta
                                key={index}
                                avatar={<Avatar src={item.image} />}
                                title={item.name}
                                description={item.description}

                            />
                        </List.Item>
                    )}
                />
            </div>
        </>
    )
}
export default AllSpecialty;