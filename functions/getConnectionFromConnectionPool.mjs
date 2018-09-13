export default connectionPool => {
  
  return new Promise( ( resolve, reject ) => {
    try {
      connectionPool.getConnection( ( error, connection ) => {

        if ( error ) {
          // reject( error )
          throw error
        } else {
          return resolve( connection )
        }
  
      } )
    } catch ( error ) {
      throw error
    }
    

  } )

}