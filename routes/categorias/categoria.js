class Categoria {
    constructor(nome, id) {
        this.nome = nome;
        this.id = id;

    }

    static criar(categorias, nome, id) {
        const categoria = new Categoria(nome, id);
        categorias.push(categoria);
        return categoria;
    }

    static listar(categorias) {
        return categorias;
    }

    static obter(categorias, id) {
        return categorias.find((categoria) => categoria.id === id);
    }

    static atualizar(categorias, nome, id) {
        const categoria = this.obter(categorias, id);
        if (categoria) {
            categoria.nome = nome;
            return categoria;
        }
        return null;
    }

    static deletar(categorias, id) {
        const index = categorias.findIndex((categoria) => categoria.id === id);
        if (index !== -1) {
            const categoriaRemovida = categorias.splice(index, 1)[0];
            return categoriaRemovida;
        }
        return null;
    }
}

module.exports = Categoria;