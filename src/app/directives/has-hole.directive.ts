import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from "@angular/core";
import { AuthService } from "../services/auth/auth.service";

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {
  @Input('appHasRole')
  role!: string;
  
  constructor(
    private authService: AuthService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {
  }
  
  ngOnInit() {
    const user = this.authService.getTokenInfo();
    console.log(user);
    if (user && user.perfil === this.role) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}