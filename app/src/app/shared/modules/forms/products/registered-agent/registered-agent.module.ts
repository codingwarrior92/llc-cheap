import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisteredAgentComponent } from './registered-agent.component';

@NgModule({
  declarations: [
    RegisteredAgentComponent
  ],
  exports: [
    RegisteredAgentComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RegisteredAgentModule { }
