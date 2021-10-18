//Libraries
//require('dotenv').config();
import express from "express";
//import AWS from "aws-sdk";
import multer from "multer";

//database Model
import{ImageModel} from "../../database/allModels";

//utilities
import{s3Upload} from "../../Utilities/AWS/s3";

const Router = express.Router();

//multer configuration

const storage = multer.memoryStorage();
const upload = multer({storage});

//AWS S3 bucket config

/*
Route        /
Des          Uploding given image to s3 bucket and seaving file to mongodb
Params      none
Access       Public
Method       GET
*/

Router.post("/", upload.single("file") ,async(req,res) => {
  try {
    const file = req.file;

    //s3 bucket options
    /*const bucketOptions={
      Buket: "name",
      key:file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read"
    };*/

    /*
    const uploadImage = await s3Upload(bucketOptions);
    */

  } catch (error) {
   return res.status(500).json({error: error.message});
  }
});

export default Router;
