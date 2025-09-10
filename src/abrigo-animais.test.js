import { AbrigoAnimais } from "./abrigo-animais";

describe("Abrigo de Animais", () => {
  test("Deve rejeitar animal inválido", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "CAIXA,RATO",
      "RATO,BOLA",
      "Lulu"
    );
    expect(resultado.erro).toBe("Animal inválido");
    expect(resultado.lista).toBeFalsy();
  });

  test("Deve encontrar pessoa para um animal", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA",
      "RATO,NOVELO",
      "Rex,Fofo"
    );

    expect(resultado.lista[0]).toBe("Fofo - abrigo");
    expect(resultado.lista[1]).toBe("Rex - pessoa 1");
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test("Deve encontrar pessoa para um animal intercalando brinquedos", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "BOLA,LASER",
      "BOLA,NOVELO,RATO,LASER",
      "Mimi,Fofo,Rex,Bola"
    );

    expect(resultado.lista[1]).toBe("Fofo - pessoa 2");
    expect(resultado.lista[2]).toBe("Mimi - abrigo");
    expect(resultado.lista[3]).toBe("Rex - abrigo");
    expect(resultado.lista.length).toBe(4);
    expect(resultado.erro).toBeFalsy();
  });

  test("Deve rejeitar brinquedo inválido", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "CAIXA,RATO",
      "RATO,BOLA,CAMA",
      "Mimi"
    );
    expect(resultado.erro).toBe("Brinquedo inválido");
    expect(resultado.lista).toBeFalsy();
  });

  test("Deve adotar somente 1 gato quando brinquedos já usados", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA",
      "BOLA,RATO,LASER",
      "Mimi,Fofo"
    );
    expect(resultado.lista[0]).toBe("Fofo - abrigo");
    expect(resultado.lista[1]).toBe("Mimi - pessoa 2");
  });

  test("Deve adotar Rex e Loco mesmo com a ordem dos brinquedos alterados", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA,SKATE",
      "BOLA,RATO",
      "Rex,Loco"
    );
    expect(resultado.lista[0]).toBe("Loco - pessoa 1");
    expect(resultado.lista[1]).toBe("Rex - pessoa 1");
  });

  test("Deve adotar Loco respeitando a ordem dos brinquedos", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA,SKATE",
      "SKATE,RATO",
      "Loco"
    );
    expect(resultado.lista[0]).toBe("Loco - pessoa 2");
  });

  test("Deve deixar Loco no abrigo se a ordem dos brinquedos não estiver correta", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA,SKATE",
      "RATO,SKATE",
      "Loco"
    );
    expect(resultado.lista[0]).toBe("Loco - abrigo");
  });

  test("Deve respeitar limite de 3 animais por pessoa mesmo qualificadas para mais animais", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "CAIXA,NOVELO,LASER,RATO,SKATE,BOLA",
      "BOLA,LASER",
      "Bola,Mimi,Fofo,Zero,Loco,Bebe,Rex"
    );

    expect(resultado.lista[0]).toBe("Bebe - abrigo");
    expect(resultado.lista[1]).toBe("Bola - pessoa 1");
    expect(resultado.lista[2]).toBe("Fofo - abrigo");
    expect(resultado.lista[3]).toBe("Loco - pessoa 1");
    expect(resultado.lista[4]).toBe("Mimi - pessoa 2");
    expect(resultado.lista[5]).toBe("Rex - abrigo");
    expect(resultado.lista[6]).toBe("Zero - pessoa 1");
  });

  test("Deve deixar animal no abrigo se ambos estiverem qualificados", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "BOLA,RATO,LASER",
      "BOLA,LASER",
      "Mimi"
    );
    expect(resultado.lista[0]).toBe("Mimi - abrigo");
  });

  test("Deve funcionar normalmente mesmo com letras minúsculas", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "bola,rato,laser",
      "skate,rato",
      "mimi,loco"
    );
    expect(resultado.lista[0]).toBe("Loco - pessoa 2");
    expect(resultado.lista[1]).toBe("Mimi - pessoa 1");
  });

  test("Deve funcionar normalmente mesmo com letras maiúscula", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "BOLA,RATO,LASER",
      "SKATE,RATO",
      "MIMI,LOCO"
    );
    expect(resultado.lista[0]).toBe("Loco - pessoa 2");
    expect(resultado.lista[1]).toBe("Mimi - pessoa 1");
  });
});
