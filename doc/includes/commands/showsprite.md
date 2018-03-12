## ShowSprite

----
| type/类型 | Command |
|------|------|
| 功能 | 控制 Sprite的显示和隐藏，尺寸以及位置  |
||

### 命令格式

``` json

{ 
    type: 'showsprite', 
    name: spriteName , //sprite name
    visible: false|true, //visible or not
    x:0, //sprite position
    y:0,
    z:0, 
    width:200,//sprite size
    height:300, 
},
```

### Example:

- show sprite
    
    `{ type: 'showsprite', name: 'scene1', visible: true}`
- hidden sprite

    `{ type: 'showsprite', name: 'scene1', visible: false}`
- set sprite position 

    `{ type: 'showsprite', name: 'scene1',  x:0,y:0,z:0}`
- set sprite size

    `{ type: 'showsprite', name: 'scene1', width: 100, height: 100}`

### 特别说明


