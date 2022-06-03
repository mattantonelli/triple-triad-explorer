import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["updated", "outdated", "search", "count", "results"]

  // Search for decks by matching the search query and filter parameters
  execute() {
    for (let deck of this.resultsTarget.getElementsByClassName("deck")) {
      const query = new RegExp(this.searchTarget.value, "i")

      if (this.matchesUpdatedFilters(deck) && deck.innerText.match(query)) {
        deck.classList.remove("hidden")
      } else {
        deck.classList.add("hidden")
      }
    }

    this.update()
  }

  matchesUpdatedFilters(deck) {
    var isUpdated = deck.dataset.updated === 'true'
    return (isUpdated && this.updatedTarget.checked) || (!isUpdated && this.outdatedTarget.checked)
  }

  // Execute the search after a short delay when the query text has been updated
  query() {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.execute()
    }, 500)
  }

  // Reset the search and unhide any non-matching decks
  reset(event) {
    event.preventDefault()
    event.target.blur()
    this.updatedTarget.checked = true
    this.outdatedTarget.checked = true
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
