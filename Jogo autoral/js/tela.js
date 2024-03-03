var config = {
    type: Phaser.AUTO,
    width: 500,
    height: 500,

    scene: [BemVindo, Rodando, GameOver] //Ser comum a todas as cenas
    
};

var game = new Phaser.Game(config);

//Configurações de dimensionamento da tela através do Phaser em uma pasta separada