import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["name", "contents"]

  toggle() {
    this.nameTarget.classList.toggle("fw-bold")
    this.contentsTarget.classList.toggle("hidden")
  }
}
