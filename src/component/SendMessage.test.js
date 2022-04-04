import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SendMessage from './SendMessage';
import { shortMsg, twoChunkMsg, noSpaceLongMsg } from '../logic/TwitMessage.test';

Enzyme.configure({ adapter: new Adapter() });

describe('Tests SendMessage component ', () => {

  test('renders without crashing', () => {
    const wrapper = mount(<SendMessage />);
    expect(wrapper.exists()).toBe(true);

    //Snapshot Testing
    expect(wrapper).toMatchSnapshot();
  });


  test('tests message is echoed ', () => {
    const wrapper = mount(<SendMessage />);
    wrapper.find('#message').simulate('change', {
      target: { id: 'message', value: shortMsg }
    })
    expect(wrapper.find('#message').props().value).toBe(shortMsg);
  });


  test('tests send short message', () => {
    const wrapper = mount(<SendMessage />);
    wrapper.find('#message').simulate('change', {
      target: { id: 'message', value: shortMsg }
    });

    wrapper.find('#sendBtn').simulate('click');

    //Expect input message is clear
    expect(wrapper.find('#message').props().value).toBe('');
    //Expect no spit message 
    expect(wrapper.find('.post-message li')).toHaveLength(0);

  });

  test('tests send long message', () => {
    const wrapper = mount(<SendMessage />);
    wrapper.find('#message').simulate('change', {
      target: { id: 'message', value: twoChunkMsg }
    });

    wrapper.find('#sendBtn').simulate('click');

    //Expect input message is clear
    expect(wrapper.find('#message').props().value).toBe('');
    //Expect spit message to two chunks
    expect(wrapper.find('.post-message li')).toHaveLength(2);

  });

  test('tests send long message with no space', () => {
    const wrapper = mount(<SendMessage />);
    wrapper.find('#message').simulate('change', {
      target: { id: 'message', value: noSpaceLongMsg }
    });

    wrapper.find('#sendBtn').simulate('click');

    //Expect input message is remain
    expect(wrapper.find('#message').props().value).toBe(noSpaceLongMsg);
    //Expect input control is active (focus)
    expect(wrapper.find('#message').getDOMNode()).toBe(document.activeElement);
    //Expect mark error oninput
    expect(wrapper.find('textarea.error')).toHaveLength(1);
    //Expect show error message
    expect(wrapper.find('span.error')).toHaveLength(1);
    //Expect no spit message 
    expect(wrapper.find('.post-message li')).toHaveLength(0);

  });

});