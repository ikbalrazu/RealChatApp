const User = require("../Models/userModel.js");
const bcrypt = require('bcrypt');
const querystring = require('querystring');
const cloudinary = require('../Confiq/cloudinary');


const registerUser = async(req,res) => {

    const {name, email, picture} = req.body;
    try{

        const salt = await bcrypt.genSalt(10);
        
        const password = await bcrypt.hash(req.body.password, salt);

        const userExists = await User.findOne({email});

        if(userExists){
            res.json({message:"User already exists."});
        }else{
            const user = await User.create({
                name,
                email,
                password,
                picture,
            })
    
            if(user){
                res.status(200).json({
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    picture:user.picture,
                });
            }else{
                res.status(400).json({message:"Failed to create the user"});
                
            }
        }
    }catch (err) {
        res.status(500).json(err);
      }
    
}

const loginUser = async(req,res) => {
    const {email,password} = req.body;

    const user = await User.findOne({email});

    if(user){
        const validity = await bcrypt.compare(password, user.password);
        if(!validity){
            res.status(400).json("wrong password");
        }else{
            res.json({
                _id:user._id,
                name:user.name,
                email:user.email,
                picture:user.picture,
            })
        }
        
    }else{
        res.json({message:"User Not Found"});
    }
}

const getUser = async(req,res) => {
    const id = req.params.id;
    try {
      const user = await User.findById(id);
      //console.log(user);
      if (user) {
        const { password, ...otherDetails } = user._doc;
        res.status(200).json(otherDetails);
      } else {
        res.status(404).json("No such User");
      }
    } catch (error) {
      res.status(500).json(error);
    }
}

const getAllUsers = async(req,res) => {
    try {
        let users = await User.find();
        users = users.map((user)=>{
          const {password, ...otherDetails} = user._doc
          return otherDetails
        })
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json(error);
      }
}

const getSelectedUser = async(req,res) => {
    //const userid = req.params.userid;
    const members = req.body;
    console.log(members);
    // const userid = JSON.parse(members);
    // //const id = ["6320d82e14b88be49737c229","6320e1189cc67aad45b78797"];
    // console.log(members);
    try{
        const users = await User.find( { _id: { $nin: members } } )
        console.log(members);
        res.status(200).json(users);
    }catch{
        console.log("error");
    }
}

const ExistUser = async(req,res)=>{
    const {email} = req.body;
    console.log(email);
    const userExists = await User.findOne({email});

    if(userExists){
        res.json({message:"User already exists"});
    }else{
        res.json({message:"New user found"});
    }
}

const uploadImage = async(req,res) =>{
    
}

const DeleteImage = async(req,res) =>{
    try {
        const {public_id} = req.body;
        console.log(public_id);
        
        if(public_id){
            await cloudinary.uploader.destroy(public_id,function(err,result){
                if(err){
                    res.json({msg:"Image Not Deleted"})
                }else{
                    //console.log(result?.info);
                    res.json({msg: "Deleted Image"})
                }
            });
        }

        // cloudinary.v1_1.uploader.destroy(public_id, async(err, result) =>{
        //     if(err){
        //         res.json({msg:"Image Not Deleted"})
        //     }else{
        //         console.log(result);
        //         res.json({msg: "Deleted Image"})
        //     }

            
        // })

        // if(!public_id) return res.status(400).json({msg: 'No images Selected'})

        // cloudinary.v2.uploader.destroy(public_id, async(err, result) =>{
        //     if(err) throw err;

        //     res.json({msg: "Deleted Image"})
        // })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}



module.exports = {registerUser,loginUser,getUser,getAllUsers,getSelectedUser,ExistUser,uploadImage,DeleteImage}