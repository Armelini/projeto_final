class Serie {
    constructor(nome, id) {
        this.nome = nome;
        this.id = id;
    }

    static criar(nome, id) {
        const serie = new Serie(nome, id);
        return serie;
    }

    static listar(series) {
        return series;
    }

    static obter(series, id) {
        return series.find((serie) => serie.id === id);
    }

    static atualizar(series, nome, id) {
        const serie = this.obter(series, id);
        if (serie) {
            serie.nome = nome;
            return serie;
        }
        return null;
    }

    static deletar(series, id) {
        const index = series.findIndex((serie) => serie.id === id);
        if (index !== -1) {
            const serieRemovida = series.splice(index, 1)[0];
            return serieRemovida;
        }
        return null;
    }
}

module.exports = Serie;