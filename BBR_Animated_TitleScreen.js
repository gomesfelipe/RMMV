//=============================================================================
// BBR_Animated_TitleScreen.js
//=============================================================================
/*:
 * @plugindesc (v0.05) Cena de titulo animado.
 * @author RocketKnight/Felipe Gomes

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
 *
 * @param Char Number
 * @desc Setup the number of the characters on screen.
 * @default 4
 *  
 * @param W
 * @type number
 * @desc Setup the button size as pixel unit.
 * (Include the macro string called 'W' and then it replaces as a real value.)
 * @default 246
 * @min 1
 *
 * @param H
 * @type number
 * @desc Setup the button size as pixel unit.
 * (Include the macro string called 'H' and then it replaces as a real value.)
 * @default 373
 * @min 1
 *
  */

　var Imported = Imported || {};
　Imported.BBR_Animated_TitleScreen = true;
　var GomesRocket = GomesRocket || {}; 
 GomesRocket.parameters = PluginManager.parameters('BBR_Animated_TitleScreen');
 GomesRocket.bbr_char_number = Number(GomesRocket.parameters['Char Number'] || 4);

//==============================
// * Initialize
//==============================
var _alia_gomes_rocket_initialize = Scene_Title.prototype.initialize;
Scene_Title.prototype.initialize = function() { 
    _alia_gomes_rocket_initialize.call(this);
  this._char_number = Math.min(Math.max(GomesRocket.bbr_char_number,1),999);
  this._char_number += 1
  this._scenarioField = new Sprite();
  this._scenarioField.x = Graphics.width / 2;
  this._scenarioField.y = Graphics.height / 2;
  this._scenarioField.scale.x = 1.00;
  this._scenarioField.scale.y = this._scenarioField.scale.x; 
  
  this.addChild(this._scenarioField);
  this.loadImages(); 
  this.createCharacters(); 
};

//==============================
// * Load Images
//==============================
Scene_Title.prototype.loadImages = function() {
  this._back_img = [ImageManager.loadTitle1("layer_1"),
                     ImageManager.loadTitle1("layer_2"),
            ];
 this._char_img = [];
  for (var i = 1; i < this._char_number ; i++) {
       this._char_img.push(ImageManager.loadTitle1("Char_" + i));
  };
  this.createCharacters(); 

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
  this._background[1].y = Graphics.height / 2;
  this._background[1].scale.x = 1.5;
  this._background[1].scale.y = 1.5;
};

//==============================
// * Create Characters
//==============================
Scene_Title.prototype.createCharacters = function() {
  this._char_index = 0;
  this._chars = [];

  for (var i = 0; i < this._char_number ; i++) {
     this._chars[i] = new Sprite();
     this._chars[i].anchor.x = 1.0;
     this._chars[i].anchor.y = 1.0;
     this._chars[i].position.x = -this._chars[i].width/2;
      if (i==0) {
        this._chars[0].x= Graphics.width / 2-160;
      } else if (i==1) {
        this._chars[1].x= Graphics.width / 2+10;
      } else if (i==2) {
        this._chars[2].x= Graphics.width / 2+193;
      } else if (i==3) {
        this._chars[3].x= Graphics.width / 2+410
      }  
     this._chars[i].y = Graphics.height / 2+225;
     this.addChild(this._chars[i]);

  };
  
  for (var i = 0; i < this._char_img.length  ; i++) {  
        this._chars[i].bitmap = this._char_img[i];
   };
};

Scene_Title.prototype.update = function() {
    this._background[0].origin.x += 1;
    this._background[0].origin.y = Graphics.height / 2;
    this._background[1].origin.x += 2; 
   // this.animateCharacters();
    if (!this.isBusy()) {
        this._commandWindow.open();
    }
    Scene_Base.prototype.update.call(this);
};
