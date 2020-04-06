import ClipProvider from './ClipProvider';

describe('ClipProvider', () => {
  it('returns clip', () => {
    const clipProvider = new ClipProvider();
    clipProvider.push({});
    
    expect(clipProvider.next()).toBeDefined();
  });

  it('throws when no clips', () => {
    const clipProvider = new ClipProvider();
    expect(() => clipProvider.next()).toThrowError("No clips provided");
  });
});
