import React from 'react';
import { shallow } from 'enzyme';
import { ShallowWrapper } from 'enzyme'; // eslint-disable-line no-unused-vars
import { expect } from 'chai';

import { DrumSettings } from './DrumSettings';

import {
  updateTempo,
  updateBeatOffset,
  updateTempoOscilation
 } from 'state/actions/drumSettingsActions';

import TempoEdit from './TempoEdit';
import PhraseLengthEdit from './PhraseLengthEdit';
import BeatOffsetEdit from './BeatOffsetEdit';
import TempoOscilationEdit from './TempoOscilationEdit';

let wrapper: ShallowWrapper | null;

describe('Drum settings', () => {
  beforeAll(() => {
    const props = {
      settings: {
        tempo: 1,
        beatOffset: 0,
        tempoOscilation: 0
      },
      updateTempo: updateTempo,
      updateBeatOffset: updateBeatOffset,
      updateTempoOscilation: updateTempoOscilation
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
    expect(wrapper!.find(PhraseLengthEdit)).to.have.lengthOf(0);
  });

  it("draws beat offset edit", () => {
    expect(wrapper!.find(BeatOffsetEdit)).to.have.lengthOf(1);
  });

  it("draws tempo oscilation edit", () => {
    expect(wrapper!.find(TempoOscilationEdit)).to.have.lengthOf(1);
  });
});
