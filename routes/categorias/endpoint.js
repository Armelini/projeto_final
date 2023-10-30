const express = require("express");
const router = express.Router();
const jsonServer = require('json-server');
const db = jsonServer.router('data/db.json');
const Categoria = require('./categoria');

router.get("/", (req, res) => {
    const categorias = Categoria.listar(db.db.get("categorias"));
    res.json(categorias);
});

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const categoria = Categoria.obter(db.db.get("categorias"), id);
    if (categoria) {
        res.json(categoria);
    } else {
        res.status(404).json({ message: "Categoria não encontrada" });
    }
});

router.post("/", (req, res) => {
    const nome = req.body;
    const id = db.db.get('categorias').value().length + 1; // Simplesmente incrementa o ID
    const categoria = Categoria.criar(db.db.get("categorias"), id, nome)
    res.json(201).json(categoria);
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const nome = req.body.nome;
    const categoria = Categoria.atualizar(db.db.get('categorias'), id, nome);
    if (categoria) {
        res.json(categoria);
    } else {
        res.status(404).json({ message: 'Categoria não encontrada' });
    }
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const categoria = Categoria.deletar(db.db.get('categorias'), id);
    if (categoria) {
        res.json({ message: 'Categoria excluída com sucesso', categoria });
    } else {
        res.status(404).json({ message: 'Categoria não encontrada' });
    }
});

module.exports = router;