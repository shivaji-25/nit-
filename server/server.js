const a=require("express");
const app=a();
app.get("/",(req,res)=>{
    res.send("server has running....");
});
app.listen(5000,()=>{
    console.log("sever is started on port 5000");
});