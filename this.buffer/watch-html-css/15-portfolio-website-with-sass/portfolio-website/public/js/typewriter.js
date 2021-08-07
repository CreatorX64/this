class TypeWriter
{
  constructor(textElem, words, wait = 3000)
  {
    this.textElem = textElem;
    this.words = words;
    this.wait = parseInt(wait, 10);
    this.displayText = "";
    this.wordIndex = 0;
    this.isDeleting = false;
    this.type();
  }

  type()
  {
    // Current index of word
    const currentWordIndex = this.wordIndex % this.words.length;
    // Get full text of current word
    const currentWord = this.words[currentWordIndex];

    // Check if deleting
    if (this.isDeleting)
    {
      // Remove char
      this.displayText = currentWord.substring(0, this.displayText.length - 1);
    }
    else
    {
      // Add char
      this.displayText = currentWord.substring(0, this.displayText.length + 1);
    }

    // Insert the text into element
    this.textElem.innerHTML = `<span class="txt">${this.displayText}</span>`;

    // Set initial type speed
    let typeSpeed = 300;

    // Deletion should be 2X faster
    if (this.isDeleting)
    {
      typeSpeed /= 2;
    }

    // If word is complete
    if (this.displayText === currentWord)
    {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    }
    else if (this.displayText === '')
    {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init app
const init = () =>
{
  const textElem = document.querySelector('.txt-type');
  const words = JSON.parse(textElem.getAttribute('data-words'));
  const wait = textElem.getAttribute('data-wait');
  // Init TypeWriter
  new TypeWriter(textElem, words, wait);
};

// Init on DOM load
document.addEventListener('DOMContentLoaded', init);