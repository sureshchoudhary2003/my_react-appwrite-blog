import {Client,Account,ID} from 'appwrite'
import conf from '../../conf/conf'
// services/AuthService.js

export class Authservice{
    client = new Client();
    account;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwritePROJECT_ID)
        this.account = new Account(this.client);

    } 

    async createAcount({email,password,name}){
        try {
            const user = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );
            if(user){
                return this.login({email,password});
            }
            else{
                return user;
            }
        } catch (error) {
            console.log("Auth Error:createAccount: error:",error);
            throw error;
        }
        
    }
    async login({email,password}){
        try {
            return  await this.account.createEmailPasswordSession(
                email,
                password
            );
            
        } catch (error) {
            console.log("Auth Error:login: error:",error);
            throw error;
        }
        
    }
    async getCurrentUser(){
        try {
            const user = await this.account.get();
            // console.log(user);
            return user;
        } catch (error) {
            console.log("Auth Error:getCurrentUser: error:",error);
            return null;
        }
    }
    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Auth Error:logout: error:",error);
            throw error;
        }
        
    }
    
};


const AuthService = new Authservice();


export default AuthService;