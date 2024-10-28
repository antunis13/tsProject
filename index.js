"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const readline = require("node:readline");
const rl = readline.createInterface({
    // permite que o TS interaja com o terminal
    input: process.stdin,
    output: process.stdout,
});
function input(prompt) {
    // uma promessa que espera um valor numérico ser digitado para continuar
    return new Promise((resolve) => {
        rl.question(prompt, (res) => {
            // Remover pontos que separam milhares e trocar vírgula por ponto para tratar números decimais
            res = res.replace(/\./g, "").replace(",", ".");
            const value = parseFloat(res);
            if (isNaN(value)) {
                // validação para garantir que um número válido foi inserido
                console.log("Por favor, insira um número válido.");
                resolve(input(prompt)); // repete a pergunta se a entrada for inválida
            }
            else {
                resolve(value);
            }
        });
    });
}
function inputString(prompt) {
    // uma promessa que espera uma resposta em string
    return new Promise((resolve) => {
        rl.question(prompt, (res) => {
            resolve(res);
        });
    });
}
function calcularImposto(baseCalculo) {
    // função que calcula o imposto com base na renda e deduções
    let imposto = 0;
    if (baseCalculo <= 27110.4) {
        return 0; // isento
    }
    if (baseCalculo > 27110.4 && baseCalculo <= 33919.8) {
        imposto += (baseCalculo - 27110.4) * 0.075;
    }
    else if (baseCalculo > 33919.8 && baseCalculo <= 45012.6) {
        imposto += (33919.8 - 27110.4) * 0.075;
        imposto += (baseCalculo - 33919.8) * 0.15;
    }
    else if (baseCalculo > 45012.6 && baseCalculo <= 55976.16) {
        imposto += (33919.8 - 27110.4) * 0.075;
        imposto += (45012.6 - 33919.8) * 0.15;
        imposto += (baseCalculo - 45012.6) * 0.225;
    }
    else if (baseCalculo > 55976.16) {
        imposto += (33919.8 - 27110.4) * 0.075;
        imposto += (45012.6 - 33919.8) * 0.15;
        imposto += (55976.16 - 45012.6) * 0.225;
        imposto += (baseCalculo - 55976.16) * 0.275;
    }
    return imposto;
}
function formatNumber(value) {
    // Função para formatar números com separador de milhar e duas casas decimais
    return value.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}
const impostoDeRenda = () => __awaiter(void 0, void 0, void 0, function* () {
    // procedimento que calcula o imposto de renda
    let continuar = "sim";
    while (continuar.toLowerCase() === "sim") {
        // loop que é ativado enquanto a resposta for 'sim'
        let rendaBrutaAnual = yield input("Renda bruta anual: ");
        let dependentes = yield input("Número de dependentes: ");
        let outrosGastos = yield input("Outros gastos: ");
        let valDependentes = dependentes * 2275; // valor dedutível por dependente
        console.log("Dependentes: R$", formatNumber(valDependentes)); // usa a função de formatação para exibir o valor correto
        let totalDeducao = outrosGastos + valDependentes; // soma total de deduções
        console.log("Total Dedução: R$", formatNumber(totalDeducao));
        let baseCalculo = rendaBrutaAnual - totalDeducao; // renda após deduções
        console.log("Base de Cálculo: R$", formatNumber(baseCalculo));
        let imposto = calcularImposto(baseCalculo); // cálculo do imposto
        if (imposto === 0) {
            console.log("Isento de pagar o imposto");
        }
        else {
            console.log("Imposto a ser pago: R$", formatNumber(imposto)); // formatação correta do imposto a pagar
        }
        continuar = yield inputString("Deseja calcular o imposto para outra pessoa? (sim/não): "); // pergunta se o loop continua
    }
    rl.close(); // fecha o readline quando o loop termina
});
impostoDeRenda();
