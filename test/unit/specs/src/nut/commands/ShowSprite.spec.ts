import { ShowSprite } from '../../../../../../src/nut/commands/ShowSprite';

describe('nut.commands.ShowSprite', () => {
  it('tok', () => {});
  it('test load', () => {
    const data = { type: 'showsprite', name: 'scene1', x: 0, y: 0 };
    const ss = new ShowSprite(data);
    ss.load();
    const tesSprite: any = {};
    ss.showSprite(tesSprite, false);
    expect(tesSprite.visible).toBe(false);
  });
  it('test updateSpritePosition', () => {
    const data = { type: 'showsprite', name: 'scene1', x: 0, y: 0 };
    const ss = new ShowSprite(data);
    ss.load();
    const tesSprite: any = {};
    ss.showSprite(tesSprite, false);
    expect(tesSprite.visible).toBe(false);
    ss.updateSpritePosition(tesSprite, 1, 1, 1);
    expect(tesSprite.x).toBe(1);
    expect(tesSprite.y).toBe(1);
    expect(tesSprite.z).toBe(1);
    ss.updateSpritePosition(tesSprite, 2, 3, 4);
    expect(tesSprite.x).toBe(2);
    expect(tesSprite.y).toBe(3);
    expect(tesSprite.z).toBe(4);
  });
  it('test updateSpritePosition', () => {
    const data = { type: 'showsprite', name: 'scene1', x: 0, y: 0 };
    const ss = new ShowSprite(data);
    ss.load();
    const tesSprite: any = {};
    ss.showSprite(tesSprite, false);
    expect(tesSprite.visible).toBe(false);
    ss.updateSpriteSize(tesSprite, 100, 200);
    expect(tesSprite.width).toBe(100);
    expect(tesSprite.height).toBe(200);
    ss.updateSpriteSize(tesSprite, 2, 3);
    expect(tesSprite.width).toBe(2);
    expect(tesSprite.height).toBe(3);
  });
});
