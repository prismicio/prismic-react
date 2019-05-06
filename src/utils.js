import { isValidElementType } from 'react-is';
import { func } from 'prop-types';

// PropTypes
export const componentPropType = (props, propName, functionName) => {
  if (props[propName] && !isValidElementType(props[propName])) {
    return new Error(
      `Invalid prop '${propName}' supplied: the prop is not a valid React component (in ${functionName})`
    );
  }
  return null;
};

// Validators
export const validateRichText = richText => Array.isArray(richText);
export const validateComponent = (Component) =>
  componentPropType({ Component }, 'Component', 'renderRichText') === null


// Errors
export const componentError =
  'Component argument is not a React component. Please pass a valid Component (not Element) or a string (like `p` or `div`)';

export const richTextError =
  'Rich text argument is not formatted correctly. Make sure you\'re correctly passing the argument to `render` method';
