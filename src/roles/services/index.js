const path = require( 'path' );

const AbstractBaseRole = require( '../Base.js');

class ServicesRole extends AbstractBaseRole {
    modifySetup( dockerComposeSetup, port ) {
        console.log(port);
        return this.extendObjectWithYaml( dockerComposeSetup, path.join( __dirname, 'docker-compose-build.yml' ) );
    }
    modifyServices( dockerCompose, port ) {
        console.log(dockerCompose);
        return this.extendObjectWithYaml( dockerCompose, path.join( __dirname, 'docker-compose.yml' ) );
    }

    // TODO copy Localsettings and other files from https://github.com/addshore/mediawiki-dev-tools, maybe even bootstrap the whole thing here
}

module.exports = ServicesRole
