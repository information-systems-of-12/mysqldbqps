import mysql from 'mysql'

import createConnectionPool from './createConnectionPool.mjs'
import getConnectionFromConnectionPool from './getConnectionFromConnectionPool.mjs'

import executeQuery from './executeQuery.mjs'
import getTableWrappers from './getTableWrappers.mjs'

import select from './actions/select.mjs'
import insert from './actions/insert.mjs'
import update from './actions/update.mjs'
import delete_ from './actions/delete.mjs'

import { TYPES, DEVELOPMENT_NODE_ENV, STAGING_NODE_ENV, PRODUCTION_NODE_ENV } from './constants.mjs'


export default async parameters => {


  try {

    const { configuration } = parameters
    const {
      HOSTNAME,
      PORT,
      USER,
      PASSWORD,
      DATABASE
    } = configuration

    const NODE_ENV = process.env.NODE_ENV

    const constants = Object.assign( { TYPES, NODE_ENV, DEVELOPMENT_NODE_ENV, STAGING_NODE_ENV, PRODUCTION_NODE_ENV }, configuration )

    

    const connectionPool = createConnectionPool( { mysql, constants } )
    
    const tableWrappers = await getTableWrappers( {
      
      constants,

      connectionPool,
      getConnectionFromConnectionPool,

      // actionTypes,
      // joinTypes,
      // orderTypes,

      // signs,
      // modes,
      
      executeQuery

    } )



    return {
      
      constants,
      // actionTypes,
      // orderTypes,
      // joinTypes,

      // signs,
      // modes,

      tableWrappers,

      actions: {

        getConnectionFromConnectionPool: async () => await getConnectionFromConnectionPool( connectionPool ),
        
        select: async ( tableWrapper, _parameters ) => await select(

          tableWrapper,
          Object.assign( _parameters, {

            constants,

            connectionPool,
            getConnectionFromConnectionPool,

            actionTypes: constants.TYPES.ACTIONS,
            joinTypes: constants.TYPES.JOIN,
            orderTypes: constants.TYPES.ORDER,
            signTypes: constants.TYPES.SIGNS,
  
            
            executeQuery,

            tableWrappers

          }

        ) ),



        insert: async ( tableWrapper, _parameters ) => await insert(
          
          tableWrapper,
          Object.assign( _parameters, {

            constants,
            
            connectionPool,
            getConnectionFromConnectionPool,

            actionTypes: constants.TYPES.ACTIONS,

            executeQuery,
            
            tableWrappers,
            

          }
        ) ),



        update: async ( tableWrapper, _parameters ) => await update(
          tableWrapper,
          Object.assign( _parameters, {
            
            constants,
            
            connectionPool,
            getConnectionFromConnectionPool,

            actionTypes: constants.TYPES.ACTIONS,

            executeQuery,
            
            tableWrappers,
            

          } )
        ),

        delete: async ( tableWrapper, _parameters ) => await delete_(
          tableWrapper,
          Object.assign( _parameters, {
            
            constants,
            
            connectionPool,
            getConnectionFromConnectionPool,

            actionTypes: constants.TYPES.ACTIONS,

            executeQuery,
            
            tableWrappers,
            

          } )
        )




      }
      
    }
    


    
  } catch ( error ) {
    
    throw error

  }


}