export default ( { mysql, constants } ) => {
  
  return mysql.createPool( {
    connectionLimit: 100,
    host: constants.HOSTNAME,
    user: constants.USER,
    port: constants.PORT,
    password: constants.PASSWORD,
    database: constants.DATABASE
  } )

}