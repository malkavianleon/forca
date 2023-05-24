//Referências Iniciais
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");

//Array com as opções
let options = {
    frutas: [
      "Abacate",
      "Abacaxi",
      "Acerola",
      "Ameixa",
      "Amora",
      "Ananas",
      "Banana",
      "Cacau",
      "Caju",
      "Carambola",
      "Cereja",
      "Coco",
      "Damasco",
      "Figo",
      "Goiaba",
      "Groselha",
      "Jabuticaba",
      "Kiwi",
      "Laranja",
      "Limao",
      "Maca",
      "Mamao",
      "Manga",
      "Maracuja",
      "Melancia",
      "Melao",
      "Morango",
      "Pera",
      "Pessego",
      "Pitanga",
      "Roma",
      "Tangerina",
      // Adicione mais frutas aqui...
    ],
    animais: [
      "Cachorro",
      "Gato",
      "Leao",
      "Tigre",
      "Elefante",
      "Girafa",
      "Zebra",
      "Urso",
      "Rinoceronte",
      "Hipopotamo",
      "Cavalo",
      "Vaca",
      "Porco",
      "Ovelha",
      "Cabra",
      "Coelho",
      "Rato",
      "Camelo",
      "Macaco",
      "Panda",
      "Gorila",
      "Pinguim",
      "Tartaruga",
      "Cobra",
      "Avestruz",
      "Crocodilo",
      "Baleia",
      "Tubarao",
      "Polvo",
      "Peixe",
      "Esquilo",
      "Castor",
      // Adicione mais animais aqui...
    ],
    Países: [
        "Afeganistao",
        "Argentina",
        "Australia",
        "Brasil",
        "Canada",
        "China",
        "Dinamarca",
        "Egito",
        "Franca",
        "Alemanha",
        "India",
        "Italia",
        "Japao",
        "Quenia",
        "Mexico",
        "Paises Baixos",
        "Noruega",
        "Peru",
        "Catar",
        "Russia",
        "Espanha",
        "Suecia",
        "Tailandia",
        "Ucrania",
        "Reino Unido",
        "Estados Unidos",
        "Venezuela",
        "Iemen",
        "Zambia",
        "Zimbabue"
    ],
  };

//contadores
let winCount = 0;
let count = 0;

let chosenWord = "";

//Display de opções de botões
const displayOptions = () => {
  optionsContainer.innerHTML += `<h3>Por favor selecione uma das 3 opções!</h3>`;
  let buttonCon = document.createElement("div");
  for (let value in options) {
    buttonCon.innerHTML += `<button id="teste" class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  optionsContainer.appendChild(buttonCon);
};

//Bloquei de todos os botões
const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");
  //Desabilitar todas as opções
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });

  //Desabilitar as Letras
  letterButtons.forEach((button) => {
    button.disabled.true;
  });
  newGameContainer.classList.remove("hide");
};

//Gerador de Palavra
const generateWord = (optionValue) => {
  let optionsButtons = document.querySelectorAll(".options");
  //Se os valores forem correspondentes faça referência ao botão
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });

  //Reinicializa as letras e esconde a palavra
  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";

  let optionArray = options[optionValue];
  //escolhe uma palavra aleatória
  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  chosenWord = chosenWord.toUpperCase();

  //esconde as letras e substitui as palavras por _ pra cada letra que existir na palavra
  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');

  //Mostra a Letra correspondente na tag span
  userInputSection.innerHTML = displayItem;
};

//Função inicial (Chamada quando o usuário carrega a página e aperta Novo Jogo)
const initializer = () => {
  winCount = 0;
  count = 0;

  //Reinicializa e deleta todo conteúdo para usuário começar novo jogo
  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";

  //Um For para Criar os botões das letras
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    //Converte números em letras[A-Z]
    button.innerText = String.fromCharCode(i);
    //Eventlistener para o click do mouse
    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");
      let dashes = document.getElementsByClassName("dashes");
      //Se o valor for correspondente coloque na tela, se não desenha o canva
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          //if character in array is same as clicked button
          if (char === button.innerText) {
            //replace dash with letter
            dashes[index].innerText = char;
            //increment counter
            winCount += 1;
            //if winCount equals word lenfth
            if (winCount == charArray.length) {
              resultText.innerHTML = `<h2 class='win-msg'>Você Venceu!!</h2><p>A palavra era...... <span>${chosenWord}</span></p>`;
              //block all buttons
              blocker();
            }
          }
        });
      } else {
        //lose count
        count += 1;
        //for drawing man
        drawMan(count);
        //Count==6 because head,body,left arm, right arm,left leg,right leg
        if (count == 6) {
          resultText.innerHTML = `<h2 class='lose-msg'>Você Perdeu!!</h2><p>A palavra era...... <span>${chosenWord}</span></p>`;
          blocker();
        }
      }
      //disable clicked button
      button.disabled = true;
    });
    letterContainer.append(button);
  }

  displayOptions();
  //Call to canvasCreator (for clearing previous canvas and creating initial canvas)
  let { initialDrawing } = canvasCreator();
  //initialDrawing would draw the frame
  initialDrawing();
};

//Canvas
const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;

  //For drawing lines
  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };

  const head = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  const body = () => {
    drawLine(70, 40, 70, 80);
  };

  const leftArm = () => {
    drawLine(70, 50, 50, 70);
  };

  const rightArm = () => {
    drawLine(70, 50, 90, 70);
  };

  const leftLeg = () => {
    drawLine(70, 80, 50, 110);
  };

  const rightLeg = () => {
    drawLine(70, 80, 90, 110);
  };

  //initial frame
  const initialDrawing = () => {
    //clear canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    //bottom line
    drawLine(10, 130, 130, 130);
    //left line
    drawLine(10, 10, 10, 131);
    //top line
    drawLine(10, 10, 70, 10);
    //small top line
    drawLine(70, 10, 70, 20);
  };

  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

//draw the man
const drawMan = (count) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
  switch (count) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      break;
    default:
      break;
  }
};

//New Game
newGameButton.addEventListener("click", initializer);
window.onload = initializer;