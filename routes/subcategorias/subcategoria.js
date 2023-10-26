class Subcategoria {
    constructor(nome, id) {
        this.nome = nome;
        this.id = id;
    }

    static criar(subcategorias, nome, id) {
        const subcategoria = new Subcategoria(nome, id);
        subcategorias.push(subcategoria);
        return subcategoria;
    }

    static listar(subcategorias) {
        return subcategorias;
    }

    static obter(subcategorias, id) {
        return subcategorias.find((subcategoria) => subcategoria.id === id);
    }

    static atualizar(subcategorias, nome, id) {
        const subcategoria = this.obter(subcategorias, id);
        if (subcategoria) {
            subcategoria.nome = nome;
            return subcategoria;
        }
        return null;
    }

    static deletar(subcategorias, id) {
        const index = subcategorias.findIndex((subcategoria) => subcategoria.id === id);
        if (index !== -1) {
            const subcategoriaRemovida = subcategorias.splice(index, 1)[0];
            return subcategoriaRemovida;
        }
        return null;
    }
}

module.exports = Subcategoria;