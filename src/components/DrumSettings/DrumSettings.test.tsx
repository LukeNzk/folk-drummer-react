import React from 'react';
import { shallow } from 'enzyme';
import { ShallowWrapper } from 'enzyme'; // eslint-disable-line no-unused-vars

import { expect } from 'chai';

import DrumSettings from './';

import TempoEdit from './TempoEdit';
import PhraseLengthEdit from './PhraseLengthEdit';

let wrapper: ShallowWrapper;

describe('Drum settings', () => {
  beforeAll(() => {
    wrapper = shallow((<DrumSettings/>));
  });

  it("draws tempo edit", () => {
    expect(wrapper.find(TempoEdit)).to.have.lengthOf(1);
  });

  it("draws phrase length edit", () => {
    expect(wrapper.find(PhraseLengthEdit)).to.have.lengthOf(1);
  });
});
