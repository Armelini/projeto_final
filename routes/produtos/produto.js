class Produto {
    constructor(nome, descricao, referencia, id, idCategoria, idSubcategoria) {
        this.nome = nome;
        this.descricao = descricao;
        this.referencia = referencia;
        this.id = id;
        this.idCategoria = idCategoria;
        this.idSubcategoria = idSubcategoria;
    }

    static criar(produtos, nome, descricao, referencia, id, idCategoria, idSubcategoria) {
        const produto = new Produto(nome, descricao, referencia, id, idCategoria, idSubcategoria);
        produtos.push(produto);
        return produto;
    }

    static listar(produtos) {
        return produtos;
    }

    static obter(produtos, id) {
        return produtos.find((produto) => produto.id === id);
    }

    static atualizar(produtos, nome, descricao, referencia, id, idCategoria, idSubcategoria) {
        const produto = this.obter(produtos, id);
        if (produto) {
            produto.nome = nome;
            produto.descricao = descricao;
            produto.referencia = referencia;
            produto.idCategoria = idCategoria;
            produto.idSubcategoria = idSubcategoria;
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