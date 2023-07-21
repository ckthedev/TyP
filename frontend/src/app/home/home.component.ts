
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

interface Quote {
  text: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  passages: string[] = [
    "The quick brown fox jumps over the lazy dog.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "The only way to do great work is to love what you do.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "In the end, it's not the years in your life that count. It's the life in your years.",
    "Life is like riding a bicycle. To keep your balance, you must keep moving.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "In the middle of difficulty lies opportunity.",
    "The only limit to our realization of tomorrow will be our doubts of today.",
    "Believe you can and you're halfway there.",
    "It always seems impossible until it's done.",
    "The secret of getting ahead is getting started."

  ];

  quoteElement: HTMLElement | null = null;
  inputElement: HTMLInputElement | null = null;
  resultElement: HTMLElement | null = null;
  restartButton: HTMLElement | null = null;
  nextButton: HTMLElement | null = null;
  timerElement: HTMLElement | null = null;

  currentQuoteIndex = 0;
  currentQuote = this.passages[this.currentQuoteIndex];
  timerSeconds: number = 60;
  timerInterval: any;
  hasStartedTyping = false;

  startTime: number = 0;
  endTime: number = 0;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.quoteElement = document.getElementById('quote');
    this.inputElement = document.getElementById('typingInput') as HTMLInputElement;
    this.resultElement = document.getElementById('result');
    this.restartButton = document.getElementById('restartButton');
    this.nextButton = document.getElementById('nextButton');
    this.timerElement = document.getElementById('timer');

    this.initializeTypingPractice();
  }

  initializeTypingPractice(): void {
    this.quoteElement!.textContent = this.currentQuote;

    this.inputElement!.addEventListener('input', () => {
      this.checkTypingProgress();
    });

    this.restartButton!.addEventListener('click', () => {
      this.inputElement!.value = '';
      this.resultElement!.textContent = '';
      this.resultElement!.classList.remove('success', 'error');
      this.inputElement!.disabled = false;

      this.resetTimer();

      this.quoteElement!.textContent = this.passages[this.currentQuoteIndex];

      this.startTimer();
    });

    this.nextButton!.addEventListener('click', () => {
      this.nextQuote();
    });
  }

  checkTypingProgress(): void {
    if (!this.hasStartedTyping) {
      this.hasStartedTyping = true;
      this.startTime = Date.now();
      this.startTimer();
    }

    const typedText = this.inputElement!.value;
    const targetText = this.currentQuote;

    let displayText = '';

    for (let i = 0; i < targetText.length; i++) {
      if (typedText[i] === targetText[i]) {
        displayText += `<span class="correct">${targetText[i]}</span>`;
      } else {
        displayText += `<span class="wrong">${targetText[i]}</span>`;
      }
    }

    this.quoteElement!.innerHTML = displayText;

    if (typedText === targetText) {
      this.inputElement!.disabled = true;
      this.hasStartedTyping = false;
      this.endTime = Date.now();
      this.displayResult();
    }
  }

  startTimer(): void {
    this.timerInterval = setInterval(() => {
      this.timerSeconds--;
      this.timerElement!.textContent = this.timerSeconds.toString();

      if (this.timerSeconds === 0) {
        clearInterval(this.timerInterval);
        this.endTime = Date.now();
        this.inputElement!.disabled = true;
        this.hasStartedTyping = false;
        this.displayResult();
      }
    }, 1000);
  }

  resetTimer(): void {
    clearInterval(this.timerInterval);
    this.timerSeconds = 60;
    this.timerElement!.textContent = this.timerSeconds.toString();
  }

  nextQuote(): void {
    this.inputElement!.value = '';
    this.resultElement!.textContent = '';
    this.resultElement!.classList.remove('success', 'error');
    this.inputElement!.disabled = false;

    this.resetTimer();

    this.currentQuoteIndex = Math.floor(Math.random() * this.passages.length);
    this.currentQuote = this.passages[this.currentQuoteIndex];

    this.quoteElement!.textContent = this.currentQuote;
  }

  calculateTypingSpeed(typedText: string, startTime: number, endTime: number): number {
    const totalTimeInSeconds = (endTime - startTime) / 1000;
    const wordsTyped = typedText.trim().split(/\s+/).length;
    return Math.round((wordsTyped / totalTimeInSeconds) * 60);
  }

  displayResult(): void {
    const typedText = this.inputElement!.value;
    const targetText = this.currentQuote;

    let correctCharacters = 0;
    let incorrectCharacters = 0;

    for (let i = 0; i < typedText.length; i++) {
      if (typedText[i] === targetText[i]) {
        correctCharacters++;
      } else {
        incorrectCharacters++;
      }
    }

    const totalCharacters = correctCharacters + incorrectCharacters;
    const typingSpeed = this.calculateTypingSpeed(typedText, this.startTime, this.endTime);
    const accuracy = (correctCharacters / totalCharacters) * 100;

    this.resultElement!.textContent = `Typing Speed: ${typingSpeed} WPM | Accuracy: ${accuracy.toFixed(
      1
    )}%`;
  }
}
