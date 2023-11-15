const webcam = require('node-webcam');
const fs = require('fs');

// Configurações da webcam
const opts = {
  width: 1280,
  height: 720,
  quality: 100,
  delay: 0,
  saveShots: true,
  output: 'PNG',
  device: false,
  callbackReturn: 'location',
};

// Caminho do arquivo de destino
const filePath = 'teste.PNG';

// Função para tirar uma foto e salvar
function takeAndSavePhoto() {
  webcam.capture('test_picture', opts, (err, data) => {
    if (err) {
      console.error('Erro ao capturar a imagem:', err);
    } else {
      // Renomeia a imagem capturada para o nome desejado
      const newName = `${__dirname}/${filePath}`;
      fs.rename(data, newName, (renameErr) => {
        if (renameErr) {
          console.error('Erro ao renomear a imagem:', renameErr);
        } else {
          console.log(`Imagem salva em: ${newName}`);
        }
      });
    }
  });
}

// Função para tirar e salvar uma foto, e configurar o intervalo de 10 segundos
function startPhotoInterval() {
  // Executa a função a cada 10 segundos
  setInterval(() => {
    takeAndSavePhoto();
  }, 10000); // 10000 milissegundos = 10 segundos
}

// Verifica se a imagem já existe
if (fs.existsSync(filePath)) {
  // Se existir, exclui a imagem anterior
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Erro ao excluir a imagem anterior:', err);
    } else {
      console.log('Imagem anterior excluída com sucesso.');
      // Inicia o intervalo após excluir a imagem anterior
      startPhotoInterval();
    }
  });
} else {
  // Se não existir, simplesmente tira e salva uma foto e inicia o intervalo
  takeAndSavePhoto();
  startPhotoInterval();
}
