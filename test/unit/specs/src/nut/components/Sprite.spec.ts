import { Scene } from '../../../../../../src/nut/base/Scene';
import { Sprite } from '../../../../../../src/nut/components/Sprite';

describe('nut.components.Sprite', () => {
  it('test load data', () => {
    const dataStr =
      '{"type":"sprite","name":"man","url":"/static/textures/man.png","width":600,"height":500}';
    const expectData = JSON.parse(dataStr);

    const sprite = new Sprite(expectData);
    // expect(sprite.name).toBe('');
    sprite.load();
    // console.log(sprite);
    expect(sprite.name).toBe(expectData.name);
  });
});
