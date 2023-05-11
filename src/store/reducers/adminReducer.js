import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    positions: [],
    roles: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    allScheduleTime: [],

    allRequiredDoctorInfor: [],
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        // gender
        case actionTypes.FETCH_GENDER_START:
            state.isLoadingGender = true;
            return {
                ...state,
            };
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.isLoadingGender = false;
            state.genders = action.data;
            return {
                ...state,
            };
        case actionTypes.FETCH_GENDER_FAILED:
            state.genders = [];
            state.isLoadingGender = false;
            return {
                ...state,
            };
        //position
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state,
            };
        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = [];
            return {
                ...state,
            };
        // role
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state,
            };
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = [];
            return {
                ...state,
            };
        //
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users = [];
            return {
                ...state,
            };
        // top doctor
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.topDoctors = action.data;
            return {
                ...state,
            };
        case actionTypes.FETCH_TOP_DOCTORS_FAILED:
            state.topDoctors = [];
            return {
                ...state,
            };

        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctors = action.data;
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_DOCTORS_FAILED:
            state.allDoctors = [];
            return {
                ...state,
            };
        //Time
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.dataTime;
            return {
                ...state,
            };
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
            state.allScheduleTime = [];
            return {
                ...state,
            };
        // required doctor infor
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
            state.allRequiredDoctorInfor = action.data;
            return {
                ...state,
            };
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED:
            state.allRequiredDoctorInfor = [];
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default adminReducer;
