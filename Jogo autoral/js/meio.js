//Variáveis
var teclas;
var gaspar;
var deslocando;
var pontuacao = 0;
var placar;

class Rodando extends Phaser.Scene{ //Classe com as configurações da jogatina
    constructor(){
        super({key: 'Rodando',
            physics: {
            default: 'arcade',
            arcade:{
                gravity: {y: 300}, // Física do jogo
                debug: false // Esconder hitbox de elementos
            }
        }})
    }

    preload(){
        //extrair os assets da pasta
        this.load.image('telaLaranja', 'assets/bg.png');
        this.load.spritesheet('gaspar', 'assets/gaspar.png', {frameWidth: 19, frameHeight: 45});
        this.load.spritesheet('moeda', 'assets/moeda.png', {frameWidth: 23, frameHeight: 23});
        this.load.image('pedra', 'assets/pedra.png');
        this.load.image('porta', 'assets/porta.png');
        this.load.image('lava', 'assets/lava.png');
    }

    create(){
        //Gerar o bg do mapa
        this.add.image(250, 250, 'telaLaranja');
        // Geração de todos os elementos interativos da cena (obstáculos, moedas, player e elemento de transição de cena)
        var pedra1 = this.physics.add.staticImage(50, 450, 'pedra').setSize(44, 28).setScale(0.2);
        var pedra2 = this.physics.add.staticImage(130, 425, 'pedra').setSize(44, 28).setScale(0.2);
        var pedra3 = this.physics.add.staticImage(210, 400, 'pedra').setSize(44, 28).setScale(0.2);
        var pedra4 = this.physics.add.staticImage(290, 375, 'pedra').setSize(44, 28).setScale(0.2);
        var pedra5 = this.physics.add.staticImage(370, 350, 'pedra').setSize(44, 28).setScale(0.2);
        var pedra6 = this.physics.add.staticImage(450, 325, 'pedra').setSize(44, 28).setScale(0.2);
        var porta = this.physics.add.staticImage(450, 290, 'porta');
        var moeda1 = this.physics.add.sprite(50, 400, 'moeda');
        var moeda2 = this.physics.add.sprite(130, 375, 'moeda');
        var moeda3 = this.physics.add.sprite(210, 350, 'moeda');
        var moeda4 = this.physics.add.sprite(290, 325, 'moeda');
        var moeda5 = this.physics.add.sprite(370, 300, 'moeda');
        
        gaspar = this.physics.add.sprite(50, 200, 'gaspar').setCollideWorldBounds(true);

        // adição do placar
        placar = this.add.text(16, 16, 'Moedas:' + pontuacao, {fontSize:'45px', fill:'#000'});

        // Animação do personagem Gaspar tanto parado
        gaspar.anims.create({
            key: 'parado',
            frames: this.anims.generateFrameNumbers('gaspar', {start: 0, end: 0}),
            frameRate: 10,
            repeat: -1
        });
        //quanto em movimento
        gaspar.anims.create({
            key: 'movimento',
            frames: this.anims.generateFrameNumbers('gaspar', {start: 1, end: 3}),
            frameRate: 10,
            repeat: -1
        });

        //Lista com todas as pedras e moedas, colocando valores de colisão entre eles e o player
        var pedras = [pedra1, pedra2, pedra3, pedra4, pedra5, pedra6];
        var moedas = [moeda1, moeda2, moeda3, moeda4, moeda5];
        for( var p = 0; p<pedras.length; p++){
            this.physics.add.collider(gaspar, pedras[p]);
        }

        for(var m = 0; m<moedas.length; m++){
            for(var p = 0; p<pedras.length; p++){
                this.physics.add.collider(moedas[m], pedras[p]);
            }
        }
        // troca de cenas
        this.physics.add.overlap(gaspar, porta, () => {
            pontuacao = 0;
            this.scene.stop('Rodando');
            this.scene.start('GameOver');
        });
        // Coleta de todas as moedas
        this.physics.add.overlap(gaspar, moeda1, function() {
            pontuacao += 1;
            moeda1.disableBody(true, true);
            placar.setText('Moedas: ' + pontuacao);
        });

        this.physics.add.overlap(gaspar, moeda2, function() {
            pontuacao += 1;
            moeda2.disableBody(true, true);
            placar.setText('Moedas: ' + pontuacao);
        });

        this.physics.add.overlap(gaspar, moeda3, function() {
            pontuacao += 1;
            moeda3.disableBody(true, true);
            placar.setText('Moedas: ' + pontuacao);
        });

        this.physics.add.overlap(gaspar, moeda4, function() {
            pontuacao += 1;
            moeda4.disableBody(true, true);
            placar.setText('Moedas: ' + pontuacao);
        });

        this.physics.add.overlap(gaspar, moeda5, function() {
            pontuacao += 1;
            moeda5.disableBody(true, true);
            placar.setText('Moedas: ' + pontuacao);
        });

        // input das teclas
        teclas = this.input.keyboard.createCursorKeys();


    }

    update() {
        //Configuração de adição as teclas
        if(teclas.up.isDown && gaspar.body.touching.down){ // ( ^ )
            gaspar.setVelocityY(-200); // Velocidade de movimento no eixo Y
            var pular = true;
        } else {
            if (pular){
                gaspar.setVelocityY(0);
                pular = false;
            }
        }

        if (teclas.left.isDown){  // ( <- )
            gaspar.setVelocityX(-100); //velocidade de movimento no eixo X
            gaspar.setFlipX(true); // giro do Gaspar
            animado();
        } else if(teclas.right.isDown){ //( -> )
            gaspar.setVelocityX(100);
            gaspar.setFlipX(false);
            animado();
        } else {
            gaspar.setVelocityX(0);
            gaspar.anims.play("parado");
            deslocando = false;
        }

    }

}
    // Função fora da classe que serve para chamar a animação de deslocamento apenas uma vez
    function animado() {
        if (!deslocando){
            deslocando = true;
            gaspar.anims.play("movimento")
        }
    } 
