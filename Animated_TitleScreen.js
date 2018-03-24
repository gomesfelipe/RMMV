//=============================================================================
// Animated_TitleScreen.js
//=============================================================================
/*:
 * @plugindesc (v0.05) Cena de titulo animado.
 * @author RocketKnight/Felipe Gomes
 */

var Imported = Imported || {};
var commands =['Menu1','Menu02','Menu03']
var GomesRocket = GomesRocket || {}; 
GomesRocket._char_number = Number(GomesRocket.parameters['Char Number'] || 4);
GomesRocket._char_frame = Number(GomesRocket.parameters['Char Number'] || 4);
GomesRocket._char_x = Number(GomesRocket.parameters['Char X-Axis'] || 0);
GomesRocket._char_y = Number(GomesRocket.parameters['Char Y-Axis'] || 0);


Scne_Title.prototype.createCommandWindow = function() {
	this._commandWindow = new Window_TitleCommand();
	this._commandWindow.visible = false;
	this._commandWindow.x = Graphics.Width * 2;
	this._commandWindow.y = Graphics.height * 2;
	this._commandWindow.setHandler('newGame',this.commandNewGame.bind(this));
	this._commandWindow.setHandler('continue',this.commandContinue.bind(this));
	this._commandWindow.setHandler('options',this.commandOptions.bind(this));
	this.addWindow(this._commandWindow);
};

Scene_Title.prototype.createImageCommands = function(){
	this._imageCommands = new Sprite();
	this._imageCommands.x = Graphics.Width/2-100;
	this._imageCommands.y = Graphics.height/2+100;
	this.addChild(this._imageCommands);
};

Scene_Title.prototype.loadImages = function() {
    this._back_img = [ImageManager.loadTitle1("Background_1"),
                      ];
};

Scene_Title.prototype.createBackground = function() {
  var width = Graphics.boxWidth * 2;
  var height = Graphics.boxHeight * 2;
  this._background = [];
  for (var i = 0; i < 2 ; i++) {
     this._background[i] = new TilingSprite(this._back_img[i]);
     this._background[i].move(0,0, width, height);
       this._background[i].anchor.x = 0.5;
     //this._background[i].anchor.y = 0.5;
     this._scenarioField.addChild(this._background[i]);
  }
  this._background[1].y = Graphics.boxHeight / 2;
  this._background[1].scale.x = 1.5;
  this._background[1].scale.y = 1.5;
};

Scene_Title.prototype.createCharacters = function() {

  };
};

Scene_Title.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    this.createBackground();
    this.createForeground();
    //this.createWindowLayer();
   // this.createCommandWindow();
   this.createImageCommands();
    this.createCharacters();
};


Scene_Title.prototype.update = function() {
	this._imageCommands.bitmap = ImageManager.loadSystem(commandsImages[this._commandWindow.index]);
  this._background[0].origin.x += 1;
    //if (!this.isBusy()) {
    //    this._commandWindow.open();
  //  }
    Scene_Base.prototype.update.call(this);
};

Scene_Title.prototype.initialize = function() {
    this._char_number = Math.min(Math.max(GomesRocket._char_number,1),999);
    this._char_number += 1;
    this._char_frame = Math.min(Math.max(GomesRocket._char_number,1),999);
    this._char_frame += 1;
    this.loadImages();  
    Scene_Base.prototype.initialize.call(this);
    SceneManager.clearStack();
    this.centerSprite(this._backSprite1);
    this.centerSprite(this._backSprite2);
    this.playTitleMusic();
    this.startFadeIn(this.fadeSpeed(), false);
};