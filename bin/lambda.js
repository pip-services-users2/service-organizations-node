let OrganizationsLambdaFunction = require('../obj/src/container/OrganizationsLambdaFunction').OrganizationsLambdaFunction;

module.exports = new OrganizationsLambdaFunction().getHandler();