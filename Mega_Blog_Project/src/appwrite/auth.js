import conf from "../conf/conf";
import {Client,Account,ID} from "appwrite"

// #Code improvement:
//now ab aap appwrite ke documenataion me jakr code copy kr skte hai bt code improvement krke humne yha class bnake uska object bnaye hai
//to dusri file direct object use krke method me jo bhi hai sbka access mil jayega

export class AuthService{
     client = new Client();
     account;
    //  ab   constructor call kro
    constructor(){//client ke andr appwrite url and project id dedo
      this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectID)
      this.account = new Account(this.client)
    }

    async createAccount({email,password,name}){
//  ab agr account nhi bna to error handling krni pdegi
    try{
     const userAccount =  await this.account.create(ID.unique(),email,password,name)//.create is default method of appwrite
     //if useraccount is created or not
     if(userAccount){
//account created successfully after this
      return this.login({email,password});
     }
     else{
    return userAccount;//if create nhi hua to 
     }
    }catch(error){
     throw error;   
    }
    }

    async login({email,password}){
      try{
       const loginresult =  await this.account.createEmailSession(email,password);
       return loginresult;
      }catch(error){
        throw error
      }
    }

    async getCurrentUser(){
        //to check if the user is already logged in or not for that use .get default method of appwrite ye aapko user exist krta h ya nhi batayega
        try{
            const currentuser = await this.account.get();
            if(currentuser){//***** 
             return currentuser;
            }
        else{
            return null;
        }
        }catch(error){
            // throw error //or i can write console.log
            console.log("Appwrite service :: getCurrentUser :: error ",error);
        }
        // return null;//we can do same thing in try ke andar if else lga skte hai
    }

    async logout(){
        try{
          await this.account.deleteSessions();
        }catch(error){
            console.log(error)
        }
    }

}

const authService = new AuthService;

export default authService;
