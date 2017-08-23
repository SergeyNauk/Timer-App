import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  numberOfElement: number = 0;
  numberOfFinished: string;
  public message: string = 'Status:Waiting...';

  constructor() {
  }

  createTimer(itemOfInterval = 5){
      this.numberOfElement++;//номер элемента по счету

      let container =  document.createElement('div');// хранилище для таймера
      document.getElementById('wrapper').appendChild(container);

      let btnDel = document.createElement('button');
      container.appendChild(btnDel);
      btnDel.innerHTML = 'Delete';
      btnDel.style.borderRadius = '5px';
      btnDel.addEventListener('click', removeTimer);

      function removeTimer(){
        clearInterval(timer);
        document.getElementById('wrapper').removeChild(this.parentNode)
      };

      let headerOfTimer = document.createElement('span');//заголовок перед каждым таймером
      container.appendChild(headerOfTimer);
      headerOfTimer.innerHTML = ` Timer #${this.numberOfElement}`;

      let elem = document.createElement('p');//в этот абзац будет рендериться текущее значение времени таймера
      container.appendChild(elem);

      //let itemOfInterval = 5;
      let timer = setInterval(function(){
        if (itemOfInterval > 0){
          itemOfInterval = itemOfInterval - 0.01;
          elem.innerHTML = itemOfInterval.toFixed(2);// фиксируем два знака после запятой
        } else {
          this.numberOfFinished = headerOfTimer.innerHTML.split(' ')[2];//эта строка будет появляться в статусе, для этого "заголовок" разбиваем на элементы по пробелу, а так как номер и число таймера это третий по счету элемент строки, то соответственно "берем" элемент под номером два.
          let data = new Date();
          elem.innerHTML = '0';
          clearInterval(timer);
          document.getElementById('status').innerHTML =`Timer ${this.numberOfFinished} finished at ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}//${data.getDate()}. ${data.getMonth()+1}.${data.getFullYear()} ` ;
        } //промучался с шаблоном, хотел вівести статус в <p>{{message}}</p>, но из-за глобального контекста setInterval программа не находит this.message, поєтому и вывел инфу как в старом  добром JS...
      }, 10);
  }


  ngOnInit() {
  this.createTimer(3); //как и в варианте на "jsFiddle", вначале инициализируються два счетчика на 3 и на 10 секунд (как в видеоиз Вашегописьма)
  this.createTimer(10);

  }

}
