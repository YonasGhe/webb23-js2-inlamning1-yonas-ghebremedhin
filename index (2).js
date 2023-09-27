const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-requested-With, Content-Type, Accept"
    );
    next();
});

app.get("/highscore", (req, res) => {
    console.log(`Get request received at /highscore`);

    const rawScore = fs.readFileSync("./data/highscore.json", "utf8");
    const scores = JSON.parse(rawScore);
    console.log(scores);


    res.send(scores);
})

app.post("/highscore", (req, res) => {
    const { name, score } = req.body;

    const rawScore = fs.readFileSync("./data/highscore.json", "utf8");
    const scores = JSON.parse(rawScore);

    scores.push({ name, score });

    scores.sort((a, b) => b.score - a.score);
    scores.splice(5);
    fs.writeFileSync("./data/highscore.json", JSON.stringify(scores, null, 2));


    res.send({ message: "High score updated successfully"});

})
app.listen(3001, () => {
    console.log("App listening on port 3001!");
});