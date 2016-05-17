module.exports = require('polymer-js')({
    is: 'tn-element',
    properties: {
        myName: {
            type: String
        }
    },
    ready: function() {
        this.textContent = 'Hi! My name is ' + this.myName;
    }
});