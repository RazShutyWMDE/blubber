const yaml = require( 'js-yaml' );
const fs   = require( 'fs' );
const path = require( 'path' );
const mkdirp = require( 'mkdirp' );

const files = new Map();

class EnvironmentGenerator {

    /**
     * @param {Map} availableRoles [description]
     */
    constructor( availableRoles ) {
        this.availableRoles = availableRoles
    }

    generate( config, role, service ) {
        let { dockerComposeSetup, dockerCompose, files } = this.init(config);
        let currentRole = this.availableRoles.get( role );
        dockerComposeSetup = currentRole.modifySetup( dockerComposeSetup, config);
        dockerCompose = currentRole.modifyServices( dockerCompose, config );
        currentRole.modifyFiles( files, dockerCompose, dockerComposeSetup );
    }

    init(config) {
        const services = this.availableRoles.get( 'services' );
        const dockerComposeSetup = services.modifySetup( {}, config );
        const dockerCompose = services.modifyServices( {}, config);
        services.modifyFiles( files, dockerCompose, dockerComposeSetup );

        const destinationRoot = config.outputDir || path.dirname( __dirname );

        mkdirp( destinationRoot, () => {
            fs.writeFileSync(
                path.join( destinationRoot, 'docker-compose-build.yml' ),
                yaml.safeDump( dockerComposeSetup )
            );
            fs.writeFileSync(
                path.join( destinationRoot, 'docker-compose.yml' ),
                yaml.safeDump( dockerCompose )
            );
        } );

        files.forEach( ( src, dest ) => {
            const finalDestination = path.join( destinationRoot, dest );
            mkdirp( path.dirname( finalDestination ), () => {
                fs.copyFileSync( src, finalDestination );
            } );
        } )

        return { dockerComposeSetup, dockerCompose, files };
    }

}

module.exports = EnvironmentGenerator;
