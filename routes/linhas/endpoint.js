const express = require("express");
const router = express.Router();
const jsonServer = require('json-server');
const db = jsonServer.router('data/db.json');
const Linha = require('./linha');

router.get("/", (req, res) => {
    const linhas = Linha.listar(db.db.get("linhas").value());
    res.json(linhas);
});

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const linha = Linha.obter(db.db.get("linhas").value(), id);
    if (linha) {
        res.json(linha);
    } else {
        res.status(404).json({ message: "Linha não encontrada" });
    }
});

router.post("/", (req, res) => {
    const nome = req.body.nome;
    const id = db.db.get('linhas').value().length + 1; // Simplesmente incrementa o ID
    const linha = Linha.criar(nome, id);
    if (linha) {
        db.db.get('linhas').push(linha).write();
        res.status(201).json(linha);
    } else {
        res.status(500).json({ message: "Erro na inserção da linha!" });
    }
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const nome = req.body.nome;
    const linha = Linha.atualizar(db.db.get('linhas').value(), nome, id);
    if (linha) {
        res.json(linha);
    } else {
        res.status(404).json({ message: 'Linha não encontrada' });
    }
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const linha = Linha.deletar(db.db.get('linhas').value(), id);
    if (linha) {
        db.db
            .get('linhas')
            .remove({ id: parseInt(id) })
            .write()
        res.json({ message: 'Linha excluída com sucesso', linha });
    } else {
        res.status(404).json({ message: 'Linha não encontrada' });
    }
});

module.exports = router;