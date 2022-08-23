const FileUpload = require('../Model/File')

//uploading file
const uploadFile= async (req,res)=>{
  const splitArray = req.files.file.path.split('\\')
  console.log(splitArray);
  const url = splitArray[splitArray.length-1]
  let digitCode= Math.floor(100000 + Math.random() * 900000)
    try {
      const file = await FileUpload.create({
         fileCode:digitCode,
         file:url,
         userId:req.body.userId,
         filePath:req.files.file.path
      })

      return res.status(201).send(file)
      
    } catch (error) {
        return res.status(500).send({message:err.message})
    }
}

const getUploadedFile =async (req,res)=>{
   try {
    
    const userId = req.params
    console.log(userId);
    const image = await FileUpload.find({id:userId})
    return res.status(200).send(image)
   } catch (err) {
    return res.status(500).send({message:err.message})
   }
}

const deleteFile = async(req,res)=>{
  try {
    const userId = req.params.userId
    const image = await FileUpload.findOneAndDelete({id:userId})
   return res.status(200).send("deleted Successfully")
  } catch (err) {
    return res.status(500).send({message:err.message})
  }
}

const DownloadFile = async (req, res) => {
  try {
    let image = await FileUpload.findOne({ _id: req.params.id });
   return res.status(200).send(image.filePath);
    
  } catch (err) {
    return res.status(500).send({message:err.message})
  }
};

module.exports = {uploadFile,getUploadedFile,deleteFile,DownloadFile}