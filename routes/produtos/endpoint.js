const express = require("express");
const router = express.Router();
const jsonServer = require('json-server');
const db = jsonServer.router('data/db.json');
const Produto = require('./produto');

router.get("/", (req, res) => {
    const produtos = Produto.listar(db.db.get("produtos").value());
    res.json(produtos);
});

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const produto = Produto.obter(db.db.get("produtos").value(), id);
    if (produto) {
        res.json(produto);
    } else {
        res.status(404).json({ message: "Produto não encontrado" });
    }
});

router.post("/", (req, res) => {
    const { nome, descricao, referencia, idLinha, idSerie } = req.body;
    const id = db.db.get('produtos').value().length + 1; // Simplesmente incrementa o ID
    const produto = Produto.criar(nome, descricao, referencia, id, idLinha, idSerie);
    if (produto) {
        db.db.get('produtos').push(produto).write();
        res.status(201).json(produto);
    } else {
        res.status(500).json({ message: "Erro na inserção do produto!" });
    }
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, descricao, referencia, idLinha, idSerie } = req.body;
    const produto = Produto.atualizar(db.db.get('produtos').value(), nome, descricao, referencia, id, idLinha, idSerie);
    if (produto) {
        res.json(produto);
    } else {
        res.status(404).json({ message: 'Produto não encontrado' });
    }
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const produto = Produto.deletar(db.db.get('produtos').value(), id);
    if (produto) {
        db.db
            .get('produtos')
            .remove({ id: parseInt(id) })
            .write()
        res.json({ message: 'Produto excluído com sucesso', produto });
    } else {
        res.status(404).json({ message: 'Produto não encontrado' });
    }
});

module.exports = router;