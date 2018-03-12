import { Say } from '../../../../../../src/nut/commands/Say';

describe('nut.commands.Say', () => {
  it('test construct', () => {
    const say = new Say();

    expect(say).not.toBeNull();
  });
});
