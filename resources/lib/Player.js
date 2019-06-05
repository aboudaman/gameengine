import Texture from "./Texture";
import Sprite from "./Sprite";

const texture = new Texture("../resources/images/fly50.png");
class Player extends Sprite{
    constructor() {
        super(texture)
        this.w = 100;
        this.h = 100;
    }
}

export default Player;