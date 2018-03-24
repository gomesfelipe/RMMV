//=============================================================================
// Animated_TitleScreen.js
//=============================================================================


var commands =['Menu1','Menu02','Menu03']
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
Scene_Title.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    this.createBackground();
    this.createForeground();
    //this.createWindowLayer();
   // this.createCommandWindow();
   this.createImageCommands();
};
Scene_Title.prototype.createImageCommands = function(){
	this._imageCommands = new Sprite();
	this._imageCommands.x = Graphics.Width/2-100;
	this._imageCommands.y = Graphics.height/2+100;
	this.addChild(this._imageCommands);
};

Scene_Title.prototype.loadImages = function() {
    this._back_img = [ImageManager.loadTitle1("Background_1"),
                       ImageManager.loadTitle1("Background_2"),
                      ];
    this._flower_img = ImageManager.loadTitle1("Flower");
    this._char_img = [];
    for (var i = 1; i < this._char_number ; i++) {
         this._char_img.push(ImageManager.loadTitle1("Char_" + i));
    };
};

Scene_Title.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    SceneManager.clearStack();
    this.centerSprite(this._backSprite1);
    this.centerSprite(this._backSprite2);
    this.playTitleMusic();
    this.startFadeIn(this.fadeSpeed(), false);
};
Scene_Title.prototype.update = function() {
	this._imageCommands.bitmap = ImageManager.loadSystem(commandsImages[this._commandWindow.index]);
    //if (!this.isBusy()) {
    //    this._commandWindow.open();
  //  }
    Scene_Base.prototype.update.call(this);
};

