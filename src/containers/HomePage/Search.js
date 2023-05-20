import { useEffect, useState } from "react"
import { postSearch } from "../../services/userService";
import HomeHeader from "./HomeHeader";
import ProfileDoctor from "../Patient/Doctor/ProfileDoctor";
import DoctorSchedule from "../Patient/Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Patient/Doctor/DoctorExtraInfor";
import './Search.scss'
const Search = (props) => {
    const [listDoctors, setListDoctors] = useState([]);
    const [listClinic, setListClinic] = useState([]);
    const [listSpecialty, setListSpecialty] = useState([])
    const url = new URL(window.location.href)
    let param = url.pathname.substring(1).split('/')[1]

    useEffect(() => {
        fetchSearchResult(param)
    }, [])
    const fetchSearchResult = async (param) => {
        let res = await postSearch(param)
        setListDoctors(res?.doctors)
    }
    return (
        <>
            <HomeHeader isShowBanner={false} />
            <div className="search__result-container container">
                {
                    listDoctors.length > 0 &&
                    <div className="search__result">
                        <h3 className=" my-4">Bác sĩ:</h3>
                        <div className="row search__result__item">
                            {listDoctors.map((item, index) => {
                                return (
                                    <div className="row py-3 each-doctor" key={index}>
                                        <div className="col-12 col-lg-6 dt-content-left">
                                            <div className="profile-doctor">
                                                <ProfileDoctor
                                                    doctorId={item.id}
                                                    isShowDescriptionDoctor={true}
                                                    iShowLinkDetail={true}
                                                    isShowPrice={false}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6 dt-content-right">
                                            <div className="doctor-schedule">
                                                <DoctorSchedule doctorIdFromParent={item.id} />
                                            </div>
                                            <div className="doctor-extra-infor">
                                                <DoctorExtraInfor doctorIdFromParent={item.id} />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                }
            </div>
        </>
    )
}
export default Search;