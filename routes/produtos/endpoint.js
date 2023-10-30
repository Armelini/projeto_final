const express = require("express");
const router = express.Router();
const jsonServer = require('json-server');
const db = jsonServer.router('../../data/db.json');
const Produto = require('./produto');

router.get("/", (req, res) => {
    const produtos = Produto.listar(db.db.get("produtos"));
    res.json(produtos);
});

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const produto = Produto.obter(db.db.get("produtos"), id);
    if (produto) {
        res.json(produto);
    } else {
        res.status(404).json({ message: "Produto não encontrado" });
    }
});

router.post("/", (req, res) => {
    const { nome, descricao, referencia, idCategoria, idSubcategoria } = req.body;
    const id = db.db.get('produtos').value().length + 1; // Simplesmente incrementa o ID
    const produto = Produto.criar(db.db.get("produtos"), nome, descricao, referencia, id, idCategoria, idSubcategoria)
    res.json(201).json(produto);
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, descricao, referencia, idCategoria, idSubcategoria } = req.body;
    const produto = Produto.atualizar(db.db.get('produtos'), nome, descricao, referencia, id, idCategoria, idSubcategoria);
    if (produto) {
        res.json(produto);
    } else {
        res.status(404).json({ message: 'Produto não encontrado' });
    }
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const produto = Produto.deletar(db.db.get('clientes'), id);
    if (produto) {
        res.json({ message: 'Produto excluído com sucesso', produto });
    } else {
        res.status(404).json({ message: 'Produto não encontrado' });
    }
});

module.exports = router;