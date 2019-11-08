import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { it, describe } from 'mocha';
import { expect } from 'chai';
import { Elements } from 'prismic-richtext';

import { renderRichText } from '../src/richtext';

Enzyme.configure({ adapter: new Adapter() });

describe('richtext', () => {
  it('does not specify a key on the wrapper element', () => {
    const richText = [{
      type: 'heading2',
      text: 'Heading',
      spans: [],
    }];
    const wrapper = shallow(renderRichText(richText, null, null, 'div'));

    expect(wrapper.key()).to.equal(null);
  });

  it('renders a simple element with key zero', () => {
    const richText = [{
      type: 'heading2',
      text: 'Heading',
      spans: [],
    }];
    const wrapper = shallow(renderRichText(richText, null, null, 'div'));

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
    const wrapper = shallow(renderRichText(richText, null, null, 'div'));
    const list = wrapper.find('ul');
    const items = list.find('li');

    expect(list.key()).to.equal('0');
    expect(items.at(0).key()).to.equal('0');
    expect(items.at(1).key()).to.equal('1');
  });

  it('renders an HTML element with attribute corresponding to any given args', () => {
    const richText = [{
      type: 'heading2',
      text: 'Heading',
      spans: [],
    }];

    const args = {
      className: "definedClassName",
      width: 250,
    }
    const wrapper = shallow(renderRichText(richText, null, null, 'div', args));
    expect(wrapper.prop('width')).to.equal(250);
    expect(wrapper.prop('className')).to.equal('definedClassName');
  })
});
