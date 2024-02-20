import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Survey Corp';

  backgrounds = ["background-1.jpg", "background-2.jpg", "background-3.jpg"]
  backgroundIndex = 0;

  ngOnInit(){
    const container = document.querySelector('.container') as HTMLElement;
    const data = localStorage.getItem('background');
    if (data != null){
      const background = JSON.parse(data);
      this.backgroundIndex = background.index;
      container.style.backgroundImage = "url(../assets/" + this.backgrounds[this.backgroundIndex] + ")";
    }
  }

  changeBackground(){
    const container = document.querySelector('.container') as HTMLElement;
    this.backgroundIndex ++;    
    if (this.backgroundIndex == this.backgrounds.length){
      this.backgroundIndex = 0;
    }    
    container.style.backgroundImage = "url(../assets/" + this.backgrounds[this.backgroundIndex] + ")";    
    const background = {
      index: this.backgroundIndex,
    }
    const dataJSON = JSON.stringify(background);
    localStorage.setItem('background', dataJSON);
  }
}
