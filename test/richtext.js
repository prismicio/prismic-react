import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { it, describe } from 'mocha';
import { expect } from 'chai';
import { Elements } from 'prismic-richtext';

import rt from '../src/richtext';

Enzyme.configure({ adapter: new Adapter() });

describe('richtext', () => {
  it('does not specify a key on the wrapper element', () => {
    const richText = [{
      type: 'heading2',
      text: 'Heading',
      spans: [],
    }];
    const wrapper = shallow(rt.render(richText));

    expect(wrapper.key()).to.equal(null);
  });

  it('renders a simple element with key zero', () => {
    const richText = [{
      type: 'heading2',
      text: 'Heading',
      spans: [],
    }];
    const wrapper = shallow(rt.render(richText));

    expect(wrapper.find('h2').key()).to.equal('0');
  });

  it('renders nested items with appropriately indexed keys', () => {
    const richText = [
      {
        type: 'list-item',
        text: 'li1',
        spans: [],
      },
      {
        type: 'list-item',
        text: 'li2',
        spans: [],
      },
    ];
    const wrapper = shallow(rt.render(richText));
    const list = wrapper.find('ul');
    const items = list.find('li');

    expect(list.key()).to.equal('0');
    expect(items.at(0).key()).to.equal('0');
    expect(items.at(1).key()).to.equal('1');
  });


  // A bit of a smoke test for all types, as there isn't any pre-existing testing here
  // Real tests should be added to test out rendering
  const types = {
    [Elements.embed]: {
      oembed: {},
    },
    [Elements.hyperlink]: {
      data: {},
      spans: [],
      text: '',
    },
    default: {
      text: '',
      spans: [],
    },
  };
  Object.keys(Elements).forEach(type => {
    it(`renders ${type} successfully`, () => {
      const richText = [Object.assign({}, types[type] || types.default, { type })];
      shallow(rt.render(richText));
    });
  });
});
