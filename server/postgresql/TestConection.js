const pgconnection=require('./connection')

const TestConection = async () => {

    try {
        await pgconnection.authenticate()
        console.log(" Connection to PostgreSQL server has been established successfully.")
    } catch (error) {
        console.log("Unable to connect to SQL database :")
        console.log(error)
    }
}
module.exports=TestConection