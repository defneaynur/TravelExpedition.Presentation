//#region Main domains

//#region localhost api endpoints
const API_TRAVEL_EXPEDITION_URL ='https://localhost:7092/'

//#endregion

const GetSessionUrl = API_TRAVEL_EXPEDITION_URL + "Session/GetSession"

//#region Travel Methods
const GetBusLocationsUrl = API_TRAVEL_EXPEDITION_URL + "Travel/GetBusLocations"
const GetBusJourneysUrl = API_TRAVEL_EXPEDITION_URL + "Travel/GetBusJourneys"
//#endregion

export default {
    GetSessionUrl,
    //#region Travel 
    GetBusLocationsUrl,
    GetBusJourneysUrl,
   
    //#endregion

   

    user: {
        Email: null,
        FullName: null,
        UnitId: null,
        UnitName: null,
        UserId: null,
        UserName: null,
        UserType: null,
    },

    async gettoken(/*creds*/) {
        var tokenPass = false
       
        return tokenPass
    },
    getUser() {
        this.user.UserName =localStorage.getItem("userName")
        return this.user
    },
    getToken() {
        const token = localStorage.getItem('sessionId')
        return token
    },
    getResponse() {
        var tokenPass = false
        return tokenPass;
    },

    getAuthHeader() {
        return window.localStorage.getItem('token')
    },
    LogOut() {
     
        localStorage.clear()  
        window.location.reload()
    },

}