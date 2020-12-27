try {
    var organization = context.getVariable("organization.name");
    var environment = context.getVariable("environment.name");

    var test = organization + "-" + environment;

    context.setVariable("test.variable", test);
} catch(e){}