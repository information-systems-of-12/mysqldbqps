export default async ( tableWrapper, options ) => {
  
  
  if ( !tableWrapper || tableWrapper === {} ) throw new Error( 'provide table wrapper for insert action' )
  if ( !options || options === {} ) throw new Error( 'provide options for insert action' )



  let {
    
    strict = true,
    connection = null,
    
    connectionPool = null,
    getConnectionFromConnectionPool,

    actionTypes,
    executeQuery,

    value = null,
    values = null

  } = options



  try {

    

    if ( !value && !values && !values.length ) throw new Error( 'to perform insert action you need to specify insert value(s)' )
    

    let manualMode = false
    let limitOne = false
    // debugger

    
    if ( !connection ) connection = await getConnectionFromConnectionPool( connectionPool )
    else manualMode = true
    

    const tableName = tableWrapper.tableName

    // debugger

    let keysString = ''
    let valuesString = ''
    let keysArray = []
    let valuesArray = []


    if ( value ){
      limitOne = true
      keysString = `( ${ Object.keys( value ).join( ', ' ) } )`
      let valuea = []

      for ( const [ key, value2 ] of Object.entries( value ) ){
        // key, value2
        // debugger
        valuea.push( connection.escape( value2 ) )
        
      }

      valuesString = `( ${ valuea.join( ', ' ) } )`





    } else if ( values && values.length ){
      
      let valuesa = []

      keysString = `( ${ Object.keys( values[ 0 ] ).join( ', ' ) } )`

      for ( const v of values ){
        let valuea = []
        for ( const [ key, value ] of Object.entries( v ) ){
          valuea.push( connection.escape( value ) )
        }
        valuesa.push( `( ${ valuea.join( ', ' ) } )` )
      }

      valuesString = valuesa.join( ', ' )




    }
    

    const query = `
      INSERT INTO ${ tableName } ${ keysString } VALUES ${ valuesString }
    `

    return await executeQuery( {

      connection,
      manualMode,
      actionTypes,
      actionType: actionTypes.INSERT,
      limitOne,
      query,
      parameters: {}

    } )

    
  } catch ( error ) {

    throw error

  }



}