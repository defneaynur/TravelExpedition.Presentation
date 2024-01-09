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
    // getUser() {
    //     const token = localStorage.getItem('token')
    //     var base64Payload = token.split('.')[1];
    //     var payload = Buffer.from(base64Payload, 'base64');
    //     const user = JSON.parse(payload.toString())

    //     this.user.Email = user.email;
    //     this.user.UnitId = user.unitId;
    //     this.user.FullName = user.name;
    //     this.user.UserId = user.userId;
    //     this.user.UserName = user.preferred_username;
    //     this.user.UnitName = user.unitName;
    //     this.user.UserType = user.userType;
    //     //this.user = JSON.parse(StorageService.getItem('user',this.secretKey))
    //     return this.user
    // },
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