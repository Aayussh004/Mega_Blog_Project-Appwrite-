import conf from "../conf/conf";
import {Client,ID,Databases, Storage,Query} from "appwrite"

export class Service{
   client = new Client();
   databases;
   bucket;

   constructor(){
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectID)
    this.databases = new Databases(this.client)
    this.bucket = new Storage(this.client)
   }

   async createPost({title,slug,content,featuredImage,status,userId}){
      try{
        return await this.databases.createDocument(conf.appwriteDatabaseID,conf.appwriteCollectionID,slug,
            {title,content,featuredImage,status,userId})//slug ki jagah ID.unique() bhi use kr skte h, ye sb values user provide kraega
      }catch(error){
        console.log(error)
      }
   }

   async updatePost(slug, {title,content,featuredImage,status}){
       try{
        return await this.databases.updateDocument(
            conf.appwriteDatabaseID,
            conf.appwriteCollectionID,
            slug,
            {title,content,featuredImage,status}//ye wo values hai jo update krni hai user ko 
        )
       }
       catch(error){console.log(error)}
   }

   async deletePost(slug){
    try{
       await this.databases.deleteDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug
      )
      return true;//if deleted successfully return true
    }catch(error){
      console.log(error)
      return false;//if not return false
    }
   }

   async getPost(slug){//for showing single post of user
     try{
       return await this.databases.getDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug
       )
     }
     catch(error){
        console.log(error)
        return false;
     }
   }

   async getPosts(qvar = [Query.equal("status","active")]){//it should show only those posts whose status is active so we should write a query
try {
    return await this.databases.listDocuments(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        qvar
    )
} catch (error) {
    console.log(error)
    return false;
}
   }

//    file upload ki methods
   async uploadFile(file){//yha file ka blob dena hai
   try {
    return await this.bucket.createFile(
        conf.appwriteBucketID,
        ID.unique(),
        file
    )
   } catch (error) {
    console.log(error)
    return false;
   }
   }

   async deleteFile(fileId){
    try {
        await this.bucket.deleteFile(
            conf.appwriteBucketID,
            fileId
        )
        return true;// delete ho gyi to return true krdo
    } catch (error) {
        console.log("cannot be deleted due to : ",error)
        return false;
    }
   }

   async getFilePreview(fileId){//to preview a file
    return this.bucket.getFilePreview(
        conf.appwriteBucketID,
        fileId
    )
   }


}

const serviceobj = new Service();

export default serviceobj;