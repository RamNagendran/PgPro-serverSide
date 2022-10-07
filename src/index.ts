import Express from "express";

const app = Express();

app.get("/", (req, res) => {
    res.send("You are perfect healthy.....universe blessed you a perfect health")
})

app.listen(5000, () => {
    console.log("universe listening on port 5000");    
})