// Carregar FileSaver.js via CDN
var script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js';
document.head.appendChild(script);

// Função para forçar o download da imagem
function downloadImage(url, filename) {
    fetch(url)
        .then(response => response.blob())  // Converte a resposta para Blob
        .then(blob => {
            console.log('baixando ' + filename);
            saveAs(blob, filename);  // Baixa a imagem com o nome desejado
        })
        .catch(error => console.error('Erro ao fazer o download:', error));
}

// Função para processar as imagens e iniciar os downloads
window.baixar = f => {
    // Seleciona o elemento que contém as imagens
    const section = document.querySelector('section.main-carousel-container');
    
    if (!section) {
        console.log('Elemento <section> não encontrado!');
        return;
    }

    // Seleciona todos os elementos <picture> dentro da seção
    const pictures = section.querySelectorAll('picture');

    if (pictures.length === 0) {
        console.log('Nenhuma imagem encontrada!');
        return;
    }

    // Para cada <picture>, extrai os srcsets das <source>
    pictures.forEach((picture, index) => {
        const sources = picture.querySelectorAll('source');

        sources.forEach((source, i) => {
            const srcset = source.getAttribute('srcset');
            const urls = srcset.split(',');

            // Para cada URL no srcset, faz o download da imagem
            urls.forEach((url, j) => {
                const cleanUrl = url.split(' ')[0].trim(); // Remove o tamanho e obtém apenas a URL
                const filename = `imagem_${index + 1}_${i + 1}_${j + 1}.webp`; // Gera um nome único para cada versão de imagem
                downloadImage(cleanUrl, filename); // Força o download da imagem
            });
        });
    });

    console.log('Iniciando o download das imagens...');
};
