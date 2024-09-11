function interpretaExpressCrono(cronExpression) {
    const cronParts = cronExpression.split(' ');

    if (cronParts.length !== 6) {
        return "A expressão cron deve ter 6 campos (segundo, minuto, hora, dia do mês, mês, dia da semana)";
    }

    const [second, minute, hour, dayOfMonth, month, dayOfWeek] = cronParts;

    const timeDescriptions = {
        second: interpretPart(second, "segundo"),
        minute: interpretPart(minute, "minuto"),
        hour: interpretPart(hour, "hora"),
        dayOfMonth: interpretPart(dayOfMonth, "do mês"),
        month: interpretPart(month, "mês"),
        dayOfWeek: interpretPart(dayOfWeek, "dia da semana")
    };

    return `
        A tarefa será executada:
        - No segundo: ${timeDescriptions.second}
        - No minuto: ${timeDescriptions.minute}
        - Na hora: ${timeDescriptions.hour}
        - No dia: ${timeDescriptions.dayOfMonth}
        - No mês: ${timeDescriptions.month}
        - No dia da semana: ${timeDescriptions.dayOfWeek}
    `;
}

function interpretPart(part, unit) {
    if (part === "*") {
        return `todo(s) ${unit}(s)`;
    } else if (part.includes("/")) {
        const [start, interval] = part.split("/");
        if (start === "*") {
            return `a cada ${interval} ${unit}(s)`;
        } else {
            return `começando em ${start}, a cada ${interval} ${unit}(s)`;
        }
    } else if (part.includes("-")) {
        const [start, end] = part.split("-");
        return `de ${start} até ${end} ${unit}(s)`;
    } else if (part.includes(",")) {
        const values = part.split(",").join(", ");
        return `nos ${unit}(s) ${values}`;
    } else if (part === "?") {
        return `ignorando o ${unit}`;
    } else {
        return `no ${unit} ${part}`;
    }
}

document.getElementById('cronForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const cronExpression = document.getElementById('cronExpression').value;
    const result = interpretaExpressCrono(cronExpression);
    document.getElementById('result').innerHTML = result;
});