const express = require("express");
const jsonServer = require("json-server");
const app = express();
const produtosRouter = require("./routes/produtos/endpoint")
const linhasRouter = require("./routes/linhas/endpoint")
const seriesRouter = require("./routes/series/endpoint")
const middlewares = jsonServer.defaults();

app.use(express.json());
app.use(middlewares);
app.use("/api/produtos", produtosRouter);
app.use("/api/linhas", linhasRouter);
app.use("/api/series", seriesRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`API está em execução na porta ${port}`);
});