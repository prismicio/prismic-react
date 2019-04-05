import { isValidElementType } from 'react-is';
import { func } from 'prop-types';

// PropTypes
const componentPropType = (props, propName, functionName) => {
  if (props[propName] && !isValidElementType(props[propName])) {
    return new Error(
      `Invalid prop '${propName}' supplied: the prop is not a valid React component (in ${functionName})`
    );
  }
  return null;
};

export const richTextPropTypes = {
  Component: componentPropType,
  linkResolver: func,
  htmlSerializer: func,
  serializeHyperlink: (props, _, componentName) => {
    if (props.serializeHyperlink && props.htmlSerializer) {
      return new Error(`You cannot specify both 'htmlSerializer' and 'serializeHyperlink'. The latter will be ignored by '${componentName}'.`);
    }
  },
  render: (props, _, componentName) => {
    if (!props.render && !props.renderAsText) {
      return new Error(`One of props 'render' or 'renderAsText' was not specified in '${componentName}'.`);
    }
  },
  renderAsText: (props, _, componentName) => {
    if (!props.renderAsText && !props.render) {
      return new Error(`One of props 'render' or 'renderAsText' was not specified in '${componentName}'.`);
    }
  },
}



// Validators
export const validateRichText = richText => Array.isArray(richText);
export const validateComponent = (Component) =>
  componentPropType({ Component }, 'Component', 'renderRichText') === null


export const createHtmlSerializer = (bucket = {}, serializers = []) => {
  const processors = serializers.reduce((acc, { type, fn }) => {
    return Object.assign({}, acc, { [type]: fn })
  }, {});
  return (type, ...args) => processors[type] ? processors[type](type, ...args) : null;
}


// Errors
export const componentError =
  'Component argument is not a React component. Please pass a valid Component (not Element) or a string (like `p` or `div`)';

export const richTextError =
  'Rich text argument is not formatted correctly. Make sure you\'re correctly passing the argument to `render` method';
