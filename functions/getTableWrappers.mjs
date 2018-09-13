export default async options => {
  
  const {
    
    constants,

    connectionPool,
    getConnectionFromConnectionPool,
    
    prepareQueryString,
    executeQuery,
    

  } = options


  const connection = await getConnectionFromConnectionPool( connectionPool )

  const query = `SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='${ constants.DATABASE }';`
  const results = await executeQuery( { connection, manualMode: true, actionTypes: constants.TYPES.ACTIONS, query } )


  const tableNames = results.map( r => r.TABLE_NAME )

  let tableWrappers = {}


  
  for ( const tableName of tableNames ){
    
    tableWrappers[ tableName ] = {}
    tableWrappers[ tableName ].tableName = tableName
    tableWrappers[ tableName ].columnNames = {}

    const query = `
      SELECT COLUMN_NAME
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = '${ constants.DATABASE }' AND TABLE_NAME = '${ tableName }';
    `

    const results = await executeQuery( { connection, manualMode: true, actionTypes: constants.TYPES.ACTIONS, query } )

    for ( const result of results ){
      tableWrappers[ tableName ].columnNames[ result.COLUMN_NAME ] = result.COLUMN_NAME
    }
    

  }


  connection.release()
  
  return tableWrappers



}