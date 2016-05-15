exports.config = {
    capabilities: {
        'browserName': 'chrome'
    },
    seleniumServerJar: './node_modules/protractor/selenium/selenium-server-standalone-2.52.0.jar',
    seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
    directConnect: false,
    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true, // Use colors in the command line report.
    },
    specs: ['./**/*-spec.js']
};