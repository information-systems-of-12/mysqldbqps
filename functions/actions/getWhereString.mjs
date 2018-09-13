const ES_PROTOTYPES = {
  
  FUNCTION: 'Function',
  ASYNC_FUNCTION: 'AsyncFunction',
  PROMISE: 'Promise',
  OBJECT: 'Object'

}


export default ( connection, tableName, parameters, strictMode, joinModeIsUsing ) => {
  



  let whereStringArray = []


  for ( const [ key, value ] of Object.entries( parameters ) ){

    // debugger
      
    if ( value !== undefined && Object.getPrototypeOf( value ).constructor.name === ES_PROTOTYPES.OBJECT ){

      const sign = Object.keys( value )[ 0 ]
      const detailValue = value[ sign ]

      // if ( joinModeIsUsing === true ){
      //   whereStringArray.push( `${ tableName }${ key } ${ sign } ${ connection.escape( detailValue ) }` )
      // } else {
        whereStringArray.push( `${ tableName }.${ key } ${ sign } ${ connection.escape( detailValue ) }` )
      // }
      

    } else if (  value !== undefined ){

      // if ( joinModeIsUsing === true ){
      //   whereStringArray.push( `${ tableName }${ key } = ${ connection.escape( value ) }` )
      // } else {
        whereStringArray.push( `${ tableName }.${ key } = ${ connection.escape( value ) }` )
      // }
      

    }

   
  }


  // debugger
  return whereStringArray.join( strictMode ? ' AND ' : ' OR ' )




}



// '<' / 'lessThan'
// '<=' / 'lessThanOrEqual'
// '>' / 'greaterThan'
// '>=' / 'greaterThanOrEqual'
// '!' / 'not'
// 'like'
// 'contains'
// 'startsWith'
// 'endsWith'



// module.exports = parameters => {


//   let whereStringArray = []
  
//     for ( const p of parameters ){

//       if ( p.orderType ) orderByArray.push( { key: p.key, orderType: p.orderType || orderTypes.asc } )
//       if ( p.value && p.value !== '' ) whereStringArray.push( `${ tableName }.${ p.key } ${ p.sign || signs.equal } ${ connection.escape( p.value ) }` )

//     }
  
//   whereString = whereStringArray.join( strictMode ? ' AND ' : ' OR ' )


// }
