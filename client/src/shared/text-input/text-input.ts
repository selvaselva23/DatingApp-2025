import { Component } from '@angular/core';
import { ControlValueAccessor, ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Self } from '@angular/core';


@Component({
  selector: 'app-text-input',
  imports: [ReactiveFormsModule],
  templateUrl: './text-input.html',
  styleUrl: './text-input.css'
})
export class TextInput implements ControlValueAccessor{

  label = input<string>('');
  type = input<string>('text');
  maxDate = input<string>('');

constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  writeValue(obj: any): void {

  }
  registerOnChange(fn: any): void {

  }
  registerOnTouched(fn: any): void {

  }

  get control(): FormControl {
    return this.ngControl.control as FormControl
  }


}
