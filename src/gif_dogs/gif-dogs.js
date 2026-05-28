const gifs = [
	"https://media.tenor.com/LmXWDEt07L0AAAAM/cachorro-batendo-panela-n-peita.gif",
	"https://media1.tenor.com/m/qcduD9P95RgAAAAd/dog-bald-dog.gif",
	"https://media1.tenor.com/m/f911hugXZHAAAAAd/scrunchy-dog-awkward-smile.gif",
	"https://media1.tenor.com/m/wp52_ax4waUAAAAd/dachshund-dog.gif",
	"https://media1.tenor.com/m/y1_R-Cyg6noAAAAd/cachorro-no%C3%B4nibus.gif",
	"https://media1.tenor.com/m/2zdlJaB19iAAAAAd/cute-dog.gif",
	"https://media1.tenor.com/m/yOleO_qKGccAAAAd/puppy-dog.gif",
	"https://media1.tenor.com/m/PREDV1I6I4gAAAAd/dog-feral.gif",
	"https://media1.tenor.com/m/jm-992BT-4IAAAAd/dog-dog-backwards.gif",
	"https://media1.tenor.com/m/4Q40PZIgfMUAAAAd/k%C3%B6pek-dog.gif",
	"https://media1.tenor.com/m/s0pElLSXstsAAAAd/kreggy-dog.gif",
	"https://media1.tenor.com/m/wCHolCJgSBwAAAAd/dog-dog-funny.gif",
	"https://media1.tenor.com/m/pmH1WP4iSvwAAAAd/dog-jump.gif",
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
