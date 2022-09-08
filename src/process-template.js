const processorByType = require('./processors').processorByType;

function processTemplate(template, data) {
    let regex = new RegExp(/(\{\{)(.*?)(\}\})/, 'g');
    let resultTemplate = template;

    while ((regexResult = regex.exec(template)) !== null) {
        let tokens = regexResult[2].split(':');
        let processor = processorByType[tokens[0]];

        if (tokens.length !== 2 || tokens[0] === '' || tokens[1] === '') throw Error('Incorrect token format. Provide {{type:variableName}}.');
        if (!data.vars[tokens[1]]) throw new Error('Variables have not been provided')
        if (!processor) throw Error('Unsupported processor type');

        resultTemplate = processor.process(resultTemplate, data, regexResult);
    }

    return resultTemplate;
}

module.exports = {
    processTemplate
}
