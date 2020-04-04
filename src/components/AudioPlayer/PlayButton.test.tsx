import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import PlayButton from './PlayButton';

import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import IconButton from '@material-ui/core/IconButton';

describe('Play button', () => {
  it('renders playing state', () => {
    const wrapper = shallow((<PlayButton isPlaying={true}/>));
    expect(wrapper.find(PauseIcon)).to.have.lengthOf(1);
  });

  it('renders pause state', () => {
    const wrapper = shallow((<PlayButton isPlaying={false}/>));
    expect(wrapper.find(PlayArrowIcon)).to.have.lengthOf(1);
  });

  it('handles undefined state as PAUSE', () => {
    const wrapper = shallow((<PlayButton/>));
    expect(wrapper.find(PlayArrowIcon)).to.have.lengthOf(1);
  });

  it('propagates click event', () => {
    const handleClick = sinon.spy();
    const wrapper = shallow(<PlayButton onClick={handleClick}/>);
    wrapper.find(IconButton).simulate('click');
    expect(handleClick.callCount).to.be.equal(1);
  });
});
