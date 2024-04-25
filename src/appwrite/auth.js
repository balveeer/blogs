import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;
    constructor() {

        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
            
    //   console.log(this.client)
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
    async emailVerification() {
        try {
            const verification = await this.account.createVerification('https://bloggling.netlify.app/verify-email');
            console.log("createEmail",verification)
        return verification;
            
        } catch (error) {
        console.log(error);
            
        }
    }
    async updateEmailverification(userId, secret) {
        try {
            const verification = await this.account.updateVerification(userId, secret);
            console.log("updateEmail",verification)
        return verification;
            
        } catch (error) {
        console.log(error);
            
        }
    }
}
const authService = new AuthService();

export default authService