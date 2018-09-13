export default ( columns, plane ) => {
  
  const joinStringOfJoinedTables = plane.map( p => 
    `${ p.joinType } JOIN ${ p.referencingTableName } AS ${ p.intoField } ON ${ p.intoField }.${ p.referencingTableColumnName } ${ p.onSign ? p.onSign : '=' } ${ p.parent ? p.parent : p.referencedTableName }.${ p.referencedTableColumnName }${ p.joinOnAnd ? ` AND ${ Object.keys( p.joinOnAnd )[ 0 ] } = ${ Object.values( p.joinOnAnd )[ 0 ] }` : '' }`
    
  ).join( '\n' )

  return joinStringOfJoinedTables

}