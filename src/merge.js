const cloner = require('cloner');

/**
 * Deep merges two objects by a given key.
 *
 * The content of the left hand object would be overridden for duplicate keys.
 *
 * @param object object1
 * @param object object2
 * @param string keyName
 *
 * @returns object
 */
const merge = function (primary, secondary, keyName) {
  // If a key name is given, deep merge the objects based on it's key.
  if (typeof keyName === 'string') {
    for (const [index, currentElement] of Object.entries(primary)) {
      // Get the object based on the key name of the secondary object.
      const found = secondary.find((element) => {
        return element[keyName] === currentElement[keyName];
      });
      if (!found) {
        continue;
      }
      // Override the object in the primary object by the values of the found one.
      primary[index] = cloner.deep.merge(found, currentElement);
    }
  }
  // Simple deep merge otherwise.
  else {
    primary = cloner.deep.merge(secondary, primary);
  }
  return primary;
};

module.exports = merge;
