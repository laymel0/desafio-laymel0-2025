//Classe que representa um abrigo de animais
class AbrigoAnimais {
  listaDeBrinquedos; // Lista com os brinquedos disponíveis
  animaisNoRecinto;

  constructor() {
    (this.animaisNoRecinto = {
      Rex: {
        especie: "cão",
        brinquedos: ["RATO", "BOLA"],
      },

      Mimi: {
        especie: "gato",
        brinquedos: ["BOLA", "LASER"],
      },

      Fofo: {
        especie: "gato",
        brinquedos: ["BOLA", "RATO", "LASER"],
      },

      Zero: {
        especie: "gato",
        brinquedos: ["RATO", "BOLA"],
      },

      Bola: {
        especie: "cão",
        brinquedos: ["CAIXA", "NOVELO"],
      },

      Bebe: {
        especie: "cão",
        brinquedos: ["LASER", "RATO", "BOLA"],
      },

      Loco: {
        especie: "jabuti",
        brinquedos: ["SKATE", "RATO"],
      },
    }),
      // Iniciando a lista de brinquedos
      (this.listaDeBrinquedos = [
        "RATO",
        "BOLA",
        "LASER",
        "CAIXA",
        "NOVELO",
        "SKATE",
      ]);
  }
  // Método principal do abrigo irá receber os brinquedos das duas pessoas e a orde dos animais
  encontraPessoas(
    brinquedosPessoa1 = "",
    brinquedosPessoa2 = "",
    ordemAnimais = ""
  ) {
    // Trasforma strings em listas
    //Divide a tring que veio sepada por virgulas em um array
    const brinquedos1 = brinquedosPessoa1.split(",");
    const brinquedos2 = brinquedosPessoa2.split(",");
    const animaisParaBusca = ordemAnimais.split(",");

    //  Verifica se tem brinquedo inválido ou se repete
    //O resultado será true se tiver algum brinquedo que não existe na lista ou se tiver brinquedo duplicado
    const brinquedoInvalido =
      this.verificarSeBrinquedoInvalido(brinquedos1) ||
      this.verificarSeBrinquedoInvalido(brinquedos2);

    // se for true então retorna erro e para o método, isso quer dizer que não chega a verificar os animais
    if (brinquedoInvalido) {
      return { erro: "Brinquedo inválido" };
    }

    // Se passou até aqui ele irá verifica se tem animal inválido ou se repete
    const animalInvalido = this.verificarSeAnimalInvalido(animaisParaBusca);
    if (animalInvalido) {
      return { erro: "Animal inválido" };
    }
    let quantidadeDeAnimaisAdotadosDaPessoa1 = 0;
    let quantidadeDeAnimaisAdotadosDaPessoa2 = 0;

    for (const nomeAnimal of animaisParaBusca) {
      const animal = this.animaisNoRecinto[nomeAnimal];
      this.verificarOrdemDosBrinquedos(brinquedos1, animal.brinquedos);
      this.verificarOrdemDosBrinquedos(brinquedos2, animal.brinquedos);
    }
  }

  // Método que  irá checar os brinquedos recebidos
  verificarSeBrinquedoInvalido(brinquedos = []) {
    // Verifica se os brinquedos existem dentro da lista inicial do abrigo
    // .every () só retorna true se todos os elementos passarem na condição
    // .includes irá eliminar se algo estiver diferente do que foi pedido como letras maisculas, menusculas, ponto, virgula ou espaço
    const existeBrinquedo = brinquedos.every((brinquedo) =>
      this.listaDeBrinquedos.includes(brinquedo)
    );

    // Agora irá checar se existe duplicados na lista recebida
    //Irá criar um new Set guardando os valores unicos
    //Se o tamanho do Set for menor que o do inicio, siginifica que tem duplicados
    const brinquedosParaBuscaSemDuplicacao = new Set(brinquedos);
    const existeDuplicado =
      brinquedos.length !== brinquedosParaBuscaSemDuplicacao.size;

    // Retorna true se achou problema, brinquedo inválido ou duplicado
    return !existeBrinquedo || existeDuplicado;
  }

  // Método parecido com o de brinquedos, mas agora para animais
  verificarSeAnimalInvalido(animaisParaBusca = []) {
    // Verifica se todos os animais existem na lista inicial do abrigo
    // .every () só retorna true se todos os elementos passarem na condição
    // .includes irá eliminar se algo estir diferente do que foi pedido como letras maisculas, menusculas, ponto, virgula ou espaço
    const existeAnimal = animaisParaBusca.every((animal) =>
      Object.keys(this.animaisNoRecinto).includes(animal)
    );

    //Verifica duplicadis na lista de animais
    const animaisParaBuscaSemDuplicacao = new Set(animaisParaBusca);
    const existeDuplicado =
      animaisParaBusca.length !== animaisParaBuscaSemDuplicacao.size;

    // Retorna true se encontrar algum problema, animal inválido ou duplicado
    return !existeAnimal || existeDuplicado;
  }

  verificarOrdemDosBrinquedos(
    brinquedosDaPessoa = ["LASER", "RATO", "BOLA"],
    brinquedosDoAnimal = ["RATO", "BOLA"],
    deveIgnorarOrdem = false
  ) {
    if (deveIgnorarOrdem) {
      const atendeBrinquedoLoco = brinquedosDoAnimal.every((brinquedo) => {
        return brinquedosDaPessoa.includes(brinquedo);
      });
      return atendeBrinquedoLoco;
    }

    let index = 0;
    for (const brinquedoPessoa of brinquedosDaPessoa) {
      // LASER === RATO
      // RATO === RATO
      // BOLA === BOLA

      if (brinquedoPessoa === brinquedosDoAnimal[index]) {
        index++;
      }
      if (index === brinquedosDoAnimal.length) {
        return true;
      }
    }
    return false;
  }
}

export { AbrigoAnimais as AbrigoAnimais };
