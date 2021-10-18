import {RestaurantModel} from "../../database/allModels";
import express from "express";
import {ValidateRestaurantCity,ValidateRestaurantSearchString} from "../../Validation/restaurant";
import {ValidateRestaurantId} from "../../Validation/food";


const Router = express.Router();

/*
Route        /
Des          Get all restaut=rent details
Params       None
Access       Public
Method       GET
*/

Router.get("/", async (req,res) =>{
  try{
    await ValidateRestaurantCity(req.query);
    const {city} = req.query;
    const restaurants = await RestaurantModel.find({city});
    return res.json({restaurants});
  } catch(error) {
    return res.status(500).json({error: error.message});
  }
});


/*
Route        /
Des          Get perticular restaut=rent details on id
Params       _id
Access       Public
Method       GET
*/

Router.get("/:_id", async(req,res) => {
  try{
  await ValidateRestaurantId(req.Params);

    const { _id } = req.Params;
    const restaurant = await RestaurantModel.findOne(_id);

    if(!restaurant)
    return res.status(404).json({error: "Restaurant not Found!"});

    return res.json({restaurant})
  } catch(error) {
    return res.status(500).json({ error: error.message});
  }
});

/*
Route        /search
Des          Get restaut=rent details on serach
Params       none
body         searchString
Access       Public
Method       GET
*/

Router.get("/search", async (req,res) => {
  try {
   await ValidateRestaurantSearchString(req.body)

    const {searchString} = req.body;

    const restaurants = await RestaurantModel.find({
      name: {$regex: searchString, $options: "i"},
    });

    return res.json({restaurants});
  } catch (error){
    return res.status(500).json({error: error.message});
  }
});

export default Router;
