export default ( { connection, manualMode = false, actionTypes, actionType = null, limitOne = false, query, parameters = null } ) => {

  const { SELECT, INSERT, UPDATE, DELETE } = actionTypes

  return new Promise( ( resolve, reject ) => {
    
    try {

      if ( query ) {

        // trim spaces at a beginning & end of string
        query = query.replace( /^\s+|\s+$/g, '' )
      
        // remove double and triple spaces
        query = query.replace( /\s+/g, ' ' )

      }

      connection.query( query, parameters, ( error, results, fields ) => {

        if ( error ) reject( error )

        if ( !manualMode ) connection.release()

        let performResult = null


        switch ( actionType ) {

          case SELECT:
            performResult = limitOne === false ? results && results.length ? results[ 0 ] : null : results[ 0 ]
            break

          case UPDATE:
            performResult = results
            break

          case INSERT:
            performResult = results
            break

          case DELETE:
            performResult = results
            break

          default:
            performResult = results
            break

        }

        resolve( performResult )
        
      })

    } catch ( error ) {
      
      reject( error )

    }


  } )
}