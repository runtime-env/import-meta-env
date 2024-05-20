import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  hello = environment.hello;
}
