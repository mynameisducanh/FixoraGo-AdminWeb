import Api from "./api";

class UserApi extends Api {
    constructor(){
        super('users')
    }

    getTotalUser(){
        return this.request('get', '/count')
    }

    getAllUser(){
        return this.request('get', '/')
    }
}

export default UserApi;