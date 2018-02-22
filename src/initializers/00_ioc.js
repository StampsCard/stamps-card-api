/**
 * Module dependencies.
 */
const ioc = require('electrolyte');

/**
 * Initialize IoC container.
 *
 * The IoC loader needs to be configured with the location where components
 * are found.  In this case, components are split accross two directories.
 *
 * Route handlers are implemented as components, and located in `app/handlers`.
 *
 * All other components (including database connections, logging facilities,
 * etc.) are located in `app/components`.
 */
module.exports = () => {
    ioc.use(ioc.dir('src/components'));
    ioc.use(ioc.node_modules());
    return ioc;
};
