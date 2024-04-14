import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatIconModule, MatCardModule],
  templateUrl: './default.component.html',
  styleUrl: './default.component.css',
})
export class DefaultComponent {}
