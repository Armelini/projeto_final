class Linha {
    constructor(nome, id) {
        this.nome = nome;
        this.id = id;
    }

    static criar(nome, id) {
        const linha = new Linha(nome, id);
        return linha;
    }

    static listar(linhas) {
        return linhas;
    }

    static obter(linhas, id) {
        return linhas.find((linha) => linha.id === id);
    }

    static atualizar(linhas, nome, id) {
        const linha = this.obter(linhas, id);
        if (linha) {
            linha.nome = nome;
            return linha;
        }
        return null;
    }

    static deletar(linhas, id) {
        const index = linhas.findIndex((linha) => linha.id === id);
        if (index !== -1) {
            const linhaRemovida = linhas.splice(index, 1)[0];
            return linhaRemovida;
        }
        return null;
    }
}

module.exports = Linha;