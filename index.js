const express = require("express");
const jsonServer = require("json-server");
const app = express();
const produtosRouter = require("./routes/produtos/endpoint")
const categoriasRouter = require("./routes/categorias/endpoint")
const subcategoriasRouter = require("./routes/subcategorias/endpoint")
const middlewares = jsonServer.defaults();

app.use(express.json());
app.use(middlewares);
app.use("/api/produtos", produtosRouter);
app.use("/api/categorias", categoriasRouter);
app.use("/api/subcategorias", subcategoriasRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`API está em execução na porta ${port}`);
});