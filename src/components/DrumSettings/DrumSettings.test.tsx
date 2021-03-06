import React from 'react';
import { shallow } from 'enzyme';
import { ShallowWrapper } from 'enzyme'; // eslint-disable-line no-unused-vars
import { expect } from 'chai';

import { DrumSettings } from './DrumSettings';

import { updateTempo } from 'state/actions/drumSettingsActions';

import TempoEdit from './TempoEdit';
import PhraseLengthEdit from './PhraseLengthEdit';

let wrapper: ShallowWrapper | null;

describe('Drum settings', () => {
  beforeAll(() => {
    const props = {
      settings: {
        tempo: 1
      },
      updateTempo: updateTempo
    };

    wrapper = shallow(<DrumSettings {...props}/>);
  });

  afterAll(() => {
    wrapper = null;
  });

  it("draws tempo edit", () => {
    expect(wrapper!.find(TempoEdit)).to.have.lengthOf(1);
  });

  it("draws phrase length edit", () => {
    expect(wrapper!.find(PhraseLengthEdit)).to.have.lengthOf(1);
  });
});
