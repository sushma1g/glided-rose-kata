import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
  });
});

describe('basic items', () => {

  it('quality should never go below 0', () => {
    const gildedRose = new GildedRose([ new Item('foo', 0, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(-1);
  });

  it('quality should never be more than 50', () => {
    const gildedRose = new GildedRose([ new Item('foo', 10, 56) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
    expect(items[0].sellIn).toBe(9);
  });


  it('should update quality if sellin is more than 0  day', () => {
      const gildedRose = new GildedRose([ new Item('foo', 6, 7) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe('foo');
      expect(items[0].quality).toBe(6);
      expect(items[0].sellIn).toBe(5);
  });
   
  it('should update quality 2x as fast for sellin 0 days', () => {
      const gildedRose = new GildedRose([ new Item('foo', 0, 8) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(6);
      expect(items[0].sellIn).toBe(-1);
  });

  
})

describe('aged brie items', () => { 

  it('quality should never be more than  50', () => {
    const gildedRose = new GildedRose([ new Item('Aged Brie', 1, 50) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
    expect(items[0].sellIn).toBe(0);
});

  it('should allow quality of Aged Brie to go up', () => {
      const gildedRose = new GildedRose([ new Item('Aged Brie', 1, 1) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(2);
      expect(items[0].sellIn).toBe(0);
  });
  

  it('should allow quality of aged brie to be increment up to 50', () => {
      const gildedRose = new GildedRose([ new Item('Aged Brie', -3, 49) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(50);
      expect(items[0].sellIn).toBe(-4);
  });
})

describe('sulfuras items', () => {
  it('should not decrease quality for sulfuras', () => {
      const gildedRose = new GildedRose([ new Item('Sulfuras, Hand of Ragnaros', 1, 1) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(80);
      expect(items[0].sellIn).toBe(1);
  });
})

describe('backstage pass items', () => {
  it('quality should never be more than  50', () => {
    const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 1, 50) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
    expect(items[0].sellIn).toBe(0);
 });

  it('should increase quality by 1 when more than 10 days remaining', () => {
      const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 15, 6) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(7);
      expect(items[0].sellIn).toBe(14);
  });
  it('should increase quality  by 2 when more than 5 days remaining', () => {
      const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 8, 9) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(11);
      expect(items[0].sellIn).toBe(7);
  });
  it('should increase quality by 3 when less than 5 days remaining', () => {
      const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 2, 1) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(4);
      expect(items[0].sellIn).toBe(1);
  });
  it('should set quality to 0 after concert', () => {
      const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
      expect(items[0].sellIn).toBe(-1);
  });
})

describe('conjured items', () => {

  it(' quality should never go below 0', () => {
    const gildedRose = new GildedRose([ new Item('Conjured', 0, 1) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(-1);
  });


  it('quality should never be more than  50', () => {
    const gildedRose = new GildedRose([ new Item('Conjured', 1, 53) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
    expect(items[0].sellIn).toBe(0);
  });

  it('should update quality for conjured sellin 1 day', () => {
      const gildedRose = new GildedRose([ new Item('Conjured', 1, 20) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(18);
      expect(items[0].sellIn).toBe(0);
  });
   
  it('should update conjured quality 4x as fast for sellin 0 days', () => {
      const gildedRose = new GildedRose([ new Item('Conjured', 0, 20) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(16);
      expect(items[0].sellIn).toBe(-1);
  });

})

