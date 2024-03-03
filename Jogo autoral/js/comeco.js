class BemVindo extends Phaser.Scene{ // Classe de começo de jogo
    constructor(){
        super({key: 'BemVindo'})
        
    }



    preload() {
        // Assests utilizados
        this.load.image('telaLaranja', './assets/bg.png');
        this.load.image('play', './assets/play.png');
        this.load.image('titulo', './assets/titulo.png');
    }

    create(){
        //Gerar assets na tela
        this.add.image(500, 500, 'telaLaranja').setScale(2);
        this.add.image(250, 190, 'titulo').setScale(1);
        this.add.image(250, 300, 'play').setScale(0.5).setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>{ //Botão de play para começar o jogo
            this.scene.stop("BemVindo");
            this.scene.start("Rodando");
        })
    }
}