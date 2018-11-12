export default ( connection, tableName, orderByParameters, strictMode )=> {
  
  let orderByStringArray = []

  for ( const [ key, value ] of Object.entries( orderByParameters ) ){

    if ( value ){
      if ( !Array.isArray( value ) ){
        orderByStringArray.push( `${ key } ${ value }` )
      } else {
        orderByStringArray.push( `${ key.join( ', ' ) } ${ value }` )
      }
    } else {
      break
    }
  }

  return orderByStringArray.join( ', ' )

}