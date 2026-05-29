const gifs = [
	"https://c.tenor.com/LmXWDEt07L0AAAAM/tenor.gif",
	"https://c.tenor.com/qcduD9P95RgAAAAd/tenor.gif",
	"https://c.tenor.com/f911hugXZHAAAAAd/tenor.gif",
	"https://c.tenor.com/wp52_ax4waUAAAAd/tenor.gif",
	"https://c.tenor.com/wp52_ax4waUAAAAd/tenor.gif",
	"https://c.tenor.com/2zdlJaB19iAAAAAd/tenor.gif",
	"https://c.tenor.com/yOleO_qKGccAAAAd/tenor.gif",
	"https://c.tenor.com/PREDV1I6I4gAAAAd/tenor.gif",
	"https://c.tenor.com/jm-992BT-4IAAAAd/tenor.gif",
	"https://c.tenor.com/4Q40PZIgfMUAAAAd/tenor.gif",
	"https://c.tenor.com/s0pElLSXstsAAAAd/tenor.gif",
	"https://c.tenor.com/wCHolCJgSBwAAAAd/tenor.gif",
	"https://c.tenor.com/pmH1WP4iSvwAAAAd/tenor.gif",
];

export function gerarGif() {
	const indexGif = Math.floor(Math.random() * gifs.length);
	var texto = "";
	switch (indexGif) {
		case 0:
			texto = "Cachorro fazendo panelaço";
			break;
		case 1:
			texto = "Cachorro careca da Quica";
			break;
		case 2:
			texto = "Dog com o sorriso Quica";
			break;
		case 3:
			texto = "Dog chapado com o briquedo";
			break;
		case 4:
			texto = "Cachorro pegando ônibus bem Quica";
			break;
		case 5:
			texto = "Chupetorro bem Quiquinha";
			break;
		case 6:
			texto = "Cachorro implorando por comida para Quica";
			break;
		case 7:
			texto = "Cachorro cafeinado da Quica";
			break;
		case 8:
			texto = "Flip Dog";
			break;
		case 9:
			texto = "Cachorro levando água para Quica";
			break;
		case 10:
			texto = "Cachorro esfomeado comendo a comida do Culega";
			break;
		case 11:
			texto = "Dog com a máscara da Quitéria";
			break;
		case 12:
			texto = "Cachorros da Quitéria pulando corda";
			break;
	}
	const gifUrl = gifs[indexGif];
	return { gifUrl, texto };
}
