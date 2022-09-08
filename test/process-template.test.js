const { expect, assert } = require('chai');
const processTemplate = require('../src/process-template').processTemplate;

describe('processTemplate', () => {
    describe('processTemplate with valid input', () => {
        const cases = [
            {
                input: {
                    template: 'My name is {{var:name}}. I drink {{var:drink}}.',
                    data: {
                        vars: {
                            name: 'Olek',
                            drink: 'coffee'
                        }
                    }
                },
                expected: 'My name is Olek. I drink coffee.'
            },
            {
                input: {
                    template: 'My name is {{var:name}}. I drink {{var:drink}}. The date {{date:today}} is the date when this test was created.',
                    data: {
                        vars: {
                            name: "Olek",
                            drink: "coffee",
                            today: 1662668899123
                        }
                    }
                },
                expected: 'My name is Olek. I drink coffee. The date 2022-09-08 is the date when this test was created.'
            },
            {
                input: {
                    template: 'I drink {{var:drink}}. My name is {{var:name}}. Did I mentioned that I drink {{var:drink}}?',
                    data: {
                        vars: {
                            name: 'Olek',
                            drink: 'coffee'
                        }
                    }
                },
                expected: 'I drink coffee. My name is Olek. Did I mentioned that I drink coffee?'
            },
        ];
        for (let { input, expected } of cases) {
            it(`should return: ${expected} given arguments: ${JSON.stringify(input)}`, () => {
                const actual = processTemplate(input.template, input.data);
                expect(actual).to.be.eql(expected);
            })
        }
    })

    describe('processTemplate with invalid input', () => {
        const cases = [
            {
                input: {
                    template: 'I drink {{}}.',
                    data: {
                        vars: {
                            drink: "coffee",
                        }
                    }
                },
            },
            {
                input: {
                    template: 'I drink {{incorrectFormat}}.',
                    data: {
                        vars: {
                            drink: "coffee",
                        }
                    }
                },
            },
            {
                input: {
                    template: 'I drink {{unsupportedType:drink}}.',
                    data: {
                        vars: {
                            drink: "coffee",
                        }
                    }
                },
            },
            {
                input: {
                    template: 'I drink {{:drink}}.',
                    data: {
                        vars: {
                            drink: "coffee",
                        }
                    }
                },
            },
            {
                input: {
                    template: 'I drink {{var:}}.',
                    data: {
                        vars: {
                            drink: "coffee",
                        }
                    }
                },
            },
            {
                input: {
                    template: 'I drink {{var:notWithinVars}}.',
                    data: {
                        vars: {
                            drink: "coffee",
                        }
                    }
                },
            },
        ];
        for (let { input } of cases) {
            it(`should throw error given arguments: ${JSON.stringify(input)}`, () => {
                assert.throws(
                    () => processTemplate(input.template, input.data),
                );
            })
        }
    })
});
