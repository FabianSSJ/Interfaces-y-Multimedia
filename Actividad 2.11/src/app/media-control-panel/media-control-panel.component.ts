import { Component, ChangeDetectionStrategy, signal, computed, effect, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-media-control-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './media-control-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaControlPanelComponent implements OnDestroy {
  // --- Signals ---
  volume = signal<number>(50);
  isPlaying = signal<boolean>(false);
  currentTime = signal<number>(0);
  
  private previousVolume = signal<number>(50);
  private intervalId: any;

  // --- Computeds ---
  displayTime = computed(() => {
    const seconds = this.currentTime();
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${this.pad(mins)}:${this.pad(secs)}`;
  });

  volumeIcon = computed(() => {
    const vol = this.volume();
    if (vol === 0) return '🔇';
    if (vol < 30) return '🔈';
    if (vol < 70) return '🔉';
    return '🔊';
  });

  constructor() {
    effect(() => {
      const currentVol = this.volume();
      console.log(`[Effect] Volumen cambiado a: ${currentVol}`);
      // localStorage.setItem('mediaPlayerVolume', currentVol.toString());
    });
  }

  // --- Métodos ---
  togglePlay() {
    this.isPlaying.update((playing: boolean) => !playing);
    this.isPlaying() ? this.startTimer() : this.stopTimer();
  }

  toggleMute() {
    const currentVol = this.volume();
    if (currentVol > 0) {
      this.previousVolume.set(currentVol);
      this.volume.set(0);
    } else {
      const prev = this.previousVolume() || 20;
      this.volume.set(prev);
    }
  }

  onVolumeChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.volume.set(parseInt(input.value, 10));
  }

  private pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  private startTimer() {
    this.stopTimer();
    this.intervalId = setInterval(() => {
      this.currentTime.update((t: number) => t + 1);
    }, 1000);
  }

  private stopTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  ngOnDestroy() {
    this.stopTimer();
  }
}