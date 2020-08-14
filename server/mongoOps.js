const pdfSchema = require("./models/pdfBook.js");

let array = [{
    "title": "Additional Mathematics" ,
    "author" : ["JF Talbert"],
    "subject":"Mathematics",
    "format" : "PDF",
    "description" : "Pure and Applied Mathematics",
    "edition":1,
    "gradeLevel":"Advanced",
    "dateUploaded":Date.now(),
    "downloadUrl":"https://odogwubooks.s3.us-east-2.amazonaws.com/additional-mathematics.pdf",
    "publicationDate":"2001"
  
},
{
    "title": "Futher Pure Mathematics" ,
    "author" : ["Brian Gaulter","Mark Gaulter"], 
    "subject":"Mathematics",
    "format" : "PDF",
    "description" : "",
    "edition":1,
    "gradeLevel":"Advanced",
    "dateUploaded":Date.now(),
    "downloadUrl":"https://odogwubooks.s3.us-east-2.amazonaws.com/Pure+Further+Mathematics.pdf",
    "publicationDate" : "2001",

},
{
    "title": "A Concise Course In Advanced Level Statistics" ,
    "author" : ["J Crawshaw"],
    "subject":"Statistics",
    "format" : "PDF",
    "description" : "Statistics book", 
    "edition":1,
    "gradeLevel" : "Advanced",
    "dateUploaded":Date.now(),
    "downloadUrl": "https://odogwubooks.s3.us-east-2.amazonaws.com/A_Concise_Course_in_Advanced_Level_Statistics__With_Worked_Examples__Fourth_Edition-JUGG3RNAUT.pdf",
    "publicationDate" : "2001", 
    
},
{
    "title": "A Level Core Pure Mathematics" ,
    "author" : ["Mike Cook"],
    "subject":"Mathematics",
    "format" : "PDF",
    "description" : "A book for A level math",
    "edition":1,
    "gradeLevel":"Advanced",
    "dateUploaded":Date.now(),
    "downloadUrl": "https://odogwubooks.s3.us-east-2.amazonaws.com/a-level+core+pure+maths.pdf",
    "publicationDate" : "2001", 

},
{
    "title": "Advanced Level Mathematics Statistics 1" ,
    "author" :[ "Steve Dobbs", "Jane Miller"],
    "subject":"Mathematics",
    "format" : "PDF",
    "description" : "A book for Cambridge students",
    "edition":1,
    "gradeLevel":"Advanced",
    "dateUploaded":Date.now(),
    "downloadUrl": "https://odogwubooks.s3.us-east-2.amazonaws.com/Statistics1.pdf",
    "publication Date" : "2002", 

}
]
array.map((data)=>{


  let pdf = new pdfSchema(data)
  pdf.save((err,doc)=>{
    if (err){
        console.log("err in saving", err)
    }else{
        console.log("doc_successfully saved",doc._id)
    }
  })

})