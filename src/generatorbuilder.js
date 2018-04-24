const EnvironmentGenerator = require( './generator' );
const MySqlRole = require( './roles/mysql' );
const WikidataQueryServiceFrontendRole = require( './roles/wdqs-frontend' );
const WikidataQueryServiceRole = require( './roles/wdqs' );
const WikidataQueryServiceProxyRole = require( './roles/wdqs-proxy' );
const WikidataQueryServiceUpdaterRole = require( './roles/wdqs-updater' );
const VolumesRole = require( './roles/volumes' );
const ServicesRole = require( './roles/services' );

function build() {
    const roles = new Map();
    roles.set( 'mysql', new MySqlRole() );
    roles.set( 'wdqs-frontend', new WikidataQueryServiceFrontendRole() );
    roles.set( 'wdqs', new WikidataQueryServiceRole() );
    roles.set( 'wdqs-proxy', new WikidataQueryServiceProxyRole() );
    roles.set( 'wdqs-updater', new WikidataQueryServiceUpdaterRole() );
    roles.set( 'volumes', new VolumesRole() );
    roles.set( 'services', new ServicesRole() );
    return generator = new EnvironmentGenerator( roles );
}

module.exports = {
    build
};
