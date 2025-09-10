class AbrigoAnimais {
  listaDeBrinquedos;
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
      (this.listaDeBrinquedos = [
        "RATO",
        "BOLA",
        "LASER",
        "CAIXA",
        "NOVELO",
        "SKATE",
      ]);
  }

  encontraPessoas(
    brinquedosPessoa1 = "",
    brinquedosPessoa2 = "",
    ordemAnimais = ""
  ) {
    const brinquedos1 = brinquedosPessoa1
      .split(",")
      .map((brinquedo) => brinquedo.trim().toUpperCase());
    const brinquedos2 = brinquedosPessoa2
      .split(",")
      .map((brinquedo) => brinquedo.trim().toUpperCase());
    const animaisParaBusca = ordemAnimais
      .split(",")
      .map(
        (animal) =>
          animal.charAt(0).toUpperCase() + animal.slice(1).toLowerCase()
      );

    const brinquedoInvalido =
      this.verificarSeBrinquedoInvalido(brinquedos1) ||
      this.verificarSeBrinquedoInvalido(brinquedos2);

    if (brinquedoInvalido) {
      return { erro: "Brinquedo inválido" };
    }

    const animalInvalido = this.verificarSeAnimalInvalido(animaisParaBusca);

    if (animalInvalido) {
      return { erro: "Animal inválido" };
    }

    let quantidadeDeAnimaisAdotadosDaPessoa1 = 0;
    let quantidadeDeAnimaisAdotadosDaPessoa2 = 0;
    const brinquedosUsadosPessoa1 = [];
    const brinquedosUsadosPessoa2 = [];
    const listaResultadoFinal = [];

    for (const nomeAnimal of animaisParaBusca) {
      let primeiraPessoaQualificada;
      let segundaPessoaQualificada;

      const animal = this.animaisNoRecinto[nomeAnimal];
      if (nomeAnimal === "Loco") {
        primeiraPessoaQualificada =
          quantidadeDeAnimaisAdotadosDaPessoa1 < 3 &&
          this.verificarOrdemDosBrinquedos(
            brinquedos1,
            animal.brinquedos,
            quantidadeDeAnimaisAdotadosDaPessoa1 > 0
          );
        segundaPessoaQualificada =
          quantidadeDeAnimaisAdotadosDaPessoa2 < 3 &&
          this.verificarOrdemDosBrinquedos(
            brinquedos2,
            animal.brinquedos,
            quantidadeDeAnimaisAdotadosDaPessoa2 > 0
          );
      } else {
        primeiraPessoaQualificada =
          quantidadeDeAnimaisAdotadosDaPessoa1 < 3 &&
          this.verificarOrdemDosBrinquedos(brinquedos1, animal.brinquedos);
        segundaPessoaQualificada =
          quantidadeDeAnimaisAdotadosDaPessoa2 < 3 &&
          this.verificarOrdemDosBrinquedos(brinquedos2, animal.brinquedos);
      }

      let destino = `${nomeAnimal} - abrigo`;

      if (primeiraPessoaQualificada && !segundaPessoaQualificada) {
        const brinquedosJaUsados = animal.brinquedos.some((brinquedo) => {
          return brinquedosUsadosPessoa1.includes(brinquedo);
        });

        if (animal.especie === "gato" && brinquedosJaUsados) {
          primeiraPessoaQualificada = false;
        } else {
          destino = `${nomeAnimal} - pessoa 1`;
          quantidadeDeAnimaisAdotadosDaPessoa1++;
          brinquedosUsadosPessoa1.push(...animal.brinquedos);
        }
      } else if (!primeiraPessoaQualificada && segundaPessoaQualificada) {
        const brinquedosJaUsados = animal.brinquedos.some((brinquedo) => {
          return brinquedosUsadosPessoa2.includes(brinquedo);
        });

        if (animal.especie === "gato" && brinquedosJaUsados) {
          segundaPessoaQualificada = false;
        } else {
          destino = `${nomeAnimal} - pessoa 2`;
          quantidadeDeAnimaisAdotadosDaPessoa2++;
          brinquedosUsadosPessoa2.push(...animal.brinquedos);
        }
      }

      listaResultadoFinal.push(destino);
    }

    const listaOrdenada = listaResultadoFinal.sort((a, b) => {
      return a.localeCompare(b);
    });

    return {
      lista: listaOrdenada,
    };
  }

  verificarSeBrinquedoInvalido(brinquedos = []) {
    const existeBrinquedo = brinquedos.every((brinquedo) =>
      this.listaDeBrinquedos.includes(brinquedo)
    );

    const brinquedosParaBuscaSemDuplicacao = new Set(brinquedos);
    const existeDuplicado =
      brinquedos.length !== brinquedosParaBuscaSemDuplicacao.size;

    return !existeBrinquedo || existeDuplicado;
  }

  verificarSeAnimalInvalido(animaisParaBusca = []) {
    const existeAnimal = animaisParaBusca.every((animal) =>
      Object.keys(this.animaisNoRecinto).includes(animal)
    );

    const animaisParaBuscaSemDuplicacao = new Set(animaisParaBusca);
    const existeDuplicado =
      animaisParaBusca.length !== animaisParaBuscaSemDuplicacao.size;

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
