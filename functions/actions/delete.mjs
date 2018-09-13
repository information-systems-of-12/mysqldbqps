import getWhereString from './getWhereString.mjs'
import getOrderByString from './getOrderByString.mjs'

export default async ( tableWrapper, options ) => {


  try {
    // debugger
    if ( !tableWrapper || tableWrapper === {} ) throw new Error( 'provide table wrapper for delete action' )
    if ( !options || options === {} ) throw new Error( 'provide options for delete action' )


    let {
    
      manualMode = false,
      strictMode = true,
  
      connection = null,
      connectionPool = null,
      getConnectionFromConnectionPool,
      tableWrappers,
      
  
      where = null,
      orderBy = null,
  
      executeQuery,
      prepareQueryString,
  
      actionTypes,
      joinTypes,
      signs,
  
      limitOne,
      
      
      tables = [],
      
      particularColumns = [],
      customWhereString = null,
      customOrderString = null,
      limit = 1,
      distinct = false
  
    } = options
  
  
    const tableName = tableWrapper.tableName
    const columns = tableWrapper.columnNames

    let joinModeIsUsing = false
  
    if ( tables && tables.length ) {
      joinModeIsUsing = true
    }

    if ( !connection ) {
      connection = await getConnectionFromConnectionPool( connectionPool )
    } else {
      manualMode = true
    }

    let whereString = ''
    let orderByString = ''

    if ( where ){
      whereString = getWhereString( connection, tableName, where, strictMode, joinModeIsUsing )
    }

    // debugger

    if ( orderBy ){
      orderByString = getOrderByString( connection, tableName, orderBy, strictMode )
    }



    const query = `
      DELETE * FROM ${ tableName }
      ${ customWhereString ? customWhereString : '' }
      ${ whereString !== '' && !customWhereString ? `WHERE ${ whereString }` : '' }
      ${ !limit ? 'LIMIT 1' : `LIMIT ${ limit }` }
    `
    const results = await executeQuery( { connection, manualMode, actionTypes, actionType: actionTypes.DELETE, prepareQueryString, query } )

    // if ( limit === 1 && !page ){

    //   return results[ 0 ]
  
    // } else {
  
    //   return results
  
    // }
    return results

  } catch ( error ){
    throw error
  }
}