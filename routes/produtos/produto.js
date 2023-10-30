class Produto {
    constructor(nome, descricao, referencia, id, idLinha, idSerie) {
        this.nome = nome;
        this.descricao = descricao;
        this.referencia = referencia;
        this.id = id;
        this.idLinha = idLinha;
        this.idSerie = idSerie;
    }

    static criar(nome, descricao, referencia, id, idLinha, idSerie) {
        const produto = new Produto(nome, descricao, referencia, id, idLinha, idSerie);
        return produto;
    }

    static listar(produtos) {
        return produtos;
    }

    static obter(produtos, id) {
        return produtos.find((produto) => produto.id === id);
    }

    static atualizar(produtos, nome, descricao, referencia, id, idLinha, idSerie) {
        const produto = this.obter(produtos, id);
        if (produto) {
            produto.nome = nome;
            produto.descricao = descricao;
            produto.referencia = referencia;
            produto.idLinha = idLinha;
            produto.idSerie = idSerie;
            return produto;
        }
        return null;
    }

    static deletar(produtos, id) {
        const index = produtos.findIndex((produto) => produto.id === id);
        if (index !== -1) {
            const produtoRemovido = produtos.splice(index, 1)[0];
            return produtoRemovido;
        }
        return null;
    }
}

module.exports = Produto;