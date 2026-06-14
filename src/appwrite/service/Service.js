import {Databases,Storage,Client,Query,ID} from "appwrite"
import conf from '../../conf/conf'
export class Service{
    client = new Client();
    bucket;
    database;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwritePROJECT_ID)
        this.bucket = new Storage(this.client);
        this.database = new Databases(this.client);
    }
    //database servise

    async createPost({title,slug,content,featuredimageDb,status,userId}){
        try {
            const post = await this.database.createDocument(
                conf.appwriteDATABASE_ID,
                conf.appwriteTABLE_ID,
                slug,
                {
                    title:title,
                    content:content,
                    featuredimageDb:featuredimageDb,
                    status:status,
                    userId:userId,
                }
            );

            return post;

        } catch (error) {
            console.log("Service Error: createPost: error:",error);
            return null;
        }
    }
    async updatePost(slug,{title,content,featuredimageDb,status}){
        try {
            const post = await this.database.updateDocument(
                conf.appwriteDATABASE_ID,
                conf.appwriteTABLE_ID,
                slug,
                {
                    title:title,
                    content:content,
                    featuredimageDb:featuredimageDb,
                    status:status,
                }
            );

            return post;

        } catch (error) {
            console.log("Service Error: createPost: error:",error);
            return null;
        }
    }
    async deletePost(slug){
        try {
            const result = await this.database.deleteDocument(
                conf.appwriteDATABASE_ID,
                conf.appwriteTABLE_ID,
                slug,
            );  
            console.log(result);
            return true;
        } catch (error) {
            console.log("Service Error: deletePost: error:",error);
            return false;
        }
    }
    async getPost(slug){
        try {
            const post = await this.database.getDocument(
                conf.appwriteDATABASE_ID,
                conf.appwriteTABLE_ID,
                slug,
            );  
            return post;
        } catch (error) {
            console.log("Service Error: getPost: error:",error);
            return null;
        }
    }
    async getPosts(queries = [Query.equal("status","active")]){
        try {
            const posts = await this.database.listDocuments(
                conf.appwriteDATABASE_ID,
                conf.appwriteTABLE_ID,
                queries
            );  
            return posts;
        } catch (error) {
            console.log("Service Error: getPosts: error:",error);
            return null;
        }
    }

    //file storage 
    async fileUpload(file){
        try {
            const result = await this.bucket.createFile(
                conf.appwriteSTORAGE_ID,
                ID.unique(),
                file,
             );
             return result;
        }
        catch (error) {
            console.log("Service Error: fileUpload: error:",error);
            return null;
        }
    }
    async fileDelete(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteSTORAGE_ID,
                fileId,
             );
             return true;
        }
        catch (error) {            
            console.log("Service Error: fileDelete: error:",error);
            return false;
        }
    }
//     getfilePreview(fileId){// we can write without async because it quickly return the file preview link but we can use async to handle error and return null if there is an error
//         try {
//             const filePreview =this.bucket.getFilePreview(
//                 conf.appwriteSTORAGE_ID,
//                 fileId,
//              );
//              return filePreview;
//         }
//         catch (error) {
//             console.log("Service Error: getfilePreview: error:",error);
//             return null;
//         }
//     }

    getfilePreview(fileId) {
        try {
            const filePreview = this.bucket.getFileView(
                conf.appwriteSTORAGE_ID,
                fileId,
            );
            return filePreview;
        }
        catch (error) {
            console.log("Service Error: getfilePreview: error:", error);
            return null;
        }
    }
};
const Services = new Service();

export default Services