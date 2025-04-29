import Api from "./api";

class UserApi extends Api {
    constructor(){
        super('users')
    }

    getTotalUser(){
        return this.request('get', '/count')
    }
}

export default UserApi;