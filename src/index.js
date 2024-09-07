import connectDB from "./db/mongo.js";




connectDB()
// .then(
//     () => {
//         app.on("error", (error) => {
//             console.log("ERROR : ", error)
//             throw error
//         })
//         app.listen(process.env.PORT || 8000, () => {
//             console.log(`Server running at port ${process.env.PORT}`)
//             // createUser();

//         })
//     })
// .catch(
//     (err) => {
//         console.log("Connection Failed", err)
//     }
// )


