var sinon = require('sinon');

// this is the javascript file that is under test
var jsFile = '../../../proxies/mock-target/apiproxy/resources/jsc/JS-TestScript.js';

global.context = {
	getVariable: function(s) {},
	setVariable: function(s) {}
};

var contextGetVariableMethod, contextSetVariableMethod;

// This method will execute before every it() method in the test
// we are stubbing all Apigee objects and the methods we need here
beforeEach(function () {
	contextGetVariableMethod = sinon.stub(context, 'getVariable');
	contextSetVariableMethod = sinon.stub(context, 'setVariable');
});

// restore all stubbed methods back to their original implementation
afterEach(function() {
	contextGetVariableMethod.restore();
	contextSetVariableMethod.restore();
});

// this is the custom test feature here
describe('feature: combin org anf env name', function() {
	it('should combine org name and env name', function(){
        contextGetVariableMethod.withArgs('organization.name').returns('org1');
        contextGetVariableMethod.withArgs('environment.name').returns('env1');

        require(jsFile);

        sinon.assert.calledWith(contextSetVariableMethod, "test.variable", 'org1-env1')
    });
});