//=============================================================================
// Animated_TitleScreen.js
//=============================================================================
/*:
 * @plugindesc (v0.05) Cena de titulo animado.
 * @author RocketKnight/Felipe Gomes

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
 * @param W
 * @type number
 * @desc Setup the button size as pixel unit.
 * (Include the macro string called 'W' and then it replaces as a real value.)
 * @default 78
 * @min 1
 *
 * @param H
 * @type number
 * @desc Setup the button size as pixel unit.
 * (Include the macro string called 'H' and then it replaces as a real value.)
 * @default 78
 * @min 1
 
  */

　　var Imported = Imported || {};
　　Imported.Animated_TitleScreen = true;
　　var GomesRocket = GomesRocket || {}; 
  GomesRocket.parameters = PluginManager.parameters('Animated_TitleScreen');

//==============================
// * Initialize
//==============================
var _alia_gomes_rocket_initialize = Scene_Title.prototype.initialize;
Scene_Title.prototype.initialize = function() { 
    _alia_gomes_rocket_initialize.call(this);
  this._scenarioField = new Sprite();
  this._scenarioField.x = Graphics.width / 2;
  this._scenarioField.y = Graphics.height / 2;
  this._scenarioField.scale.x = 1.00;
  this._scenarioField.scale.y = this._scenarioField.scale.x;
  this.addChild(this._scenarioField);
  this._firstRefresh = true;
  this.loadImages();  
};

//==============================
// * Load Images
//==============================
Scene_Title.prototype.loadImages = function() {
  this._back_img = [ImageManager.loadTitle1("layer_1"),
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
    var width = Graphics.width * 2;
  var height = Graphics.height * 2;
  this._background = [];
  for (var i = 0; i < 2 ; i++) {
     this._background[i] = new TilingSprite(this._back_img[i]);
     this._background[i].move(0,0, width, height);
       this._background[i].anchor.x = 0.5;
     this._background[i].anchor.y = 0.5;
     this._scenarioField.addChild(this._background[i]);
  }
  this._background[1].y = Graphics.boxHeight / 2;
  this._background[1].scale.x = 1.5;
  this._background[1].scale.y = 1.5;
};


Scene_Title.prototype.update = function() {
    this._background[0].origin.x += 1;
    this._background[0].origin.y = Graphics.height / 2;
    this._background[1].origin.x += 2; 
    if (!this.isBusy()) {
        this._commandWindow.open();
    }
    Scene_Base.prototype.update.call(this);
};
