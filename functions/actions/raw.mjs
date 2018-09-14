import getWhereString from './getWhereString.mjs'
import getOrderByString from './getOrderByString.mjs'
import getSelectStringOfJoinedTable from './getSelectStringOfJoinedTable.mjs'
import getJoinStringOfJoinedTables from './getJoinStringOfJoinedTables.mjs'



export default async ( query, options ) => {

  if ( !query ) throw new Error( 'provide query for raw action' )


  let {
    
    manualMode = false,
    strictMode = true,
    actionTypes,

    connection = null,
    connectionPool = null,
    getConnectionFromConnectionPool,
    executeQuery

  } = options

  if ( !connection ) {
    connection = await getConnectionFromConnectionPool( connectionPool )
  } else {
    manualMode = true
  }


  const result = await executeQuery( { connection, manualMode, actionTypes, actionType: actionTypes.RAW, query } )

  return result

}