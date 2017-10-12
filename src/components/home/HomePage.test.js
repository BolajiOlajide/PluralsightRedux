import React from 'react';
import expect from 'expect';
import HomePage from './HomePage';
import { mount, shallow } from 'enzyme';

describe('Test the homepage of Pluralsight Redux', () => {
    const wrapper = mount(<HomePage />);

    it('it renders a jumbotron div', () => {
        expect(wrapper.render().find('.jumbotron').length).toBe(1);
    });

    it('it renders a paragraph element', () => {
        expect(wrapper.render().find('p').length).toBe(1);
    });

    it('it renders a header element', () => {
        expect(wrapper.render().find('h1').length).toBe(2);
    });

    it('it renders a header element with the text Pluralsight Administration', () => {
        expect(wrapper.render().find('.header').text()).toBe(" Pluralsight Administration ");
    });

    it('it renders a paragraph element', () => {
        expect(wrapper.render().find('p').text()).toBe(" React, Redux and React Router in ES6 for ultra-responsive web apps.");
    });
});
