export function isRequired(parameter){
    throw new Error(`${parameter} é um parâmetro obrigatório`);
}