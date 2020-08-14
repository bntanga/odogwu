const pdfSchema = require("./models/pdfBook.js");
const Fuse = require('fuse.js')





function generalSearch(text){
    pdfSchema.find({},(err,docs)=>{
        if (err){
            console.log(err);
        }
        else{
            console.log(docs);
        }
    });
}

function searchPdfByTitle(text){
    const options = {
        includeScore: true,
        keys: ['title']
      }
    pdfSchema.find({},(err,docs)=>{
        if (err){
            console.log(err);
        }
        else{     
            const fuse = new Fuse(docs, options)
            const result = fuse.search(text)
            console.log(result.filter((res)=> res.score<0.20))
        }
    });
}

function searchPdfByAuthor(text){
    const options = {
        includeScore: true,
        keys: ['author']
      }
    pdfSchema.find({},(err,docs)=>{
        if (err){
            console.log(err);
        }
        else{     
            const fuse = new Fuse(docs, options)
            const result = fuse.search(text)
            console.log(result.filter((res)=> res.score<0.20))
    
    } 
 })
}

function searchPdfByLevel(text){
    const options = {
        includeScore: true,
        keys: ['gradeLevel']
      }
    pdfSchema.find({},(err,docs)=>{
        if (err){
            console.log(err);
        }
        else{     
            const fuse = new Fuse(docs, options)
            const result = fuse.search(text)
            console.log(result.filter((res)=> res.score<0.20))
    } 
 })

}



module.exports = {searchPdfByTitle,generalSearch,searchPdfByAuthor,searchPdfByLevel}




