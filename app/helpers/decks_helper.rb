module DecksHelper
  def deck_updated(deck)
    deck[:updated] ? 'Updated' : 'Outdated'
  end

  def stars(count)
    ('<i class="bi-star"></i>' * count).html_safe
  end
end
