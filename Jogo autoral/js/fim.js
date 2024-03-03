class GameOver extends Phaser.Scene{ // Classe de final de jogo
    constructor(){
        super({key: 'GameOver'})
    }

    preload(){
        // Assets extraídos da pasta
        this.load.image('telaLaranja', './assets/bg.png');
        this.load.image('parabens', './assets/venceu.png');
        this.load.image('restart', './assets/restart.png');
        this.load.image('autor', './assets/marcelo.png');
    }

    create(){
        // Gerar elementos extraídos na tela 
        this.add.image(250, 250, 'telaLaranja').setScale(1);
        this.add.image(250, 200, 'parabens').setScale(1);
        this.add.image(250, 400, 'autor').setScale(0.5);
        this.add.image(250, 300, 'restart').setScale(0.5).setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>{ // Botão de restart, para recomeçar o jogo
            this.scene.stop("GameOver");
            this.scene.start("Rodando");
        })
    }
}