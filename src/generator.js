const yaml = require( 'js-yaml' );
const fs   = require( 'fs' );
const path = require( 'path' );
const mkdirp = require( 'mkdirp' );

class EnvironmentGenerator {

    /**
     * @param {Map} availableRoles [description]
     */
    constructor( availableRoles ) {
        this.availableRoles = availableRoles
    }

    generateService (config) {
        let { dockerComposeSetup, dockerCompose, files } = this.init(config);

        return { dockerComposeSetup, dockerCompose, files };

    }
    
    generate( config ) {
        let { dockerComposeSetup, dockerCompose, files } = this.generateService(config);

        // TODO: If roles have dependencies, toggle roles that are deactivated but depended on

        for ( let role of Object.keys( config.roles ) ) {
            if ( !config.roles[ role ] ) {
                continue;
            }
            if ( !this.availableRoles.has( role ) ) {
                throw new Error( 'Unknown role:' + role );
            }

            if (role !== 'services') {
                let currentRole = this.availableRoles.get( role );
                dockerComposeSetup = currentRole.modifySetup( dockerComposeSetup);
                dockerCompose = currentRole.modifyServices( dockerCompose );
                currentRole.modifyFiles( files, dockerCompose, dockerComposeSetup );    
            }
        }

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

    }

    init(config) {
        const services = this.availableRoles.get( 'services' );
        const dockerComposeSetup = services.modifySetup( {}, config );
        const dockerCompose = services.modifyServices( {}, config);
        const files = new Map();
        services.modifyFiles( files, dockerCompose, dockerComposeSetup );
        return { dockerComposeSetup, dockerCompose, files };
    }

}

module.exports = EnvironmentGenerator;
