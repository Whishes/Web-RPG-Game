class Map {
    constructor(scene, key, tileSetName, bgLayerName, blockedLayerName) {
        this.scene = scene; // the scene this map belongs
        this.key = key; // Tiled JSON filed key name
        this.tileSetName = tileSetName; // Tiled Tileset image key name
        this.bgLayerName = bgLayerName; // name of the layer created in Tiled for the background
        this.blockedLayerName = blockedLayerName; // the name of the layer created in Tiled for blocked areas
        
        this.createMap();
    }
    createMap() {
        // create the tile map
        this.map = this.scene.make.tilemap({ key: 'map' });

        // add the tileset image
        this.tiles = this.map.addTilesetImage(this.tileSetName, this.tileSetName, 32, 32, 1, 2);

        //create our background layer
        this.backgroundLayer = this.map.createStaticLayer(this.bgLayerName, this.tiles, 0, 0);
        this.backgroundLayer.setScale(2);

        // create blocked layer
        this.blockedLayer = this.map.createStaticLayer(this.blockedLayerName, this.tiles, 0, 0);
        this.blockedLayer.setScale(2);
        this.blockedLayer.setCollisionByExclusion([-1]); // [-1] only adds collisions for all items on this layer
            
        // update the world bounds
        this.scene.physics.world.bounds.width = this.map.widthInPixels * 2;
        this.scene.physics.world.bounds.height = this.map.heightInPixels * 2;
        
        // limit to camera to the size of our map
        this.scene.cameras.main.setBounds(0, 0, this.map.widthInPixels *2, this.map.heightInPixels *2);
    }
}