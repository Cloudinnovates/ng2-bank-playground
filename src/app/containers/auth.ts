import { Component } from '@angular/core';

@Component({
    selector: "auth",
    template:
`
    <div class="container">
      <h1>Twist Bank</h1>
      <main class="main">
        <login-form></login-form>
      </main>
    </div>
`

})
export class AuthContainer {}
