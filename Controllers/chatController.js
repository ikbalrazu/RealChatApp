const ChatModel = require("../Models/chatModel.js");

const createChat = async (req, res) => {
  const newChat = new ChatModel({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const result = await newChat.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const userChats = async (req, res) => {
  try {
    //console.log(req.params.userId);
    const chat = await ChatModel.find({
      members: { $in: [req.params.userId] },
    });
    console.log(chat);
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

const findChat = async (req, res) => {
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat)
  } catch (error) {
    res.status(500).json(error)
  }
};

const deleteChat = async (req,res) => {
  //const {chatid} = req.body;
  try{

    const deletechat = await ChatModel.findByIdAndRemove(req.params.id);
    // console.log(deleteChat);
    // res.status(200).json(deletechat);
    if(!deletechat){
      res.send("Chat id not found");
    }else{
      deletechat.remove();
      res.send("Chat user deleted.");
    }

  }catch(error){
    res.status(500).json(error);
  }
}

module.exports = {createChat,userChats,findChat,deleteChat}