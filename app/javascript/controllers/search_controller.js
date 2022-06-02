import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["search", "count", "results"]

  // Search for decks by matching the search query and toggle as appropriate
  execute() {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      for (let deck of this.resultsTarget.getElementsByClassName("deck")) {
        const query = new RegExp(this.searchTarget.value, "i")

        if (deck.innerText.match(query)) {
          deck.classList.remove("hidden")
        } else {
          deck.classList.add("hidden")
        }
      }

      this.update()
    }, 500)
  }

  // Reset the search and unhide any non-matching decks
  reset(event) {
    event.preventDefault()
    event.target.blur()
    this.searchTarget.value = ""
    Array.from(this.resultsTarget.querySelectorAll(".deck.hidden")).forEach((el) => el.classList.remove("hidden"));
    this.update()
  }

  // Update dynamic parts of the user interface
  update() {
    // Set the total deck count
    this.countTarget.innerText = this.resultsTarget.querySelectorAll(".deck:not(.hidden)").length

    // If all of the decks in a folder are hidden, hide the folder
    for (let decks of this.resultsTarget.getElementsByClassName("decks")) {
      if (decks.children.length === decks.querySelectorAll(".deck.hidden").length) {
        decks.parentElement.classList.add("hidden")
      } else {
        decks.parentElement.classList.remove("hidden")
      }
    }
  }
}
