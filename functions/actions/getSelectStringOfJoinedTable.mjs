export default plane => {
  const selectStringOfJoinedTables = plane.map( t => `${ Object.values( t.columns ).map( v => `${ t.intoField }.${ v } AS ${ t.intoField }__${ v }` ).join( ', ' ) }` ).join( ', ' )
  return selectStringOfJoinedTables
}