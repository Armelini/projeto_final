const express = require("express");
const router = express.Router();
const jsonServer = require('json-server');
const db = jsonServer.router('data/db.json');
const Serie = require('./serie');

router.get("/", (req, res) => {
    const series = Serie.listar(db.db.get("series").value());
    res.json(series);
});

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const serie = Serie.obter(db.db.get("series").value(), id);
    if (serie) {
        res.json(serie);
    } else {
        res.status(404).json({ message: "Série não encontrada" });
    }
});

router.post("/", (req, res) => {
    const nome = req.body.nome;
    const id = db.db.get('series').value().length + 1; // Simplesmente incrementa o ID
    const serie = Serie.criar(nome, id);
    if (serie) {
        db.db.get('series').push(serie).write();
        res.status(201).json(serie);
    } else {
        res.status(500).json({ message: "Erro na inserção da série!" });
    }
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const nome = req.body.nome;
    const serie = Serie.atualizar(db.db.get('series').value(), nome, id);
    if (serie) {
        res.json(serie);
    } else {
        res.status(404).json({ message: 'Série não encontrada' });
    }
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const serie = Serie.deletar(db.db.get('series').value(), id);
    if (serie) {
        db.db
            .get('series')
            .remove({ id: parseInt(id) })
            .write()
        res.json({ message: 'Série excluída com sucesso', serie });
    } else {
        res.status(404).json({ message: 'Série não encontrada' });
    }
});

module.exports = router;