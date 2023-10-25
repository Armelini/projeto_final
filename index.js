const express = require("express");
const jsonServer = require("json-server");
const bodyParser = require("body-parser");

const app = express();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const PORT = 3000;

app.use(bodyParser.json());
app.use(middlewares);

app.use("/api", router);

app.listen(PORT, () => {
    console.log(`O sistema está rodando na porta ${PORT}`);
});

app.get("/api/produtos", (req, res) => {
    const produtos = router.db.get("produtos").value();
    res.json(produtos);
});

app.post("/api/produtos", (req, res) => {
    const novoProduto = req.body;
    router.db.get("produtos").push(novoProduto).write();
    res.json(novoProduto);
});

app.put("/api/produtos/:id", (req, res) => {
    const produtoId = parseInt(req.params.id);
    const updatedProduto = req.body;

    router.db
        .get("produtos")
        .find({ id: produtoId })
        .assign(updatedProduto)
        .write();

    res.json(updatedProduto);
});

app.get("/api/categorias", (req, res) => {
    const categorias = router.db.get("categorias").value();
    res.json(categorias);
});

app.post("/api/categorias", (req, res) => {
    const novaCategoria = req.body;
    router.db.get("categoria").push(novaCategoria).write();
    res.json(novaCategoria);
});

app.put("/api/categorias/:id", (req, res) => {
    const categoriaId = parseInt(req.params.id);
    const updatedCategoria = req.body;

    router.db
        .get("categorias")
        .find({ id: categoriaId })
        .assign(updatedCategoria)
        .write();

    res.json(updatedCategoria);
});

app.get("/api/subcategorias", (req, res) => {
    const subCategorias = router.db.get("subCategorias").value();
    res.json(subCategorias);
});

app.post("/api/subcategorias", (req, res) => {
    const novaSubCategoria = req.body;
    router.db.get("subCategoria").push(novaSubCategoria).write();
    res.json(novaSubCategoria);
});

app.put("/api/subcategorias/:id", (req, res) => {
    const subCategoriaId = parseInt(req.params.id);
    const updatedSubCategoria = req.body;

    router.db
        .get("subCategorias")
        .find({ id: subCategoriaId })
        .assign(updatedSubCategoria)
        .write();

    res.json(updatedSubCategoria);
});