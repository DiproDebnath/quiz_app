const db = require('../connection')

module.exports = {
    selectQuestion: async () =>{
        try{
         let [rows] = await db.execute(`SELECT * FROM questions`)
         return rows
        }catch(err){
         console.log(err);
        }
     },
    insertQuestion: async (question) =>{
       try{
        let [data] = await db.execute(`INSERT INTO questions(question) VALUES('${question}')`)
        return data.insertId
       }catch(err){
        console.log(err);
       }
    }
}