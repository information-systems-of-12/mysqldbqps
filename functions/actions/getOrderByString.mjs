export default ( connection, tableName, orderByParameters, strictMode )=> {
  
  let orderByStringArray = []

  for ( const [ key, value ] of Object.entries( orderByParameters ) ){

    if ( value ){
      if ( !Array.isArray( value ) ){
        orderByStringArray.push( `${ value } ${ key }` )
      } else {
        orderByStringArray.push( `${ value.join( ', ' ) } ${ key }` )
      }
    } else {
      break
    }
  }

  return orderByStringArray.join( ', ' )

}