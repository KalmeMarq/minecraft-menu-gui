import GameConfiguration, { UserInformation, GameInformation, FolderInformation } from './lib/GameConfiguration.js';
import GameSettings from "./lib/GameSettings.js";
import Context2D from "./lib/renderer/Context2D.js";
import MainMenuScreen from "./lib/gui/screen/MainMenuScreen.js";
import KeyboardListener from "/lib/KeyboardListener.js";
import { MCCanvas } from "./lib/MCCanvas.js";
import MouseHelper from "./lib/MouseHelper.js";
import IngameMenu from './lib/gui/screen/IngameMenu.js';
import TextureManager from './lib/renderer/TextureManager.js';
import { setAssetsDir } from './lib/utils/ResourceLocation.js';
import TextureBuffer from './lib/renderer/TextureBuffer.js';
import IngameGui from './lib/gui/IngameGui.js';
import Splashes from './lib/utils/Splashes.js';
import ResourceLoadingGui from './lib/gui/ResourceLoadingGui.js';
let mcInstance;

export default class Minecraft {
  constructor(gameConfig) {
    setMCInstance(this);
    this.mccanvas = new MCCanvas(this);

    this.gameConfig = gameConfig;
    setAssetsDir(gameConfig.folderInfo.assetsDir);

    this.gameSettings = new GameSettings(this);
    this.updateWindowSize();

    this.mouseHelper = new MouseHelper(this);
    this.mouseHelper.registerCallbacks();

    this.keyboardListener = new KeyboardListener(this);
    this.keyboardListener.setupCallbacks();

    this.splashes = new Splashes(this.gameConfig.userInfo.username);

    this.textureManager = new TextureManager();
    this.textureBuffer = new TextureBuffer();

    this.running = true;
    this.isInsideWorld = false;

    this.loadingGui = null;
    this.isReloading = false;

    this.ingameGUI = new IngameGui(this);
    this.currentScreen = null;

    this.displayGuiScreen(new MainMenuScreen(true));

    // this.bot;

    // this.reloadResources();
  }

  async reloadResources() {
    this.setLoadingGui(new ResourceLoadingGui(this));
    this.isReloading = true;

    // await this.textureManager.load();
    // await this.fontRenderer.load();
    // await this.languageManager.reload();
    // await this.soundManager.reload();
    await this.splashes.reload();

    this.isReloading = false;
    this.setLoadingGui(null);
    return this.currentScreen.initScreen(this, this.mccanvas.getScaledWidth(), this.mccanvas.getScaledHeight());
  }

  updateWindowSize() {
    let i = this.mccanvas.calcGuiScale(this.gameSettings.guiScale);
    this.mccanvas.setGuiScale(i);
    
    if(this.currentScreen != null) {
       this.currentScreen.resize(this, this.mccanvas.getScaledWidth(), this.mccanvas.getScaledHeight());
    }

    this.mccanvas.canvas.width = window.innerWidth;
    this.mccanvas.canvas.height = window.innerHeight;

    Context2D.setup(this.mccanvas.getGuiScaleFactor(), true);

    console.log(this.mccanvas.canvas.width, this.mccanvas.canvas.height, "MCGUI resized");
  }

  run() {
    try {
      let loopFunc;

      const loop = () => {
        loopFunc = requestAnimationFrame(loop);

        if(this.running) {
          this.runGameLoop();
        } else {
          cancelAnimationFrame(loopFunc);
        }
      }

      loop();
    } catch(e) {
      console.log('Failed and stopped frame loop!');
    }
  }

  runGameLoop() {
    this.render();
  }

  render() {
    const i = (this.mouseHelper.getMouseX() / this.mccanvas.getGuiScaleFactor());
    const j = (this.mouseHelper.getMouseY() / this.mccanvas.getGuiScaleFactor());

    Context2D.clear();

    if(this.isInsideWorld) {
      if(!this.gameSettings.hideGUI || this.currentScreen != null) {
        this.ingameGUI.renderIngameGui();
      }
    }

    if(this.loadingGui != null) {
      this.loadingGui.render(i, j);
    } else if(this.currentScreen != null) {
      this.currentScreen.render(i, j);
    }
  }

  displayGuiScreen(guiScreen) {
    if(this.currentScreen != null) this.currentScreen.onClose();

    if(guiScreen == null && this.world == null) guiScreen = new MainMenuScreen();

    if(guiScreen instanceof MainMenuScreen) {
      this.gameSettings.showDebugInfo = false;
    }

    this.currentScreen = guiScreen;
    
    if(guiScreen != null) {
      guiScreen.initScreen(this, this.mccanvas.getScaledWidth(), this.mccanvas.getScaledHeight());
    }
  }

  setLoadingGui(loadingGuiIn) {
    this.loadingGui = loadingGuiIn;
  }

  getTextureManager() {
    return this.textureManager;
  }

  getSplashes() {
    return this.splashes;
  }
   
  async main() {
    this.currentScreen = null;

    this.connect(options)
  }

