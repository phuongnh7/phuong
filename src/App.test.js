import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './App';
import SendMessage from './component/SendMessage'
import { shortMsg, twoChunkMsg, noSpaceLongMsg } from './logic/TwitMessage.test';

Enzyme.configure({ adapter: new Adapter() });

describe('Tests App componet', () => {

  test('unit test renders app component isolation from the child components with Enzyme sallow', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toBe(true);
  });


  test('tests dom renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test("integration test, should render SendMessage component", () => {
    const wrapper = mount(<App />);
    expect(wrapper.children(SendMessage).length).toEqual(1);
  });

  test("integration test, send short messgae", () => {
    const wrapper = mount(<App />);

    wrapper.find('#message').simulate('change', {
      target: { id: 'message', value: shortMsg }
    });

    wrapper.find('#sendBtn').simulate('click');

    //Expect input message is clear
    expect(wrapper.find('#message').props().value).toBe('');
    //Expect no spit message 
    expect(wrapper.find('.post-message li')).toHaveLength(0);
  });

  test('integration test, send long message', () => {
    const wrapper = mount(<App />);
    wrapper.find('#message').simulate('change', {
      target: { id: 'message', value: twoChunkMsg }
    });

    wrapper.find('#sendBtn').simulate('click');

    //Expect input message is clear
    expect(wrapper.find('#message').props().value).toBe('');
    //Expect spit message to two chunks
    expect(wrapper.find('.post-message li')).toHaveLength(2);

  });

  test('integration test, send long message with no space', () => {
    const wrapper = mount(<App />);
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