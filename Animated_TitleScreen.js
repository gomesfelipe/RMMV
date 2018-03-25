//=============================================================================
// Animated_TitleScreen.js
//=============================================================================
/*:
 * @plugindesc (v0.05) Cena de titulo animado.
 * @author RocketKnight/Felipe Gomes

 * @param Char Number
 * @desc Definição da quantidade de imagens dos personagens.
 * @default 4
 *  
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Animated_TitleScreen = true;
　　var GomesRocket = GomesRocket || {}; 
  GomesRocket.parameters = PluginManager.parameters('Animated_TitleScreen');
  var monster;
  var FRAMES = [
  "frame-1.png",
  "frame-2.png",
  "frame-3.png",
  "frame-4.png",
];
var frameindex;
var frametime;
var FRAMERATE = 0.08;
var VELOCITY = 100;

//==============================
// * Initialize
//==============================
var _alia_gomes_rocket_initialize = Scene_Title.prototype.initialize;
Scene_Title.prototype.initialize = function() { 
    _alia_gomes_rocket_initialize.call(this);
  this._scenarioField = new Sprite();
  this._scenarioField.x = Graphics.boxWidth / 2;
  this._scenarioField.y = Graphics.boxHeight / 2;
  this._scenarioField.scale.x = 1.00;
  this._scenarioField.scale.y = this._scenarioField.scale.x;
  this.addChild(this._scenarioField);
  this._firstRefresh = true;
  this.loadImages();  
};

Scene_Title.prototype.resize = function(){
 
  // Determine which screen dimension is most constrained
  ratio = Math.min(window.innerWidth/Graphics.width,
                   window.innerHeight/Graphics.height);
 
  // Scale the view appropriately to fill that dimension
  stage.scale.x = stage.scale.y = ratio;
 
  // Update the renderer dimensions
  renderer.resize(Math.ceil(Graphics.width * ratio),
                  Math.ceil(Graphics.height * ratio));
}

//==============================
// * Load Images
//==============================
Scene_Title.prototype.loadImages = function() {
  this._back_img = [ImageManager.loadTitle1("Background_1"),
                     ImageManager.loadTitle1("layer_2"),
            ];

};

//==============================
// * Create Background
//==============================
var _alias_gomesrocket_createBackground = Scene_Title.prototype.createBackground;
Scene_Title.prototype.createBackground = function() { 
    _alias_gomesrocket_createBackground.call(this);
  this.removeChild(this._backSprite1);
  this.removeChild(this._backSprite2);
  var width = Graphics.boxWidth * 2;
  var height = Graphics.boxHeight * 2;
  this._background = [];
  //ratio = Math.min(window.innerWidth/Graphics.width,
    //               window.innerHeight/Graphics.height);

  for (var i = 0; i < 2 ; i++) {
     this._background[i] = new TilingSprite(this._back_img[i]);
     this._background[i].move(0,0, width, height);
       this._background[i].anchor.x = 0.5;
     this._background[i].anchor.y = 0.5;
     this._scenarioField.addChild(this._background[i]);
  }
  this._background[0].scale.x = Math.min(window.innerWidth/Graphics.width);
  this._background[0].scale.y = Math.min(window.innerHeight/Graphics.height);
  //this._background[0].y = 600;
  this._background[1].y = Graphics.boxHeight / 2;
  this._background[1].scale.x = Math.min(window.innerWidth/Graphics.width);
  this._background[1].scale.y = Math.min(window.innerHeight/Graphics.height);
};




//==============================
// * Update Sprites
//==============================
Scene_Title.prototype.updateSprites = function(sprite,index,type) {
  this._duration[type][index] -= 1
    if (Math.abs(sprite.scale.x) > 0.2) {sprite.opacity += 10;
    } else {sprite.opacity -= 25;
  };
  if (sprite.scale.x < 0) {sprite.scale.x += this.objZoomSpeed(); 
    } else {sprite.scale.x -= this.objZoomSpeed();
  };
  if (type === 1) {
    if (sprite.scale.x < 0) {sprite.x -= 2} else {sprite.x += 2};
    };
  sprite.scale.y = Math.abs(sprite.scale.x);
  if (this.needRefreshSprite(type,index)) {this.refreshSprite(sprite,index,type)};
};

//==============================
// * Need Refresh Sprite
//==============================
Scene_Title.prototype.needRefreshSprite = function(type,index) {
  if (this._duration[type][index] <= 0) {return true}
  return false;
};

Scene_Title.prototype.update = function() {
    this._background[0].origin.x += 1;
  //this._background[0].origin.y += 1;
    this._background[1].origin.x += 2; 
    if (!this.isBusy()) {
        this._commandWindow.open();
    }
    Scene_Base.prototype.update.call(this);
    this.resize;
};
