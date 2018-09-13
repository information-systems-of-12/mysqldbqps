// export const ACTION_TYPES = {
//   selectOne: 'select-one',
//   select: 'select',
//   insertOne: 'insert-one',
//   updateOne: 'update-one'
// }

// export const SIGNS = {
//   equal: '=',
//   less: '<',
//   more: '>',
//   lessOrEqual: '<=',
//   moreOrEqual: '>='
// }

// export const JOIN = {
//   inner: 'INNER',
//   left: 'LEFT'
// }

// export const orderTypes = {
//   asc: 'ASC',
//   desc: 'DESC'
// }

// export const modes = {
//   one: 'one',
//   many: 'many'
// }


export const TYPES = {
  ACTIONS: {
    // SELECT_ONE: 'SELECT-ONE',
    // SELECT: 'SELECT',
    // INSERT: 'INSERT',
    // INSERT_ONE: 'INSERT-ONE',
    // UPDATE: 'UPDATE',
    // UPDATE_ONE: 'UPDATE-ONE',
    // DELETE: 'DELETE',
    // DELETE_ONE: 'DELETE-ONE',
    SELECT: 'SELECT',
    INSERT: 'INSERT',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE'
  },
  SIGNS: {
    EQUAL: '=',
    LESS: '<',
    MORE: '>',
    LESS_OR_EQUAL: '<=',
    MORE_OR_EQUAL: '>='
  },
  JOIN: {
    INNER: 'INNER',
    LEFT: 'LEFT'
  },
  ORDER: {
    ASC: 'ASC',
    DESC: 'DESC'
  },
  // COUNT: {
  //   ONE: 'ONE',
  //   MANY: 'MANY'
  // }
}


export const DEVELOPMENT_NODE_ENV = 'DEVELOPMENT'
export const STAGING_NODE_ENV = 'STAGING'
export const PRODUCTION_NODE_ENV = 'PRODUCTION'