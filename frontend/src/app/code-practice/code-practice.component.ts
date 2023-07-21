import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

interface CodeSnippet {
  code: string;
}

@Component({
  selector: 'app-code-practice',
  templateUrl: './code-practice.component.html',
  styleUrls: ['./code-practice.component.css']
})
export class CodePracticeComponent implements OnInit {
  codeSnippets: string[] = [
    "function add(a, b) {\n  return a + b;\n}",
    "const multiply = (a, b) => {\n  return a * b;\n}",
    "return num * factorial(num - 1);",
    "return sentence",
    "map(word => word.charAt(0).toUpperCase() + word.slice(1))",
    "if (num === 0 || num === 1) return 1",

    
  ];

  currentSnippetIndex = 0;
  currentCode = this.codeSnippets[this.currentSnippetIndex];
  typedText = '';
  isCompleted = false;
  startTime: number = 0;
  endTime: number = 0;
  timerSeconds: number = 60;
  timerInterval: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getNextSnippet();
  }

  getNextSnippet(): void {
    this.currentSnippetIndex = Math.floor(Math.random() * this.codeSnippets.length);
    this.currentCode = this.codeSnippets[this.currentSnippetIndex];
    this.typedText = '';
    this.isCompleted = false;
    this.resetTimer();
    this.startTimer();
  }

  startTimer(): void {
    this.startTime = Date.now();
    this.timerInterval = setInterval(() => {
      this.timerSeconds--;
      if (this.timerSeconds === 0) {
        this.endTime = Date.now();
        clearInterval(this.timerInterval);
        this.isCompleted = true;
      }
    }, 1000);
  }

  resetTimer(): void {
    this.timerSeconds = 60;
  }

  checkTypingProgress(): void {
    if (this.typedText === this.currentCode) {
      this.isCompleted = true;
      this.endTime = Date.now();
      clearInterval(this.timerInterval);
      setTimeout(() => {
        this.getNextSnippet();
      }, 1000);
    } else {
      this.isCompleted = false;
    }
  }
}
