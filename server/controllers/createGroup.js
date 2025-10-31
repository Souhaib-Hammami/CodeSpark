const{users,groups}=require ('../models')

const createGroups=async (req,res) => {
    const {owner_id,groupname,description,updatedAt,createdAt}=req.body
console.log({owner_id,groupname})
    try {
           const user = await users.findByPk(owner_id);
           console.log(user)
            const group = await groups.create({
            name: groupname,
            owner_id: owner_id,
            description:description,
            updatedAt:updatedAt,
            createdAt:createdAt
    });

    console.log("User methods:", Object.keys(group.__proto__));
     
    //await user.addGroup(group, { through: { role: "owner" } }); ma5edmetch
    await group.addUser(user, { through: { role: 'owner' ,group_name: group.name } });


    res.json({ message: "Group created and linked!", group });
  } catch (error) {
    res.status(500).json({ message: "Error creating group", error: error.message });
  }
};

module.exports=createGroups