import {Client, ID, Databases, Storage, ID} from 'appwrite'
import conf from '../conf/conf'

export class Service{
    client = new Client()
    databases
    Storage

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        
        this.databases = new Databases(this.client)
        this.Storage = new Storage(this.client)
    }

    async createUser({email,name,password}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                  name,
                  email,
                  password  
                }
            )
        } catch (error) {
            console.log('createUser error: ', error.message);
        }
    }

    async getUser({email, password}){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                
            )
        } catch (error) {
            console.log('User error: ',error.message);
        }
    }
    
}

const service = new Service()

export default service