  async connect(options) {
      // const changeCallback = () => {
      //   if (document.pointerLockElement === renderer.domElement ||
      //     document.mozPointerLockElement === renderer.domElement ||
      //     document.webkitPointerLockElement === renderer.domElement) {
      //     document.addEventListener('mousemove', moveCallback, false);
      //     this.currentScreen = null;
      //   } else {
      //     document.removeEventListener('mousemove', moveCallback, false)
      //     this.displayGuiScreen(new IngameMenu());
      //   }
      // }
  
      // document.addEventListener('pointerlockchange', changeCallback, false)
      // document.addEventListener('mozpointerlockchange', changeCallback, false)
      // document.addEventListener('webkitpointerlockchange', changeCallback, false)
  
    
      // let i = true;

      // let lastTouch;
      // document.addEventListener('touchmove', (e) => {
      //   window.scrollTo(0, 0)
      //   e.preventDefault()
      //   e.stopPropagation()
      //   if (lastTouch !== undefined) {
      //     moveCallback({ movementX: e.touches[0].pageX - lastTouch.pageX, movementY: e.touches[0].pageY - lastTouch.pageY })
      //   }
      //   lastTouch = e.touches[0]
      // }, { passive: false })
      // document.addEventListener('touchend', (e) => {
      //   window.scrollTo(0, 0)
      //   e.preventDefault()
      //   e.stopPropagation()
      //   lastTouch = undefined
      // }, { passive: false })
  
      // renderer.domElement.requestPointerLock = renderer.domElement.requestPointerLock ||
      //   renderer.domElement.mozRequestPointerLock ||
      //   renderer.domElement.webkitRequestPointerLock
      // document.addEventListener('mousedown', (e) => {
      //   renderer.domElement.requestPointerLock()
      // })

      // document.addEventListener('mousedown', (e) => {
      //   if(i || (!(document.pointerLockElement === renderer.domElement ||
      //     document.mozPointerLockElement === renderer.domElement ||
      //     document.webkitPointerLockElement === renderer.domElement) && this.currentScreen === null)) {
      //     renderer.domElement.requestPointerLock();
      //     i = false;
      //   }
      // });
  
      // document.addEventListener('contextmenu', (e) => e.preventDefault(), false)
  
      // const codes = {
      //   KeyW: 'forward',
      //   KeyS: 'back',
      //   KeyA: 'right',
      //   KeyD: 'left',
      //   Space: 'jump',
      //   ShiftLeft: 'sneak',
      //   ControlLeft: 'sprint'
      // }
  
      // document.addEventListener('keydown', (e) => {
      //   if (chat.inChat) return
      //   console.log(e.code)
      //   if (e.code in codes) {
      //     bot.setControlState(codes[e.code], true)
      //   }
      //   if (e.code.startsWith('Digit')) {
      //     const numPressed = e.code.substr(5)
      //     hotbar.reloadHotbarSelected(numPressed - 1)
      //   }
      //   if (e.code === 'KeyQ') {
      //     if (bot.heldItem) bot.tossStack(bot.heldItem)
      //   }
      // }, false)
  
      // document.addEventListener('keyup', (e) => {
      //   if (e.code in codes) {
      //     bot.setControlState(codes[e.code], false)
      //   }
      // }, false)
  
      // document.addEventListener('mousedown', (e) => {
      //   if (document.pointerLockElement !== renderer.domElement) return
  
      //   const cursorBlock = bot.blockAtCursor()
      //   if (!cursorBlock) return
  
      //   if (e.button === 0) {
      //     if (bot.canDigBlock(cursorBlock)) {
      //       bot.dig(cursorBlock, 'ignore')
      //     }
      //   } else if (e.button === 2) {
      //     const vecArray = [new Vec3(0, -1, 0), new Vec3(0, 1, 0), new Vec3(0, 0, -1), new Vec3(0, 0, 1), new Vec3(-1, 0, 0), new Vec3(1, 0, 0)]
      //     const vec = vecArray[cursorBlock.face]
  
      //     const delta = cursorBlock.intersect.minus(cursorBlock.position)
      //     bot._placeBlockWithOptions(cursorBlock, vec, { delta, forceLook: 'ignore' })
      //   }
      // }, false)
  
      // document.addEventListener('mouseup', (e) => {
      //   bot.stopDigging()
      // }, false)
  
      // loadingScreen.status = 'Done!'
      // console.log(loadingScreen.status) // only do that because it's read in index.html and npm run fix complains.

      // setTimeout(function () {
      //   // remove loading screen, wait a second to make sure a frame has properly rendered
      //   loadingScreen.style = 'display: none;'
      // }, 2500)


      this.isInsideWorld = true;
  
      // TODO: Remove after #85 is done
    //   debugMenu.customEntries.hp = bot.health
    //   debugMenu.customEntries.food = bot.food
    //   debugMenu.customEntries.saturation = bot.foodSaturation
  
    //   bot.on('health', () => {
    //     debugMenu.customEntries.hp = bot.health
    //     debugMenu.customEntries.food = bot.food
    //     debugMenu.customEntries.saturation = bot.foodSaturation
    //   })
    // })
  }
}

export function setMCInstance(instance) {
  mcInstance = instance;
}

export function getMCInstance() {
  return mcInstance;
}

class Main {
  static main() {
    const gameConfig = new GameConfiguration(new UserInformation('Steve'), new GameInformation(false, 'X.X.X', 'vanilla', false, false), new FolderInformation('./extra-textures/'));

    let mc;
    try {
      mc = new Minecraft(gameConfig);
    } catch(e) {
      console.log("Failed to initialize MC GUI: " + e);
    }

    try {
      mc.run();
    } catch(e) {
      console.log("Failed to run MC GUI: " + e);
    }
  }
}

Main.main();