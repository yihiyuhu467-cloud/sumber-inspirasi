
import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());
app.use(express.static("public"));

const OPENAI_KEY = process.env.OPENAI_KEY;

app.post("/chat", async(req,res)=>{
  try{
    const r = await fetch("https://api.openai.com/v1/responses",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+OPENAI_KEY
      },
      body:JSON.stringify({
        model:"gpt-4o-mini",
        input:req.body.message
      })
    });
    const j = await r.json();
    res.json({reply: j.output_text});
  }catch(e){
    res.status(500).json({error:e.toString()});
  }
});

app.listen(3000,()=>console.log("running"));
