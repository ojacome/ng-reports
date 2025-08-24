import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'bytes' })
export class BytesPipe implements PipeTransform {
  transform(value?: number | null, decimals = 2): string {
    const v = Number(value ?? 0);
    if (!isFinite(v) || v <= 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(v) / Math.log(k));
    const num = parseFloat((v / Math.pow(k, i)).toFixed(decimals));
    return `${num} ${sizes[i]}`;
  }
}
