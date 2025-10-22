const {groups_members}=require('../models/index')


const joinGrp =async(req,res)=>{

const {groupId,groupN,userId}=req.body

console.log(groupId)
console.log(groupN)
console.log(userId)
try {
    const existingMember = await groups_members.findOne({
      where: {
        user_id: userId,
        group_id: groupId
      }
    });

    if (existingMember) {
      return res.status(400).json({ message: "User is already a member of this group" });
    }
const groups_m= await groups_members.create({ 
group_id: groupId,
group_name:groupN, 
user_id: userId })

res.status(201).json({ 
      message: "Successfully joined the group",
      data: groups_m 
    });
}

catch(error){
console.log(error)
 res.status(500).json({ message: "Error joining", error: error.message });
}

}


module.exports=joinGrp

