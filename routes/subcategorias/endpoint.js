const express = require("express");
const router = express.Router();
const jsonServer = require('json-server');
const db = jsonServer.router('data/db.json');
const Subcategoria = require('./subcategoria');

router.get("/", (req, res) => {
    const subcategorias = Subcategoria.listar(db.db.get("subcategorias"));
    res.json(subcategorias);
});

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const subcategoria = Subcategoria.obter(db.db.get("subcategorias"), id);
    if (subcategoria) {
        res.json(subcategoria);
    } else {
        res.status(404).json({ message: "Subcategoria não encontrada" });
    }
});

router.post("/", (req, res) => {
    const nome = req.body;
    const id = db.db.get('subcategorias').value().length + 1; // Simplesmente incrementa o ID
    const subcategoriacategoria = Subcategoria.criar(db.db.get("subcategorias"), id, nome)
    res.json(201).json(subcategoria);
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const nome = req.body.nome;
    const subcategoria = Subcategoria.atualizar(db.db.get('subcategorias'), id, nome);
    if (subcategoria) {
        res.json(subcategoria);
    } else {
        res.status(404).json({ message: 'Subcategoria não encontrada' });
    }
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const subcategoria = Subcategoria.deletar(db.db.get('subcategorias'), id);
    if (subcategoria) {
        res.json({ message: 'Subcategoria excluída com sucesso', subcategoria });
    } else {
        res.status(404).json({ message: 'Subcategoria não encontrada' });
    }
});

module.exports = router;