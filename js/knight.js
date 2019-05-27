const SQUARES = {//массив индексов полей доски
  A8:   0, B8:   1, C8:   2, D8:   3, E8:   4, F8:   5, G8:   6, H8:   7,
  A7:  16, B7:  17, C7:  18, D7:  19, E7:  20, F7:  21, G7:  22, H7:  23,
  A6:  32, B6:  33, C6:  34, D6:  35, E6:  36, F6:  37, G6:  38, H6:  39,
  A5:  48, B5:  49, C5:  50, D5:  51, E5:  52, F5:  53, G5:  54, H5:  55,
  A4:  64, B4:  65, C4:  66, D4:  67, E4:  68, F4:  69, G4:  70, H4:  71,
  A3:  80, B3:  81, C3:  82, D3:  83, E3:  84, F3:  85, G3:  86, H3:  87,
  A2:  96, B2:  97, C2:  98, D2:  99, E2: 100, F2: 101, G2: 102, H2: 103,
  A1: 112, B1: 113, C1: 114, D1: 115, E1: 116, F1: 117, G1: 118, H1: 119
};
  
const OFFSETS = [-18, -33, -31, -14,  18, 33, 31,  14];//массив всех перемещений коня

 /**
 * генерирует возможные ходы
 * @param from - индекс поля 
 * @return moves - массив объектов, содержащих возможные ходы
 */  
function generate_moves(from) {

  let moves = [];
  let index;

  if (from in SQUARES) {//проверяем существует ли такой индекс
    index = SQUARES[from];
  } else {
    //недействительный индекс
    return [];
  }
      
  for (let i = 0, len = OFFSETS.length; i < len; i++) {// перебираем массив всех перемещений
    let offset = OFFSETS[i];
    
    let square = index+offset;//индекс поля назначения
    
    if (!(square & 0x88)){//проверка на выход за пределы доски
       
      let to;
      
      for (let key in SQUARES) {
        if (square === SQUARES[key]) to = key;
      }
      
      let move = {
        from: from,
        to: to,
      };
      
      moves.push(move);
    }
  }
        
  return moves;
};

// обрабатываем событие клик мыши по полю
$('body').on('click', '.box .input_add', function(e) {
    e.preventDefault();
    let str = 'Возможные варианты хода:\n';
    let from = $('.box .coord').val();
    
    let re = /^[ABCDEFGH][0-8]$/;//шаблон регулярного выражения для проверки правильности ввода
    let x = re.test(from);//проверяем правильность ввода
        
    if ( x ) {//если ввод правильный
        let moves = generate_moves(from); // генерируем все возможные перемещения
        for (let i = 0, len = moves.length; i < len; i++) {
          str += ' '+moves[i].to;
        }
        
        alert(str);
    } else {
        alert("Некорректный ввод");
    }
});
