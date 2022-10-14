import Cpf from "../src/domain/Cpf";

const validCPFs = [
    '24511676020',
    '111.444.777-35'
];

test.each(validCPFs)("Deve validar CPF", function(validCpf){
    const cpf = new Cpf(validCpf);
    expect(cpf).toBeDefined();
});

test("CPF com número inválido", function(){
    expect(() => new Cpf('12345678901')).toThrow(new Error("CPF inválido."));
})

test("CPF vazio", function(){
    expect(() => new Cpf("")).toThrow(new Error("CPF inválido."));
});

test("CPF com tamanho menor que o mínimo", function(){
    expect(() => new Cpf('1234567890')).toThrow(new Error("CPF inválido."));
});

test("CPF com tamanho maior que o máximo", function(){
    expect(() => new Cpf('123456789012345')).toThrow(new Error("CPF inválido."));
});

test("CPF com todos os números iguais", function(){
    expect(() => new Cpf('00000000000')).toThrow(new Error("CPF inválido."));
});

test("CPF com letras", function(){
    expect(() => new Cpf('BBBBBBBBBBB')).toThrow(new Error("CPF inválido."));
});