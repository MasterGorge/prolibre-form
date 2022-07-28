<template>
    <div>
    <header class="vff-header">
      <h1 class="title">ProLibre</h1>
        <div class="f-container">
        <!-- Add custom logo here -->
          <!--<svg class="f-logo" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMid meet" viewBox="0 0 35.606 11.211">
            <path d="M.134.837H3.21V8.01h4.203v2.18H.134V.837z"/>
            <path d="M11.875.59c1.48 0 2.668.448 3.567 1.344s1.35 2.052 1.35 3.47c0 1.48-.445 2.7-1.336 3.632S13.38 10.45 11.9 10.45c-1.678 0-2.954-.54-3.827-1.622-.717-.9-1.08-2.022-1.09-3.397-.01-1.36.39-2.484 1.193-3.374C9.06 1.08 10.292.59 11.875.59zm0 2.283c-.563 0-1.003.222-1.323.662-.338.467-.507 1.124-.507 1.972 0 .865.162 1.524.487 1.978a1.58 1.58 0 0 0 1.369.682c.588 0 1.04-.223 1.355-.668s.474-1.07.474-1.875c0-1.834-.62-2.75-1.855-2.75z"/>
            <path d="M21.565 7.078V5.055h4.217v5.163h-1.986l-.13-.908c-.693.76-1.617 1.142-2.777 1.142-1.383 0-2.488-.437-3.313-1.3s-1.243-2.03-1.252-3.464c-.01-1.462.385-2.65 1.18-3.567.875-1.012 2.11-1.518 3.7-1.518 1.21 0 2.207.303 3 .907s1.264 1.457 1.447 2.556h-2.92c-.207-.787-.73-1.182-1.57-1.182-.553 0-.988.236-1.303.707s-.475 1.153-.475 2.043c0 1.695.652 2.542 1.96 2.542.363 0 .695-.103.998-.306a1.29 1.29 0 0 0 .572-.784h-1.35v.002z"/>
            <path d="M30.556.59c1.48 0 2.668.448 3.568 1.344s1.348 2.052 1.348 3.47c0 1.48-.443 2.7-1.336 3.632S32.06 10.45 30.58 10.45c-1.678 0-2.953-.54-3.826-1.622-.72-.892-1.082-2.022-1.1-3.398-.008-1.357.39-2.48 1.193-3.372C27.74 1.08 28.974.59 30.556.59zm0 2.283c-.563 0-1.002.222-1.322.662-.336.467-.506 1.125-.506 1.972 0 .865.162 1.524.486 1.978s.78.682 1.37.682 1.04-.223 1.355-.668.475-1.07.475-1.875c-.002-1.834-.62-2.75-1.857-2.75z"/>
          </svg>-->
        </div>
    </header>

    <flow-form
      ref="flowform"
      v-on:complete="onComplete"
      v-on:submit="onSubmit"
      v-bind:questions="questions"
      v-bind:language="language"
      v-bind:standalone="true"
    >
    <!-- Custom content for the Complete/Submit screen slots in the FlowForm component -->
      <!-- We've overriden the default "complete" slot content -->
     <template v-slot:complete>
        <div class="f-section-wrap">
          <p>
            <span class="fh2">Vous avez fini le questionnaire, nous vous enverrons un mail comme réponse</span>
            <span class="f-section-text">
              On éspère vous avoir été utiles, bonne chance et n'oubliez pas de faire ce qu'il faut faire pour votre sécurité informatique
            </span>
          </p>
          <p class="f-description">Si vous voulez d'autres précisions, passez aux niveaux supérieurs</p>
        </div>  
      </template>

      <!-- We've overriden the default "completeButton" slot content -->
      <template v-slot:completeButton>
        <div class="f-submit" v-if="!submitted">
          <button 
            class="o-btn-action"
            ref="button"
            type="submit"
            href="#"
            v-on:click.prevent="onSendData()"
            aria-label="Press to submit">
            <span>{{ language.submitText }}</span>
          </button>
          <a class="f-enter-desc"
            href="#"
            v-on:click.prevent="onSendData()"
            v-html="language.formatString(language.pressEnter)">
          </a>
        </div>

        <p class="text-success" v-if="submitted">Envoie réussi</p>
      </template>
    </flow-form>
  </div>
</template>

