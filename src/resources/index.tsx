import ruleResources from './rule.resources';
import roleResources from './role.resources';
import userResources from './user.resources';

const resources = [...userResources, ...roleResources, ...ruleResources];
export default resources;
