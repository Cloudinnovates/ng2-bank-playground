import {Directive, ElementRef, Renderer} from "@angular/core"

@Directive({
    selector: "[highlight]",
    host: {
        "(mouseenter)": "onMouseEnter()",
        "(mouseleave)": "onMouseLeave()"
    }
})
export class HighlightDirective {
    constructor(private element: ElementRef, private renderer: Renderer){}

    onMouseEnter(){
        this.renderer.setElementStyle(this.element.nativeElement, "background", "#E3F6CE")
    }

    onMouseLeave(){
        this.renderer.setElementStyle(this.element.nativeElement, "background", "transparent")
    }

}
