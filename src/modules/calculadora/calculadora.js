export function comandoCalculadora(interaction, operation) {
        if (!interaction.isCommand()) return 
        
        const resultado = Calculadora(
            interaction.options.getNumber("n1"),
            interaction.options.getNumber("n2"),
            operation,
        );

        return interaction.reply(`${resultado}`);
}

function Calculadora(number1, number2, operation) {
    switch (operation) {
        case 'somar':
            return number1 + number2;
        case 'multiplicar':
            return number1 * number2;
        default:
            throw new Error('Operação inválida');
    }
}