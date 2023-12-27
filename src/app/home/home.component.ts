import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  header1 ='The New World AI.';
  message1 = 'Artificial Intelligence (AI) is transforming our world by enabling machines to learn, reason, and make decisions. From virtual assistants to advanced algorithms, AI is enhancing efficiency and reshaping industries, promising a future where technology seamlessly integrates with human life.';
  read= 'read more';
  search='Search More';
}
