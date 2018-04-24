const path = require( 'path' );

const AbstractBaseRole = require( '../Base.js');

class ServicesRole extends AbstractBaseRole {
    modifySetup( dockerComposeSetup, setupVars) {
        var dockerComposeConfig = this.extendObjectWithYaml( dockerComposeSetup, path.join( __dirname, 'docker-compose-build.yml' ) );
        return this.transformCompose(dockerComposeConfig, setupVars);

    }
    modifyServices( dockerCompose, setupVars) {
        var dockerComposeConfig = this.extendObjectWithYaml( dockerCompose, path.join( __dirname, 'docker-compose.yml' ) );
        return this.transformCompose(dockerComposeConfig, setupVars);

    }

    transformCompose(dockerComposeConfig, setupVars){
        dockerComposeConfig.version = setupVars.serviceVersion;
        dockerComposeConfig.services.wikibase.ports = [setupVars.dockerPort + ':80'];
        return dockerComposeConfig;

    }
    // TODO copy Localsettings and other files from https://github.com/addshore/mediawiki-dev-tools, maybe even bootstrap the whole thing here
}

module.exports = ServicesRole
