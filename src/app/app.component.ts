import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { fadeAnimation } from './shared/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeAnimation]
})
export class AppComponent implements OnInit {

  newTitle: string;

  public constructor(
    private titleService: Title
    ) {}

  ngOnInit() {
    this.titleService.setTitle('Presentation project');
  }
}
