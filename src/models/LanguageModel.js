/*!
  Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
  https://github.com/ditdot-dev/vue-flow-form
  https://www.ditdot.hr/en
*/

// Language data store

export default class LanguageModel {
  constructor(options) {
    this.enterKey = 'Entrer'
    this.shiftKey = 'Shift'
    this.ok = 'OK'
    this.continue = 'Continuez'
    this.skip = 'Skip'
    this.pressEnter = 'Appuie sur :enterKey'
    this.multipleChoiceHelpText = 'Chossissez une ou plusieurs réponses'
    this.multipleChoiceHelpTextSingle = 'Chossissez une seule réponse'
    this.otherPrompt = 'Other'
    this.placeholder = 'ecrit ta réponse ici...'
    this.submitText = 'Envoyé'
    this.longTextHelpText = ':shiftKey + :enterKey to make a line break.'
    this.prev = 'Précedent'
    this.next = 'Suivant'
    this.percentCompleted = ':percent% complété'
    this.invalidPrompt = 'Merci de bien remplir le champ'
    this.thankYouText = 'Merci!'
    this.successText = 'Votre soumission a été envoyée.'
    this.ariaOk = 'appuie pour continuer'
    this.ariaRequired = 'Cette étape est obligatoire'
    this.ariaPrev = 'Etape précedente'
    this.ariaNext = 'Etape suivante'
    this.ariaSubmitText = 'Appuie pour envoyé'
    this.ariaMultipleChoice = 'Press :letter to select'
    this.ariaTypeAnswer = 'Tapez votre réponse ici'
    this.errorAllowedFileTypes = 'Invalid file type. Allowed file types: :fileTypes.'
    this.errorMaxFileSize = 'File(s) too large. Maximum allowed file size: :size.'
    this.errorMinFiles = 'Too few files added. Minimum allowed files: :min.'
    this.errorMaxFiles = 'Too many files added. Maximum allowed files: :max.'

    Object.assign(this, options || {})
  }

  /**
   * Inserts a new CSS class into the language model string to format the :string
   * Use it in a component's v-html directive: v-html="language.formatString(language.languageString)"
   */
  formatString(string, replacements) {
    return string.replace(/:(\w+)/g, (match, word) => {
      if (this[word]) {
        return '<span class="f-string-em">' + this[word] + '</span>'
      } else if (replacements && replacements[word]) {
        return replacements[word]
      }
      
      return match
    })
  }

  formatFileSize(bytes) {
    const
      units = ['B', 'kB', 'MB', 'GB', 'TB'],
      i = bytes > 0 ? Math.floor(Math.log(bytes) / Math.log(1024)) : 0
      
    return (bytes / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + units[i];
  }
}


