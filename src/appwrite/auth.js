import {Client, Account, ID} from "appwrite";
import conf from '../conf/conf'

export class AuthService{
    client = new Client()
    account

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        
        this.account = new Account(this.client)
    }

    //create account function/service
    async createAccount({name, email, password}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if(userAccount) {
                return this.login({email,password})
                // return this.getCurrentUser()
            }else{
                return userAccount
            }
        } catch (error) {
            console.log('createAccount error: ',error.message);
        }
    }

    //login function/service
    async login({email, password}){
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            console.log('Login error: ',error.message);
        }
    }

    //logout function/service
    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log('Logout error: ',error.message);
        }
    }

    //get current user function/service
    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log('currentUser error: ',error.message);
        }
    }
}

const authService = new AuthService()

export default authService;