<script>
import FlowForm from '../FlowForm.vue'
export default {
    name: 'form2',

    components: {
      FlowForm
    },
    data() {
      return {
        submitted: false,
        completed: false,
        language: new LanguageModel(),
         questions: [
    new QuestionModel({
            id: 'path_a',
            title: "L'accès à votre infrastructure est-elle contrôlée et sécurisé ? (Bureau, ordinateur, serveur, etc.)",
            type: QuestionType.MultipleChoice,
            multiple: false,
            required: true,
            options: [
              new ChoiceOption({
                label: 'Oui',
              }),
              new ChoiceOption({
                label: 'Non',
              }),
              new ChoiceOption({
                label: 'Je ne sais pas',
              }),
            ]
          }),
          new QuestionModel({
            id: 'path_simple',
            title: "L'accès à votre infrastructure est-elle contrôlée et sécurisé? (Bureau, ordinateur, serveur, etc.)",
            type: QuestionType.Matrix,
            multiple: false,
            required: true,
            rows: [
                new MatrixRow({
                    id: 'fichier',
                    label: 'Fichiers',
                  }),
                  new MatrixRow({
                    id: 'mail',
                    label: 'Mail/Courriel'
                  }),
                  new MatrixRow({
                    id: 'agenda',
                    label: 'Agenda'
                  })
                ],
            columns:[
                new MatrixColumn({
                    value: '1',
                    label: 'Serveur interne'
                  }),
                  new MatrixColumn({
                    value: '2',
                    label: 'Services cloud Suisse'
                  }),
                  new MatrixColumn({
                    value: '3',
                    label: 'Services cloud Europe'
                  }),
                  new MatrixColumn({
                    value: '4',
                    label: 'Services cloud USA ou autre'
                  }),
                  
                  new MatrixColumn({
                    value: '5',
                    label: 'Sur le cloud mais je ne sais pas où'
                  }),
                  new MatrixColumn({
                    value: '6',
                    label: 'Je ne sais pas'
                  })
                  
                ],
             jump: {
              1: 'path_1',
              _other: 'path_2'
              
            },
                
          }),
          new QuestionModel({
            id: 'path_1',
            title: "Est-ce que l’accès aux salles serveurs et aux locaux techniques sont contrôlés et protégé ?",
            type: QuestionType.MultipleChoice,
            multiple: false,
            required: true,
            options: [
              new ChoiceOption({
                label: 'Oui',
              }),
              new ChoiceOption({
                label: 'Non',
              }),
              new ChoiceOption({
                label: 'Je ne sais pas',
              }),
              
            ]
          }),
          new QuestionModel({
            id: 'path_2',
            title: "Faites vous appel à un prestataire externe?",
            type: QuestionType.MultipleChoice,
            multiple: false,
            required: true,
            options: [
              new ChoiceOption({
                label: 'Suisse',
              }),
              new ChoiceOption({
                label: 'Européen',
              }),
              new ChoiceOption({
                label: 'Américain ou autre',
              }),
              new ChoiceOption({
                label: 'Non',
              }),
              new ChoiceOption({
                label: 'Je ne sais pas',
              }),  
            ]
          }),
          new QuestionModel({
            id: 'path_a',
            title: "Quels postes de travail utilisez-vous?",
            type: QuestionType.MultipleChoice,
            multiple: true,
            required: true,
            options: [
              new ChoiceOption({
                label: 'Linux',
              }),
              new ChoiceOption({
                label: 'MacOs',
              }),
              new ChoiceOption({
              label: 'Windows 11',
              }),
              new ChoiceOption({
              label: 'Windows 10',
              }),
              new ChoiceOption({
                label: 'Windows 8',
              }),
              new ChoiceOption({
                label: 'Windows 7',
              }),
            ]
          }),
          new QuestionModel({
            id: 'path_a',
            title: "Un responsable informatique a été désigné dans votre entreprise?",
            type: QuestionType.MultipleChoice,
            multiple: false,
            required: true,
            options: [
              new ChoiceOption({
                label: 'Oui',
              }),
              new ChoiceOption({
                label: 'Non',
              }),
              new ChoiceOption({
                label: 'Je ne sais pas',
              }),
            ]
          }),
          new QuestionModel({
            id: 'path_a',
            title: "Est ce que vos collaborateurs et vous, avez été formés/sensibilisés à la cybersécurité?",
            helpText: "Permet de transmettre à vos utilisateurs les connaissances en cybersécurité dont ils ont besoin pour protéger des cybercriminels les informations confidentielles de votre organisation.",
            helpTextShow:true,
            type: QuestionType.MultipleChoice,
            multiple: false,
            required: true,
            options: [
              new ChoiceOption({
                label: 'Formation conséquente',
              }),
              new ChoiceOption({
                label: 'Formation rapide',
              }),
              new ChoiceOption({
                label: 'Autosensibilisation (reherche personnel, des ouï-dire etc..)',
              }),
              new ChoiceOption({
                label: 'Non',
              }),
              new ChoiceOption({
                label: 'Je ne sais pas',
              }),
            ]
          }),
           new QuestionModel({
            id: '',
            title: "Avez-vous fait le nécessaire quant à la sécurité du système d'information? Sélectionnez les pratiques que vous avez effectuées",
            type: QuestionType.MultipleChoice,
            multiple: true,
            required: true,
            options: [
              new ChoiceOption({
                label: "Adopter une politique de mot de passe rigoureuse",
              }),
              new ChoiceOption({
                label: 'Concevoir une procédure de création et de suppression des comptes utilisateurs',
              }),
              new ChoiceOption({
              label: 'Sécuriser les postes de travail',
              }),
              new ChoiceOption({
              label: 'Identifier précisément qui peut avoir accès aux fichier',
              }),
              new ChoiceOption({
                label: 'Veiller à la confidentialité des donnée vis-à-vis des prestataires',
              }),
              new ChoiceOption({
              label: 'Sécuriser le réseau locale',
              }),
              new ChoiceOption({
              label: 'Anticiper le risque de perte ou de divulgation des données',
              }),
              new ChoiceOption({
                label: "Anticiper et formaliser une politique de sécurité du système d'information",
              }),
            ]
          }),
           new QuestionModel({
            id: '',
            title: "Comment est gérée votre infrastructure? Choisissez lesquels de ces points importants vous respectez",
            type: QuestionType.MultipleChoice,
            helpText:"IT monitoring  (ou la surveillance IT) consiste à s’assurer que les équipements informatiques qui composent votre système d’information soient disponibles et performants à tout moment.",
            multiple: true,
            required: true,
            options: [
              new ChoiceOption({
                label: "Mise en place d'un PRA",
              }),
              new ChoiceOption({
                label: 'Monitoring IT en temps réel (surveillance IT)',
              }),
              new ChoiceOption({
              label: 'Optimisation',
              }),
              new ChoiceOption({
              label: 'Respect du cycle de vis du matériel informatique',
              }),
              new ChoiceOption({
                label: 'Maintenance informatique permanente et personnalisé',
              }),
            ]
          }),
          new QuestionModel({
            id: 'path_a',
            title: "Disposez-vous d’une cartographie/plan précis(e) de l’installation informatique de votre entreprise ?",
            type: QuestionType.MultipleChoice,
            multiple: false,
            required: true,
            options: [
              new ChoiceOption({
                label: 'Oui',
                value: '1'
              }),
              new ChoiceOption({
                label: 'Non',
              }),
              new ChoiceOption({
                label: 'Je ne sais pas ',
              }), 
            ],
             jump: {
              1: 'carto',
              _other: 'rto/rpo'
            }
          }),
          new QuestionModel({
            id: 'carto',
            title: "La mettez-vous à jour régulièrement ?",
            type: QuestionType.MultipleChoice,
            multiple: false,
            required: true,
            options: [
              new ChoiceOption({
                label: 'Oui',
              }),
              new ChoiceOption({
                label: 'Non',
              }),
              new ChoiceOption({
                label: 'Je ne sais pas',
              }), 
            ]
          }),
          new QuestionModel({
            id: 'carto',
            title: "Avez-vous mis en place un système de gestion des mises à jour rigoureux?",
            type: QuestionType.MultipleChoice,
            multiple: false,
            required: true,
            options: [
              new ChoiceOption({
                label: 'Oui',
              }),
              new ChoiceOption({
                label: 'Non',
              }),
              new ChoiceOption({
                label: 'Je ne sais pas',
              }), 
            ]
          }),
          new QuestionModel({
            id: 'rto/rpo',
            title: "Combien de temps acceptez vous que vos serveurs, machines, sites web/boutiques en ligne soit en panne ?",
            type: QuestionType.Matrix,
            multiple: false,
            required: true,
            rows: [
                new MatrixRow({
                    id: 'rto_fichier',
                    label: 'RTO Fichiers'
                  }),
                  new MatrixRow({
                    id: 'rpo_fichier',
                    label: 'RPO Fichiers'
                  }),
                  new MatrixRow({
                    id: 'rto_email',
                    label: 'RTO Emails'
                  }),
                  new MatrixRow({
                    id: 'rpo_email',
                    label: 'RPO Emails'
                  }),
                  new MatrixRow({
                    id: 'rto_internet',
                    label: 'RTO Accès Internet'
                  }),
                ],
            columns:[
                new MatrixColumn({
                    value: '1',
                    label: '1h'
                  }),
                  new MatrixColumn({
                    value: '2',
                    label: '4h'
                  }),
                  new MatrixColumn({
                    value: '3',
                    label: '8h'
                  }),
                  new MatrixColumn({
                    value: '4',
                    label: '24h'
                  }),
                  
                  new MatrixColumn({
                    value: '5',
                    label: '48h'
                  }),
                  new MatrixColumn({
                    value: '6',
                    label: '72h'
                  }),
                  new MatrixColumn({
                    value: '7',
                    label: '1 semaine'
                  })
                ]
          }),
          new QuestionModel({
            id: '',
            title: "Est-ce que les droits d’accès aux fichiers bureautique et aux différentes applications avec vos collaborateurs sont contrôlé ?",
            type: QuestionType.MultipleChoice,
            multiple: false,
            required: true,
            options: [
              new ChoiceOption({
                label: 'Oui',
              }),
              new ChoiceOption({
                label: 'Non',
              }),
              new ChoiceOption({
                label: 'Je ne sais pas',
              }), 
            ]
          }),
          new QuestionModel({
            id: '',
            title: "Limitez vous le nombre d’accès à internet ?",
            type: QuestionType.MultipleChoice,
            multiple: false,
            required: true,
            options: [
              new ChoiceOption({
                label: 'Oui',
              }),
              new ChoiceOption({
                label: 'Non',
              }),
              new ChoiceOption({
                label: 'Je ne sais pas',
              }), 
            ]
          }),
          new QuestionModel({
            id: '',
            title: "Disposez vous d'un ou plusieurs Antivirus ?",
            type: QuestionType.MultipleChoice,
            multiple: false,
            required: true,
            options: [
              new ChoiceOption({
                label: 'Oui',
              }),
              new ChoiceOption({
                label: 'Non',
              }),
              new ChoiceOption({
                label: 'Je ne sais pas',
              }), 
            ]
          }),
          new QuestionModel({
            id: '',
            title: "Disposez-vous d'un VPN?",
            type: QuestionType.MultipleChoice,
            multiple: false,
            required: true,
            options: [
              new ChoiceOption({
                label: 'Oui',
              }),
              new ChoiceOption({
                label: 'Non',
              }),
              new ChoiceOption({
                label: 'Je ne sais pas',
              }), 
            ]
          }),
          new QuestionModel({
            id: 'back_up',
            title: "Effectuez-vous des sauvegardes quotidennement?",
            type: QuestionType.MultipleChoice,
            multiple: false,
            required: true,
            options: [
              new ChoiceOption({
                label: 'Oui',
              }),
              new ChoiceOption({
                label: 'Non',
              }),
              new ChoiceOption({
                label: 'Je ne sais pas',
              }), 
            ]
          }),
          new QuestionModel({
            id: 'back_up',
            title: "Quel type de sauvegarde utilisez vous?",
            type: QuestionType.MultipleChoice,
            multiple: false,
            required: true,
            options: [
              new ChoiceOption({
                label: 'Externe',
              }),
              new ChoiceOption({
                label: 'Interne',
              }),
              new ChoiceOption({
                label: 'Les deux',
              }),
              new ChoiceOption({
                label: 'Aucun',
              }),
              new ChoiceOption({
                label: 'Je ne sais pas',
              }), 
            ]
          }),
          new QuestionModel({
            id: 'back_up',
            title: "Quel est la fréquence de contrôle des sauvegardes?",
            type: QuestionType.MultipleChoice,
            multiple: false,
            required: true,
            options: [
              new ChoiceOption({
                label: '1 fois par jour',
              }),
              new ChoiceOption({
                label: '1 fois par semaine',
              }),
              new ChoiceOption({
                label: '1 fois par mois',
              }),
              new ChoiceOption({
                label: '1 fois tous les 6 mois',
              }),
              new ChoiceOption({
                label: '1 fois par an',
              }),
              new ChoiceOption({
                label: 'Jamais',
              }),
              new ChoiceOption({
                label: 'Je ne sais pas',
              }), 
            ]
          }),
         ]
    }
    return data
      }
    }
</script>

<style>
    @import '../../assets/css/common.css';
</style>