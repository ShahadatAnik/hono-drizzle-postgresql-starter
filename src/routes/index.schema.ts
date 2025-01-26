//* Import all schemas
import * as hr from './hr/schema';

const schema = {
  ...hr,
  //* assign all schemas here
};

export type Schema = typeof schema;

export default schema;
