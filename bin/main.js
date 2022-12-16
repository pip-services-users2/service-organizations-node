let OrganizationsProcess = require('../obj/src/container/OrganizationsProcess').OrganizationsProcess;

try {
    new OrganizationsProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}
