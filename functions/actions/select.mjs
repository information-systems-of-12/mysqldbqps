import getWhereString from './getWhereString.mjs'
import getOrderByString from './getOrderByString.mjs'
import getSelectStringOfJoinedTable from './getSelectStringOfJoinedTable.mjs'
import getJoinStringOfJoinedTables from './getJoinStringOfJoinedTables.mjs'



export default async ( tableWrapper, options ) => {


  
  if ( !tableWrapper || tableWrapper === {} ) throw new Error( 'provide table wrapper for select action' )
  if ( !options || options === {} ) throw new Error( 'provide options for select action' )


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
    skip = 0,
    page = null,
    limit = 10,
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

  let plain = null
  let selectStringOfJoinedTables = ''
  let joinStringOfJoinedTables = ''

  if ( joinModeIsUsing ){
    
    
    const convertToPlainRecursively = ( plain, parentIntoField, tables ) => {


      if ( !plain ) plain = []

      if ( !tables ) return plain
  


      for ( const table of tables ){


        if ( table.tables && table.tables.length > 0 ){

          plain.push( {
            columns: table.referencingTable.columnNames,
            parent: parentIntoField,
            referencedTableName: table.referencedTable.tableName,
            referencedTableColumnName: table.referencedTableColumnName,
            referencingTableName: table.referencingTable.tableName,
            referencingTableColumnName: table.referencingTableColumnName,
            intoField: table.intoField,
            joinType: table.joinType,
            joinOnAnd: table.joinOnAnd,
            linkType: table.linkType,
            onSign: table.onSign,
            where: table.where,
            orderBy: table.orderBy
          } )

          if ( table.where ) whereString = whereString ? `${ whereString } AND ${ getWhereString( connection, table.intoField, table.where, strictMode ) }` : getWhereString( connection, table.intoField, table.where, strictMode )
          // debugger
          if ( table.orderBy ) orderByString = orderByString + getOrderByString( connection, table.intoField, table.orderBy, strictMode )

          return convertToPlainRecursively( plain, table.intoField, table.tables )

        } else {

          plain.push( {
            columns: table.referencingTable.columnNames,
            parent: parentIntoField,
            referencedTableName: table.referencedTable.tableName,
            referencedTableColumnName: table.referencedTableColumnName,
            referencingTableName: table.referencingTable.tableName,
            referencingTableColumnName: table.referencingTableColumnName,
            intoField: table.intoField,
            joinType: table.joinType,
            joinOnAnd: table.joinOnAnd,
            linkType: table.linkType,
            onSign: table.onSign,
            where: table.where,
            orderBy: table.orderBy
          } )

          if ( table.where ) whereString = whereString ? `${ whereString } AND ${ getWhereString( connection, table.intoField, table.where, strictMode ) }` : getWhereString( connection, table.intoField, table.where, strictMode )
          // debugger
          if ( table.orderBy ) orderByString = orderByString + getOrderByString( connection, table.intoField, table.orderBy, strictMode )

        }
        
      }

      return plain

    }

    plain = convertToPlainRecursively( null, null, tables )

    selectStringOfJoinedTables = getSelectStringOfJoinedTable( plain )
    joinStringOfJoinedTables = getJoinStringOfJoinedTables( columns, plain )

  }


  let selectFromMainTableString = null
  
  
  
  if ( tables && tables.length > 0 ){

    selectFromMainTableString = `${ Object.values( columns ).map( v => `${ tableName }.${ v } AS ${ tableName }__${ v }` ).join( ', ' ) }`

  } else if ( !tables || tables && tables.length === 0 ){

    selectFromMainTableString = `${ Object.values( columns ).map( v => `${ tableName }.${ v } AS ${ v }` ).join( ', ' ) }`

  }


  const query = `

    SELECT
      ${ distinct ? 'DISTINCT' : '' }${ particularColumns.length ? particularColumns.join( ', ' ) : `${ selectFromMainTableString }` }${ joinModeIsUsing && selectStringOfJoinedTables !== '' ? ', ' : '' }
      ${ selectStringOfJoinedTables ? selectStringOfJoinedTables : '' }
    
    FROM ${ tableName }

    ${ joinStringOfJoinedTables ? joinStringOfJoinedTables : '' }

    ${ customWhereString ? customWhereString : '' }
    ${ whereString !== '' && !customWhereString ? `WHERE ${ whereString }` : '' }

    ${ customOrderString ? customOrderString : '' }
    ${ orderByString !== '' && !customOrderString ? `ORDER BY ${ orderByString }` : '' }

    ${ skip && !page ? `LIMIT ${ limit } OFFSET ${ skip }` : '' }
    ${ limit && page ? `LIMIT ${ limit } OFFSET ${ ( page - 1 ) * limit }` : '' }
    ${ limit === 1 && page === null ? 'LIMIT 1' : '' }
    

  `

  // ${ limit === 1 && !page === null ? 'LIMIT 1' : '' }
  
  const results = await executeQuery( { connection, manualMode, actionTypes, actionType: actionTypes.SELECT, prepareQueryString, query } )

  const deleteIntoFieldNameFromKey = ( key, intoField ) => {
    return key.replace( intoField + '__', '' )
  }


  let f = null

  if ( joinModeIsUsing ) {

    const recursiveObjectCreateField = ( o, parent, intoField = intoField + '__' ) => {

      if ( parent === null ){

        o[ intoField ] = {}

      } else {
        
        if ( o[ parent ] ){

          o[ parent ][ intoField ] = {}
          
        } else {

          for ( const [ key, value ] of Object.entries( o ) ){
            recursiveObjectCreateField( o[ key ], parent, intoField )
          }

        }
      }
    }


    const recursiveObjectInsertToField = ( o, parent, columnName, intoField, key, value ) => {


      if ( parent === null ){

        if ( key.startsWith( intoField ) ){
          o[ intoField ] [ deleteIntoFieldNameFromKey( key, intoField ) ] = value
        }
        
      } else {
        
        if ( o[ parent ] ){

          if ( key.startsWith( intoField + '__' ) ){
            o[ parent ][ intoField ] [ deleteIntoFieldNameFromKey( key, intoField ) ] = value
          }
          
        } else {

          for ( const [ keyx, valuex ] of Object.entries( o ) ){
            recursiveObjectInsertToField( o[ keyx ], parent, columnName, intoField, key, value )
          }
            
        }

      }

    }

    if ( results && Array.isArray( results ) ){
      // debugger
      f = results.map( r => {
        
        let o = {}


        for ( const p of plain ){
          recursiveObjectCreateField( o, p.parent, p.intoField )
        }


        for ( const [ key, value ] of Object.entries( r ) ){
          
          if ( key.startsWith( tableName ) ){

            if ( !plain.some( p => p.columnName === deleteIntoFieldNameFromKey( key, tableName ) ) ){
              o[ deleteIntoFieldNameFromKey( key, tableName ) ] = value
            }
            
          } else {

            for ( const p of plain ){



              if ( !plain.some( p => p.columnName === deleteIntoFieldNameFromKey( key, p.parent ) ) ){
                
                if ( p.parent === null ){
          
                  if ( key.startsWith( p.intoField + '__' ) ){
                    o[ p.intoField ] [ deleteIntoFieldNameFromKey( key, p.intoField ) ] = value
                  }
                  

                } else {

                  if ( deleteIntoFieldNameFromKey( key, p.intoField ) !== p.columnName ){
                    recursiveObjectInsertToField( o, p.parent, p.columnName, p.intoField, key, value )
                  }
                  
                }
              }
              
            }
            
            
          }

        }
        
        return o
        

      } )



    } else {


      let o = {}


      for ( const p of plain ){
        recursiveObjectCreateField( o, p.parent, p.intoField )
      }


      for ( const [ key, value ] of Object.entries( results ) ){
        
        if ( key.startsWith( tableName ) ){

          if ( !plain.some( p => p.columnName === deleteIntoFieldNameFromKey( key, tableName ) ) ){
            o[ deleteIntoFieldNameFromKey( key, tableName ) ] = value
          }
          
        } else {

          for ( const p of plain ){



            if ( !plain.some( p => p.columnName === deleteIntoFieldNameFromKey( key, p.parent ) ) ){
              
              if ( p.parent === null ){
        
                if ( key.startsWith( p.intoField + '__' ) ){
                  o[ p.intoField ] [ deleteIntoFieldNameFromKey( key, p.intoField ) ] = value
                }
                

              } else {

                if ( deleteIntoFieldNameFromKey( key, p.intoField ) !== p.columnName ){
                  recursiveObjectInsertToField( o, p.parent, p.columnName, p.intoField, key, value )
                }
                
              }
            }
            
          }
          
          
        }

      }
      
      f = o


    }
    



  } else {

    f = results

  }
  

  if ( limit === 1 && !page && f && Array.isArray( f ) ){

    if ( f.length > 0 ){
      return f[ 0 ]
    }

    return null
    

  } else {

    return f

  }


}