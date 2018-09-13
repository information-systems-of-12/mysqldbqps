export default tables => {

  const joinStringOfJoinedTablesToUpdate = tables.map( t => 

    `${ t.joinType } JOIN ${ t.referencingTableName } ${ t.as === undefined || t.as === null ? '' : `AS ${ t.as }` } ON ${ t.as === undefined || t.as === null ? `${ t.referencingTableName }` : `${ t.as }` } ${ p.onSign ? p.onSign : '=' } ${ t.referencedTableName }.${ t.referencedTableColumnName }`
  
  ).join( '\n' )

  return joinStringOfJoinedTablesToUpdate

  
}