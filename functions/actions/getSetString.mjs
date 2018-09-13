export default ( connection, tableName, value ) => {

  let setStringArray = []
  for ( const key in value ){
    setStringArray.push( `${ tableName }.${ key } = ${ connection.escape( value[ key ] ) }` )
  }
  return setStringArray.join( ', ' )

}