const varProcessor = {
    process(template, data, regexResult) {
        let name = regexResult[2].split(':')[1];
        if (data.vars[name]) {
            template = template.replace(regexResult[0], data.vars[name]);
        }
        return template;
    }
}

const dateProcessor = {
    process(template, data, regexResult) {
        let name = regexResult[2].split(':')[1];
        if (data.vars[name]) {
            let date = new Date(data.vars[name]);
            let year = date.getFullYear();
            let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
            let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

            template = template.replace(regexResult[0], `${year}-${month}-${day}`);
        }
        return template;
    }
}

const processorByType = {
    var: varProcessor,
    date: dateProcessor
}

module.exports = {
    processorByType
}
