// UPDATE fieldLocales
// SET english = CASE
// WHEN id = 7 THEN 'hello 7'
// WHEN id = 8 THEN 'hello 8'
// END
// WHERE id IN ( 7, 8 )




// UPDATE users
// INNER JOIN fieldLocales ON fieldLocales.id = users.id
// SET users.password = CASE
// WHEN users.id = 1 THEN 'password-1'
// WHEN users.id = 2 THEN 'password-2'
// END,

// fieldLocales.russian = CASE
// WHEN users.id = 1 THEN 'RUS-12'
// WHEN users.id = 2 THEN 'RUS-22'
// END

// WHERE users.id IN ( 1, 2 )


// not updating inner joins







// await update( masters, { mode: modes.one || modes.many, where: { id: 1 }, values } )

// update few
// await update( masters, { where: { param1: 1 }, values: { x: 1, y: 2 } } )

// update one
// await update( masters, { where: { id: 1 }, value: { x: 1, y: 2 } } )

// update one with inner joined
// await update( masters, { where: { id: 1 }, value: { x: 1, y: 2 }, tables: [ {
  
// } ] } )


// if where field value === array -> as array



export default async ( tableWrapper, options ) => {

  if ( !tableWrapper || tableWrapper === {} ) throw new Error( 'provide table wrapper for select action' )
  if ( !options || options === {} ) throw new Error( 'provide options for select action' )

  let {

    
  } = options


  try {
    
  } catch ( error ) {
    
  }
}


await update( masters, { where: { param1: 1 }, values: { f1: 1, f2: 2 } } )


await update( masters, { where: { id: 1 }, value: { f1: 1, f2: 2 }, tables: [

  {
    referencedTable: call_orders,
    referencedTableColumnName: call_orders.columnNames.id,
    referencingTable: calls,
    referencingTableColumnName: calls.columnNames.call_orders_id,
    joinType: joinTypes.inner,
    onSign: signs.equal,
    // as: 'locale1',
    value: { f3: 3, f4: 4 }
  }

] } )

  // locales: {
  //   english: 'eng1',
  //   russian: 'rus2'
  // }


