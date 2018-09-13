import getJoinStringOfJoinedTablesToUpdate from './getJoinStringOfJoinedTablesToUpdate.mjs'
import getSetString from './getSetString.mjs'
import getWhereString from './getWhereString.mjs'

export default async ( tableWrapper, options ) => {


  try {
    // debugger
    if ( !tableWrapper || tableWrapper === {} ) throw new Error( 'provide table wrapper for select action' )
    if ( !options || options === {} ) throw new Error( 'provide options for select action' )

    let {
      
      
      manualMode = false,
      strictMode = true,

      linkType = 'forward',
  
      connection = null,
      connectionPool = null,
      getConnectionFromConnectionPool,
      tableWrappers,
  
      executeQuery,
      prepareQueryString,
      actionTypes,
      joinTypes,
      signs,
      
      limitOne,

      value = null,
      values = null,

      where = false,
      customWhereString = false,
      
      tables = [],
      
    } = options





    // let manualMode = false
    
    // if ( !connection ) connection = await getConnectionFromConnectionPool( connectionPool )
    // else manualMode = true

    // debugger

    const tableName = tableWrapper.tableName
    // debugger

    let joinModeIsUsing = false
    
    if ( tables && tables.length ) {
      joinModeIsUsing = true
    }
    // debugger
  
    if ( !connection ) {
      connection = await getConnectionFromConnectionPool( connectionPool )
    } else {
      manualMode = true
    }
    // debugger

    let whereString = ''

    // debugger
  
    if ( where ){
      whereString = getWhereString( connection, tableName, where, strictMode )
    }

    // debugger

    let updateMany = false
    // debugger


    if ( values ){
      updateMany = true
    } else if ( value ) {
      updateMany = false
    }

    // debugger

    // UPDATE event
    
    // INNER JOIN locale ON locale.id = event.localeId
  
    // SET
    //   event.yearContentId = COALESCE( :yearContentId, event.yearContentId ),
    //   event.distance = COALESCE( :distance, event.distance ),
    //   event.timeStart = COALESCE( :timeStart, event.timeStart ),
    //   event.isFinished = COALESCE( :isFinished, event.isFinished ),
    //   event.resultsIsAvailable = COALESCE( :resultsIsAvailable, event.resultsIsAvailable ),
    //   event.routeDocumentFSPath = COALESCE( :routeDocumentFSPath, event.routeDocumentFSPath ),
      
    //   locale.field = COALESCE( :field, locale.field ),
    //   locale.english = COALESCE( :englishLocale, locale.english ),
    //   locale.russian = COALESCE( :russianLocale, locale.russian )
    
    // WHERE event.id = :id
    

    let joinStringOfJoinedTables = ''

    let setString = ''

    let joinStringOfJoinedTablesToUpdate = ''

    if ( joinModeIsUsing ){
      
      // debugger

      joinStringOfJoinedTablesToUpdate = getJoinStringOfJoinedTablesToUpdate( tables )

      // const tables = [ tableWrapper, ...tables ]

      const setStringTables = [ { tableName, value } ]

      for ( const t of tables ){
        setStringTables.push( { 
          tableName: linkType === 'forward' ? t.referencingTable : t.referencedTableName,
          value: t.value
        } )
      }



      const setStringArray = []

      for ( const t of setStringTables ){

        setStringArray.push( getSetString( connection, t.tableName, t.value ) )

      }

      setString = setStringArray.join( ',' )
      // debugger
      

    } else {

      setString = getSetString( connection, tableName, value )
      // debugger


    }




    // debugger
     

    const query = `

      UPDATE ${ tableName }
      ${ joinStringOfJoinedTablesToUpdate === false ? '' : joinStringOfJoinedTablesToUpdate }


      SET
      ${ setString }


      ${ whereString !== '' && !customWhereString ? `WHERE ${ whereString }` : '' }

    
    `
    // const query = `
    //   INSERT INTO ${ tableName } ${ keysString } VALUES ${ valuesString }
    // `

    // debugger
    

    return await executeQuery( {

      connection,
      manualMode,
      actionTypes,
      actionType: updateMany === false ? actionTypes.updateOne : actionTypes.updateMany,
      query,
      parameters: {}

    } )



    
  } catch ( error ) {

    throw error

    
  }

}