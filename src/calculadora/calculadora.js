export function Calculadora (number1, number2, operation) {
    switch (operation) {
        case 'somar':
            return number1 + number2;
        case 'multiplicar':
            return number1 * number2;
        default:
            throw new Error('Operação inválida');
    }
}