import { get } from "svelte/store";

export class Timer {
  private minute: number;
  private total_seconds: number;
  private interval: number | null;
  private callback: (d: {
    minute: string;
    seconds: string;
    total_seconds?: number;
  }) => void;
  constructor(
    minute: number,
    callback: (d: {
      minute: string;
      seconds: string;
      total_seconds?: number;
    }) => void
  ) {
    this.minute = minute;
    this.total_seconds = this.minute * 60;
    this.interval = 0;
    this.callback = callback;
  }

  public start() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.interval = setInterval(() => {
      if (this.total_seconds <= 0) {
        this.stop();
        return;
      }
      this.total_seconds = this.total_seconds - 1;
      const get_min = Math.floor(this.total_seconds / 60);
      const get_sec = this.total_seconds % 60;
      this.callback({
        minute:
          String(get_min).length < 2 ? "0" + String(get_min) : String(get_min),
        seconds:
          String(get_sec).length < 2 ? "0" + String(get_sec) : String(get_sec),
        total_seconds: this.total_seconds,
      });
    }, 1000);
  }

  public stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    return;
  }

  public reset() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.total_seconds = this.minute * 60;
  }
}
