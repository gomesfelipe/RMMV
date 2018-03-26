//=============================================================================
// Animated_TitleScreen.js
//=============================================================================
/*:
 * @plugindesc (v0.1) Cena de titulo animado.
 * @author RocketKnight/Felipe Gomes
 *
 //=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
 *
 * @param Char Number
 * @desc Definição da quantidade de imagens dos personagens.
 * @default 4
 *  
 * @param Char X-Axis
 * @desc Definição X-axis da imagem dos personagens.
 * @default 0
 *
 * @param Char Y-Axis
 * @desc Definição Y-axis da imagem dos personagens.
 * @default 0
 *
 */

　　var Imported = Imported || {};
　　Imported.Animated_TitleScreen = true;
　　var GomesRocket = GomesRocket || {}; 
    GomesRocket.parameters = PluginManager.parameters('Animated_TitleScreen');
    GomesRocket.bbr_char_number = Number(GomesRocket.parameters['Char Number'] || 4);
    GomesRocket.bbr_char_x = Number(GomesRocket.parameters['Char X-Axis'] || 0);
    GomesRocket.bbr_char_y = Number(GomesRocket.parameters['Char Y-Axis'] || 0);

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
  this._char_number = Math.min(Math.max(GomesRocket.bbr_char_number,1),999);
  this._char_number += 1;
  this.loadImages();  
};


//==============================
// * Load Images
//==============================
Scene_Title.prototype.loadImages = function() {
  this._back_img = [ImageManager.loadTitle1("Background_1"),
                     ImageManager.loadTitle1("layer_2"),
            ];
  this._char_img = [];
  for (var i = 1; i < this._char_number ; i++) {
       this._char_img.push(ImageManager.loadTitle1("Char_" + i));
  };
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
  var height = Graphics.height* 2;
  this._background = [];
         window.innerHeight/Graphics.height);
  for (var i = 0; i < 2 ; i++) {
     this._background[i] = new TilingSprite(this._back_img[i]);
     this._background[i].move(0,0, width, height);
       this._background[i].anchor.x = 0.5;
     this._background[i].anchor.y = 0.5;
     this._scenarioField.addChild(this._background[i]);
  }
  this._background[0].scale.x = Math.min(window.innerWidth/Graphics.width);
  this._background[0].scale.y = Math.min(window.innerHeight/Graphics.height);
  this._background[1].y = Graphics.boxHeight / 2;
  this._background[1].scale.x = Math.min(window.innerWidth/Graphics.width);
  this._background[1].scale.y = Math.min(window.innerHeight/Graphics.height);
  this.createBBRSprites();
};

//==============================
// * Create BBRSprites
//==============================
Scene_Title.prototype.createBBRSprites = function() {
  this.createCharacters();
};

//==============================
// * Create Characters
//==============================
Scene_Title.prototype.createCharacters = function() {
  this._char_index = 0;
  this._chars = [];
  for (var i = 0; i < 6 ; i++) {
     this._chars[i] = new Sprite();
     this._chars[i].anchor.x = 0.5;
     this._chars[i].anchor.y = 1;
     this._chars[i].x = Graphics.width / 2;
     this._chars[i].y = Graphics.height / 2;
  };
};


Scene_Title.prototype.update = function() {
    this._background[0].origin.x += 1;
  //this._background[0].origin.y += 1;
    this._background[1].origin.x += 2; 
  for (var i = 0; i < 6 ; i++) {
   // this.updateSprites(this._chars[i],i,1); 
  };
    Scene_Base.prototype.update.call(this);
};

