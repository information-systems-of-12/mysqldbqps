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

        if ( error ) {
          throw error
        }

        if ( !manualMode ) {
          connection.release()
        }

        return resolve( results )

        // let performResult = null


        // switch ( actionType ) {

        //   case SELECT:
        //     // debugger
        //     // if ( limitOne === false ){
        //     //   if ( results && Array.isArray( results ) && results.length > 0 ){
        //     //     performResult = results
        //     //   } else {
        //     //     performResult = null
        //     //   }
              
        //     // } else if ( limitOne === true ){
        //     //   if ( results && Array.isArray( results ) ){
        //     //     performResult = results[ 0 ]
        //     //   }
              
        //     // }
        //     // performResult = limitOne === false ? results && results.length ? results[ 0 ] : null : results[ 0 ]
        //     performResult = results
        //     break

        //   case UPDATE:
        //     performResult = results
        //     break

        //   case INSERT:
        //     performResult = results
        //     break

        //   case DELETE:
        //     performResult = results
        //     break

        //   default:
        //     performResult = results
        //     break

        // }

        // return resolve( performResult )
        
      })

    } catch ( error ) {
      
      throw error

    }


  } )
}