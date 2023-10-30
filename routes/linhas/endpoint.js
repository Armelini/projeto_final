const express = require("express");
const router = express.Router();
const jsonServer = require('json-server');
const db = jsonServer.router('data/db.json');
const Linha = require('./linha');

router.get("/", (req, res) => {
    const linhas = Linha.listar(db.db.get("linhas"));
    res.json(linhas);
});

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const linha = Linha.obter(db.db.get("linhas"), id);
    if (linha) {
        res.json(linha);
    } else {
        res.status(404).json({ message: "Linha não encontrada" });
    }
});

router.post("/", (req, res) => {
    const nome = req.body;
    const id = db.db.get('linhas').value().length + 1; // Simplesmente incrementa o ID
    const linha = Linha.criar(db.db.get("linhas"), id, nome)
    res.json(201).json(linha);
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const nome = req.body.nome;
    const linha = Linha.atualizar(db.db.get('linhas'), id, nome);
    if (linha) {
        res.json(linha);
    } else {
        res.status(404).json({ message: 'Linha não encontrada' });
    }
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const linha = Linha.deletar(db.db.get('linhas'), id);
    if (linha) {
        res.json({ message: 'Linha excluída com sucesso', linha });
    } else {
        res.status(404).json({ message: 'Linha não encontrada' });
    }
});

module.exports = router;